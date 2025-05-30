import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import {Strategy} from "passport-local";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});
db.connect();

//initiating a session
app.use(
    session({
    secret: process.env.SESSION_SECRET, //because we are bypassing the login process if the user was signed in earlier
    resave: false, //true to store the session in a database, false to store it in the App on the server
    saveUninitialized: true, //force a session to be saved to the store (server memory)
    cookie: {
      maxAge: 1000*60*60*24, //1 sec (in milisec)*60 = 1min * 60= 1hr *24 = 1day persistence
    }
    })
  );

app.use(passport.initialize())
app.use(passport.session()) //session initialised above
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
  });
  
app.get("/register", (req, res) => {
res.render("register.ejs");
});
  
let userID = "";
let user_name="";

app.post("/login", passport.authenticate("local", { //local strategy -when u log in via username and password
  successRedirect: "/library",
  failureRedirect: "/"
}));

app.post("/register", async (req, res) => {
  const email = req.body.user_email;
  const password = req.body.password;
  const name= req.body.user_name;
  user_name = name;
  try{
      const checkEmail= await db.query("SELECT * FROM users WHERE email= $1",[email]); 
      if (checkEmail.rows.length > 0){
          res.redirect("/login");
      } else{
        bcrypt.hash(password, saltRounds, async (err, hash)=>{
          if (err){
            console.log("Error hashing password: ", err);
          }else {
          const result= await db.query("INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *", [email, hash, name]);
          const user = result.rows[0];
        req.login(user,(err)=>{
          console.log(err);
          res.redirect("/");
        })}
      })}
    } catch (err){
      console.log(err);
    };
});

let title = "";
let author = "";
let bookTitle = "";
let year = "";
let img = "";
let sorted = "newest";

app.get("/library", async (req, res) => {
  try{
    if (sorted==="newest"){
        const result= await db.query("SELECT * FROM books WHERE user_id=$1 ORDER BY id DESC", [userID])
        res.render("index.ejs", {listItems: result.rows, sort:sorted, username:user_name});
    }else{
        const result= await db.query("SELECT * FROM books WHERE user_id=$1 ORDER BY id ASC", [userID])
        res.render("index.ejs", {listItems: result.rows, sort:sorted, username:user_name});
    }
} catch(error){
    console.log(error);
}
});

app.post("/add", async (req,res)=>{
    try{
        res.render("add.ejs")
    } catch(error){
        console.log(error)
    }
});

app.post("/search", async (req,res)=>{
    title = req.body.word;
    title = title.replaceAll(" ","+");
    try{
    const response = await axios.get(`https://openlibrary.org/search.json?q=${title}`);
    const result = response.data.docs[0];
    author = result.author_name[0];
    bookTitle = result.title;
    year = result.first_publish_year;
    let temp_image = result.cover_i;
    img = `https://covers.openlibrary.org/b/id/${temp_image}-L.jpg`;
    res.render("add.ejs", {booksON : true, warning1ON : false, warning2ON : false, image : img, author: author, bookTitle: bookTitle, year: year});  
    } catch (error){
        res.render("add.ejs", {booksON : false, warning2ON : true});
        console.log(error);
    };
});

app.post("/bookshelf", async (req,res,next)=>{
    const review = req.body.review;
    const rating = req.body.rating;
    try{
        await db.query("INSERT INTO books (book_name, author, publish_year, review, image, rating, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)", [bookTitle, author,`${year}`, review, img, rating, userID]);
        res.redirect("/library");
    } catch (error){
      res.render("add.ejs", {booksON : false, warning1ON : true});
      console.log(error);
    };
});

app.post("/edit", async (req, res) => {
    const item = req.body.updatedItemReview;
    const itemId = req.body.updatedItemId;
    const rating = req.body.rating;
    try{
      await db.query("UPDATE books SET review = $1, rating = $2 WHERE id = $3 ", [item, rating, itemId])
      res.redirect("/library");
    } catch (error){
      console.log("error: ", error)
    }
});

app.post("/delete", async (req, res) => {
const itemId = req.body.deletedItemId;
try{
    await db.query("DELETE FROM books WHERE  id = $1", [itemId])
    res.redirect("/library");
} catch (error){
    console.log("error 4: ", error)
}
});

app.post("/sort", async (req, res) => {
    const sortId = req.body.sort;
    sorted=sortId;
    try{
        if (sortId === "newest"){
            res.redirect("/library");
        }else{
            res.redirect("/library");
            }
    } catch (error){
        console.log("error 4: ", error)
    }
});

app.post("/logout", function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
    req.isAuthenticated() ? true : false
  });
});



passport.use(new Strategy(
  {
  usernameField: "user_email",
  passwordField: "password",
},
async function verify(user_email, password, cb){ //cb=callback function in the "passport" world - gets username and passord from the respective names in index.ejs
  try{
    const result = await db.query("SELECT * FROM users WHERE email= $1", [user_email]);
    if (result.rows.length >0){
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      userID = result.rows[0].id;
      user_name = result.rows[0].name
      bcrypt.compare(password, storedHashedPassword, (err, result)=>{
        if (err){
          return cb(err);
        }else {
          if (result){
            return cb(null,user); //null=zero errors
          } else {
            return cb(null, false); //false is checked above at : req.isAuthenticated()
          }
      }})
    }else{
            return cb("User not found")
        }
  } catch (err){
    return cb(err);
  };
}))

passport.serializeUser((user, cb)=>{ //save data of logged in user to local storage
  cb(null, user);
})
passport.deserializeUser((user, cb)=>{ //deserializes the data of logged in user so that they can be used
  cb(null, user);
})


app.listen(port,()=>{
    console.log(`Server live on port: ${port}`);
})

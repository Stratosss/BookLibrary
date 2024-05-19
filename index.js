import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database:"Bookshelf",
  password: "your-password-here",
  port: "5432"
});

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let title = ""
let author = ""
let bookTitle = ""
let year = ""
let img=""
let sorted="newest"

app.get("/", async (req, res) => {
    try{
        if (sorted==="newest"){
            const result= await db.query("SELECT * FROM books ORDER BY id DESC")
            res.render("index.ejs", {listItems: result.rows, sort:sorted});
        }else{
            const result= await db.query("SELECT * FROM books ORDER BY id ASC")
            res.render("index.ejs", {listItems: result.rows, sort:sorted});
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
    res.render("add.ejs", {booksON : true, warningON : false, image : img, author: author, bookTitle: bookTitle, year: year});  
    } catch (error){
        res.render("add.ejs", {booksON : false, warningON : true});
        console.log(error);
    };
});

app.post("/", async (req,res,next)=>{
    const review = req.body.review;
    try{
        await db.query("INSERT INTO books (book_name, author, publish_year, review, image) VALUES ($1, $2, $3, $4, $5)", [bookTitle, author,`${year}`, review, img]);
        res.redirect("/");
    } catch (error){
        console.log(error);
    };
});

app.post("/edit", async (req, res) => {
    const item = req.body.updatedItemReview;
    const itemId = req.body.updatedItemId;
    try{
      await db.query("UPDATE books SET review = $1 WHERE id = $2 ", [item, itemId])
      res.redirect("/");
    } catch (error){
      console.log("error: ", error)
    }
  });

app.post("/delete", async (req, res) => {
const itemId = req.body.deletedItemId;
try{
    await db.query("DELETE FROM books WHERE  id = $1", [itemId])
    res.redirect("/");
} catch (error){
    console.log("error 4: ", error)
}
});

app.post("/sort", async (req, res) => {
    const sortId = req.body.sort;
    sorted=sortId;
    try{
        if (sortId === "newest"){
            res.redirect("/");
        }else{
            res.redirect("/");
            }
    } catch (error){
        console.log("error 4: ", error)
    }
});

app.listen(port,()=>{
    console.log(`Server live on port: ${port}`);
})


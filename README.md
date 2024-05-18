# Book Library
## Overview
This project concerns a personal library website. The user can search for and store the books they have read from the latest book to the oldest. The books are saved in a postgreSQL database.
The "library shelf" consists of an image of each book cover, along with their title, author's name, year of publication and a review they write upon book submission.
The user can edit their review whenever they like, and they can also delete any entry they want to.
The website counts the number of books the user has read so far. 
There's an additional button to jump to the top of the page.
### Prerequisites
- Go to the directory where that folder lives in and install the necessary packages by typing the following commands in terminal:
  - npm init -y
  - npm i ejs
  - npm i express
  - npm i body-parser
  - npm i axios
  - npm i pg
- In the package.json type: "type": "module"
- To run it in localhost, install node.js from: https://nodejs.org/en/download
- Create a library named "Bookshelf" and create a table named "book" with the following columns: id (serial primary key), "book_name", "author", "publish_year", "review", "image"
### Directions 
- After installing the prerequisites, initialize the application by typing either "node index.js" or "nodemon index.js".
- Open a browser and go to "localhost:3000"
![1](https://github.com/Stratosss/BookLibrary/assets/157527268/13341dbc-5113-44b5-8915-737b5e94a735)

![2](https://github.com/Stratosss/BookLibrary/assets/157527268/d459e57a-f650-4ef2-abb6-41694117c09f)

![3](https://github.com/Stratosss/BookLibrary/assets/157527268/02a013b8-46ee-4f33-9ea1-0f7c687a971a)

![4](https://github.com/Stratosss/BookLibrary/assets/157527268/13f83a67-b619-470b-be18-ab2d115e36f4)

![5](https://github.com/Stratosss/BookLibrary/assets/157527268/a1e345ac-a2e5-4a39-a767-259318b7f805)

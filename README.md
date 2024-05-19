# Book Library
## Overview
This project concerns a personal library website. The user can search for and store the books they have read from the latest book to the oldest. The books are saved in a postgreSQL database.
The "library shelf" consists of an image of each book cover, along with their title, author's name, year of publication and a review they write upon book submission.
The user can edit their review whenever they like, and they can also delete any entry they want to.
The website counts the number of books the user has read so far. 
There's an additional button to jump to the top of the page.
This project utilises an API (https://openlibrary.org/developers/api) from which it requests data by using axios.
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
### Updates
- 18/5/2024: "Sorted by" button added.
- 19/5/2024: Star rating system added. 

![1](https://github.com/Stratosss/BookLibrary/assets/157527268/40506d92-8a39-41f4-b3e3-80e3ee549ef0)

![2](https://github.com/Stratosss/BookLibrary/assets/157527268/e0f4d52d-88fa-4706-90dc-7b402bbb5103)

![3](https://github.com/Stratosss/BookLibrary/assets/157527268/5dd6d722-b5b4-4de1-a13c-621f26d7f00e)

![4](https://github.com/Stratosss/BookLibrary/assets/157527268/13f83a67-b619-470b-be18-ab2d115e36f4)

![5](https://github.com/Stratosss/BookLibrary/assets/157527268/f4d7809a-c791-42c0-95d1-ed8a83ba1680)

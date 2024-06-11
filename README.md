# Book Library
## Overview
This project concerns a personal library website. The user can search for and store the books they have read from the latest book to the oldest and vice versa. The books are saved in a postgreSQL database.
The "library shelf" consists of an image of each book cover, along with their title, author's name, year of publication and a review they write upon book submission.
The user can edit their review whenever they like, and they can also delete any entry they want to.
The website counts the number of books the user has read so far. 
There's an additional button to jump to the top of the page.
This application utilises the embedded JavaScript, an API (https://openlibrary.org/developers/api) from which it requests data by using axios and then it interfaces with the user through the impelementation of RESTful APIs.
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
- Create a database named "Bookshelf" and create a table named "book" with the following columns: id (serial primary key), "book_name", "author", "publish_year", "review", "image"
### Directions 
- After installing the prerequisites, initialize the application by typing either "node index.js" or "nodemon index.js".
- Open a browser and go to "localhost:3000"
### Updates
- 18/5/2024: "Sorted by" button added.
- 19/5/2024: Star rating system added.
- 10/6/2024: The user can now edit the star rating system from home screen, same as the text review. Additionally, if the book has no cover, "Νo cover available" text is displayed.
- 15/6/2024: The user can now search for a specific title in the list of read books.

![1](https://github.com/Stratosss/BookLibrary/assets/157527268/e62c4e07-13f9-4670-9130-5b2268c9a39d)

![2](https://github.com/Stratosss/BookLibrary/assets/157527268/ce6b114a-3f6e-40c9-9b18-10454daf6a36)

![3](https://github.com/Stratosss/BookLibrary/assets/157527268/6a5ee0e7-57b3-44a1-ae0d-f500091a0091)

![4](https://github.com/Stratosss/BookLibrary/assets/157527268/6c457940-3902-46da-8a42-dacdf91ca26a)

![5](https://github.com/Stratosss/BookLibrary/assets/157527268/13f83a67-b619-470b-be18-ab2d115e36f4)

![6](https://github.com/Stratosss/BookLibrary/assets/157527268/f4d7809a-c791-42c0-95d1-ed8a83ba1680)

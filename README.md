# Book Library
## Overview
This project focuses on the development of a personal library website. The user can search for and store the books they have read from the latest book to the oldest and vice versa. The books are saved in a postgreSQL database.
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
- Create a database named "Bookshelf" and create a table named "book" with the following columns: id (serial primary key), "book_name", "author", "publish_year", "review", "image", "rating", "user_id" & add the constraint: CONSTRAINT unique_book_per_user UNIQUE (book_name, user_id)
- Create a table named "names"  with the following columns: id (serial primary key), "email", "password", "name"
### Directions 
- After installing the prerequisites, initialize the application by typing either "node index.js" or "nodemon index.js".
- Open a browser and go to "localhost:3000"
### Updates
- 18/5/2024: "Sorted by" button added.
- 19/5/2024: Star rating system added.
- 10/6/2024: The user can now edit the star rating system from home screen, same as the text review. Additionally, if the book has no cover, "Νo cover available" text is displayed.
- 15/6/2024: The user can now search for a specific title, author or published year in the list of read books.
- 29/1/2025: The possibility to add multiple users for a more personalised solution is now available. Passport.js framework is used for register/ log in /log out securely, and passwords are saved in the database encrypted. Also, each user can no longer add duplicates, thanks to an SQL constraint command. This enables us to use only one table for books, accomodating all users and minimising resourse utilisation; instead of creating a book table for each user.

![Image](https://github.com/user-attachments/assets/d2974018-e778-46bf-ada6-8c5da97416c4)

![Image](https://github.com/user-attachments/assets/a8d31b58-a7cd-4461-be63-8f037691195f)

![Image](https://github.com/user-attachments/assets/f5db7e78-6e38-401f-9740-322eb6c704ea)

![Image](https://github.com/user-attachments/assets/3186cdf1-2431-4ce7-8adb-5e133af8de22)

![Image](https://github.com/user-attachments/assets/136f80d1-d1d3-4994-b54c-3dea221e053e)

![4](https://github.com/Stratosss/BookLibrary/assets/157527268/fa2f191e-49d1-4632-8f53-e1caa4db26da)

![Image](https://github.com/user-attachments/assets/a5ecd78c-7b4f-45dc-84e0-609ca587a057)

![Image](https://github.com/user-attachments/assets/8c464b27-371f-4d22-91d2-c378a9ff90a3)

![Image](https://github.com/user-attachments/assets/f1748ee1-c26c-4e8a-aee7-54fc7dd20f1f)

![Image](https://github.com/user-attachments/assets/8953192b-1cf0-4cce-90dd-5e4b6a52a0e2)

# Ecommerce Applications

## Milestone 1: Project Overview


1. Authentication: login logout signup
2. Product image: All the products
3. Orders page: Shows orders for each her
4. Payment gateway

## Milestone 2: 

1. We set-up the front end with the following packages:
    1. React
    2. tailwind CSS 
2. We set-up the back-end with the following commands and packages:
    1. express react(COMMAND- npm i express)
    2. mongoose(COMMAND- npm i mongoose)
    3. cors (COMMAND- npm i cors)
    4. nodemon (COMMAND- npm i nodemon)

## Milestone 3- Configuring and connecting the backend server to MongoDB

1. Created a mongo DB account and created a new cluster.
2. Connect it to backend, added URL and the PORT to the env file.
3. Created a new file called database.js in the backend folder to connect to the database that is in the mongoDb.
4. Created a new file called App.js which sends the response to the client.
5. Created a util folder.
6. Added new file called ErrorHandling, which will handle any error that occures.


## Milestone 4- Creating a User Model, User Controller, enabling and configuring multer

1. Created a userModel.js file under models which has a userSchema which validates information like name, email and passwords.
2. Created a userController.js file which checks if the user is already present or not by validating their unique email id and if the user is not present it proceeds with the creation of the user.
3. We set up the multer which uploads the active/new users that in a new folder automatically, in the backend

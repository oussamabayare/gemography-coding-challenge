# gemography-coding-challenge
Gemography Coding Challenge [Node-JS] : a REST microservice that list the languages used by the 100 trending public repos on GitHub

**Requires**
- This project requires Node JS 12.x or higher to run

- I have put this project to run on localhost at the port 3000 if you want to change it go to config.js file and change it

**Steps to initiate the project**
1. clone or download the repository to your local computer or server

2. in a terminal run : `npm install`

3. in a terminal run : `node app.js`

4. you can access the project via `localhost:3000`

5. you can access the API endpoint via `localhost:3000/api/repository/trending-lang`

**Important notes**
- API is accessible via both GET and POST methods

- When accessing API you HAVE to specify the date parameter in the format "yyyy-mm-dd" else it will get the current day's date

# gemography-coding-challenge
Gemography Coding Challenge [Node-JS/Express] : a REST microservice that list the languages used by the 100 trending public repos on GitHub

**Requires**
- This project requires Node JS 12.x or higher to run

- I have put this project to run on localhost at the port 3000 if you want to change it go to config.js file and change it

**Steps to initiate the project**
1. clone or download the repository to your local computer or server

2. Generate the certificates to use https by running the command and place the two generated files in cert directory, they should look like the dist files
`openssl req -nodes -new -x509 -keyout server.key -out server.cert`

3. in a terminal run : `npm install`

4. Start the server by running : `node app.js` or simply `npm start`

5. you can access the project via `https://localhost:3000`

6. you can access the API endpoint via `https://localhost:3000/api/repository/trending-lang`

**Important notes**
- When accessing API you HAVE to specify the date parameter in the format "yyyy-mm-dd" else it will get the current day's date

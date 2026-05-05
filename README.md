PlayerCard: The Digital Profile for Gamers
Abstract
PlayerCard is basically a hub for gamers who are tired of having their gaming life scattered across a bunch of different places like Steam, Nintendo, and Discord. Instead of sending people five different links, you just have one PlayerCard. It’s a project I built using the MERN stack (MongoDB, Express, React, Node.js) that lets you show off what games you’re playing, your "vibe" for the day, and your social links.

I focused a lot on making the login side of things secure using JWT tokens and bcrypt, so user passwords aren't just sitting there in plain text. The goal was to make a clean, simple "gaming resume" where everything is in one spot, especially for specific communities like Terraria players who need a way to show off their progress and stats.

Team Members
Jacob Gregory Robbins - Lead Developer

Video Link
https://youtu.be/eJIh6W9lq-o 

Technologies I Used
Frontend: React, Axios (for the API calls), and React Router.

Backend: Node.js and Express.

Database: MongoDB Atlas (using Mongoose).

Auth: JSON Web Tokens (JWT) and Bcrypt.js for hashing passwords.

How to Run It
Clone the repo: Run git clone with the link.

Install the stuff:

Open the main folder and run npm install.

Go into the client folder and run npm install there too.

Launch:

Start the backend with npm run dev in the root folder.

Start the frontend with npm start in the client folder.

Config Stuff
You must have a .env file in the root folder for the backend to work. It needs these three lines:

MONGO_URI = mongodb+srv://newhorizon333221_db_user:Bigfoot032123@cluster0.rbdjazc.mongodb.net/?appName=Cluster0

PORT = 5000

JWT_SECRET = NKU_Software_Eng_Secret_99!_@PlayerCard_2026

Test Account for Graders
If you don't want to make a new account, use this:

Username: TestPlayer

Password: password123

MVP Features Done
Login/Sign up: Works with encrypted passwords and tokens.

Profile Page: You can set a bio and your current status

Game List: You can add games you play to your profile and delete them.

Database: Everything saves to the cloud via MongoDB.

Stretch Goals
Terraria Database: A digital encyclopedia for 1.4.5 items.

Social Links: Adding Discord and Twitch buttons.

Card Collection: Tracking vintage Pokemon card trades.

API Documentation (The Technical Stuff)
1. Register User
Path: /api/auth/register

Method: POST

What it does: Makes a new account.

2. Login
Path: /api/auth/login

Method: POST

What it does: Logs you in and gives you a token.

3. Get My Profile
Path: /api/profile/me

Method: GET

Auth: Needs a Bearer Token in the header.

What it does: Gets your bio and your game list.

4. Add a Game
Path: /api/profile/games

Method: POST

Auth: Needs a Bearer Token.

5. Delete a Game
Path: /api/profile/games/:id

Method: DELETE

Auth: Needs a Bearer Token.

What it does: Deletes a specific game by its ID.


***Sorry I wasn't in class today. I havent had a car the past two weeks because mine had lots of issues with it. I just bought a car today. I'm not saying this to try to get some credit for the presentation, I just wanted you to know.***

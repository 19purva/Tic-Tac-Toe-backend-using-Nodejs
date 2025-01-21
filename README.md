# Objective 
Demonstrate your backend development skills by creating a system for a simple Tic-Tac-Toe game with user management and game history tracking.  

<strong>To create a simple backend for user registration, follow these steps. I'll guide you through setting up a Node.js backend using Express.js, and MongoDB for storing user data.
</strong>  
 ## Steps to Set Up the Backend
<strong> 1. Set Up the Project Directory </strong>  
Create a new directory for your backend project:  
<strong>
mkdir backend  
cd backend  
</strong>  

<strong> 2. Initialize a Node.js Project </strong>    
Run the following command to create a package.json file:  
<strong> npm init -y  </strong>
<strong>   
3. Install Required Packages</strong>  
You will need the following packages:  
<strong>express:</strong> To create the server and handle routing.  
<strong>mongoose:</strong> To interact with MongoDB.  
<strong>bcryptjs:</strong> For hashing passwords.  
<strong>jsonwebtoken:</strong> For generating JWT tokens.  
<strong>dotenv:</strong> To manage environment variables.  
<strong>cors:</strong> To enable cross-origin requests (useful for frontend-backend communication).  
<strong>body-parser: </strong>To parse incoming request bodies.  
<strong>

4.Install these dependencies:
</strong>  
npm install express mongoose bcryptjs jsonwebtoken dotenv cors body-parser  
<strong>

5.Connect with MongoDB compass </strong>
Connection String : MONGO_URI=mongodb://localhost:27017/

<strong> 6.You can test the API using Postman with the following routes.   </strong>  
1.<strong> User Registration : </strong> Method:POST , URL :http://localhost:4000/auth/register  
2. <strong>Login :</strong> Method: POST , URL: http://localhost:5000/api/login  
3. <strong> Start Game : </strong> Method:POST , URL :http://localhost:4000/game/start  
4.<strong> Make Move: </strong> Method:POST , URL : http://localhost:4000/game/move  
5.<strong> Get Game History : </strong> Method:GET, URL: http://localhost:4000/game/history/678f9244dea39c39fd3b146d

<strong>7.To run backend</strong>  
nodemon server.js


  


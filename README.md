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
2. <strong>Login :</strong> Method: POST , URL: http://localhost:4000/auth/login  
3. <strong> Start Game : </strong> Method:POST , URL :http://localhost:4000/game/start  
4.<strong> Make Move: </strong> Method:POST , URL : http://localhost:4000/game/move  
5.<strong> Get Game History : </strong> Method:GET, URL: http://localhost:4000/game/history/{userID}

<strong>7.To run backend</strong>  
nodemon server.js

# Output
  
![Image](https://github.com/user-attachments/assets/ce5cfbb2-b4d2-4218-9e6b-39a0ea1f965e)
![Image](https://github.com/user-attachments/assets/19f5a112-5216-4bab-bd6c-d650cf3d3cf6)
![Image](https://github.com/user-attachments/assets/6935ae1c-5b57-45ea-be15-ebc4cf73865d)
![Image](https://github.com/user-attachments/assets/019ad35f-1250-422c-a6fc-1d982b42f024)
![Image](https://github.com/user-attachments/assets/ac56d8f4-ce5b-4c8a-9c4e-43855a60f8a7)
![Image](https://github.com/user-attachments/assets/039da752-fcda-442e-ad1c-f481cf2b5c69)
![Image](https://github.com/user-attachments/assets/95d149ed-2b08-4e25-ae2f-c44f7bea1e8d)
![Image](https://github.com/user-attachments/assets/b15ec058-e5c8-4357-8c3f-56fb44f96c2b)

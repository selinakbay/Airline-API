Airline Management API
	Project Overview:
		The Airline Management API is designed to streamline airline operations, allowing admins to manage flights, generate reports, and track user activities. Mobile users can search for flights, book tickets, and perform check-ins. The API supports role-based access control with secure JWT-based authentication.

	Features
		*Admin:
Add, update, and view flight data.
Generate flight capacity reports.
Audit user actions.
		*Mobile:
Search for flights with filters and pagination.
Book tickets and check-in for flights.
		*Authentication:
Role-based authentication for admin and mobile users.
Secure token-based login.

	API Documentation:
API documentation is available via Swagger UI.
localhost:3000/api-docs/#/default/get_api_admin_reportFlights

	ER Diagram:
Below is the Entity-Relationship Diagram for the database:

<img width="1006" alt="ER_Diagram" src="https://github.com/user-attachments/assets/9286f5fd-f3b0-4373-9cda-2bf159a38a4c">

	API Video:
https://drive.google.com/file/d/10oABuCLszAKupNZK8qrKUpEQUc2aFLvg/view?usp=sharing

	Setup Instructions
 
1. Prerequisites
Node.js (v14+ recommended)
MySQL database
Package manager: npm or yarn

2. Clone the Repository
git clone https://github.com/your-username/your-repository.git
cd your-repository

3. Install Dependencies
npm install

4. Configure Environment Variables
Create a .env file in the project root with the following content:

env
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-secret-key
PORT=3000

5. Set Up the Database
Start your MySQL server.
Execute the SQL scripts in database/schema.sql to create tables.

6. Start the Server
npm start
The API will be running at http://localhost:3000.

Deployment
	The project is deployed on [your-cloud-platform]. Access it here:
Live Deployment
(Replace http://your-live-deployment-url with your actual deployment URL.)

How to Use
	Admin Endpoints
Endpoint	                    Method	   Description
/api/v1/admin/flights       	POST	     Add a new flight
/api/v1/admin/reportFlights	  GET	       Generate flight reports

	Mobile Endpoints
Endpoint	                        Method	   Description
/api/v1/mobile/flights	          GET	       Search for flights
/api/v1/mobile/tickets	          POST	     Book a ticket
/api/v1/mobile/tickets/checkin	  POST	     Check-in for a flight

	Authentication
Endpoint	                        Method	   Description
/api/v1/auth/login	              POST	     Login to the system
/api/v1/auth/register	            POST	     Register a new user

Technologies Used:
	Backend: Node.js, Express.js
	Database: MySQL
	Authentication: JSON Web Tokens (JWT)
	Documentation: Swagger UI
	



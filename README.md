# Event management system

## Backend Documentation: 

## Deployed Link: [Click here :cloud:] (https://gyangrove-lnvv.onrender.com)
:warning: Due to Render's free plan, the server may take up to a minute to start if inactive.

## Design Choice


## Link to Video Demo: 


## Running Project Locally

1. **Node.js Version:**
   - The project requires Node.js. Ensure that you have Node.js installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

2. **Clone the Repository:**
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/vivindeena/gyangrove.git
     ```

3. **Environment Variables Setup:**
   - Create an `.env` file in the root directory of the project.
   - Add the following variables to the `.env` file and assign values to them:
     - `PORT`: Specify the port number on which the server will run.

     You can use the provided `.env.example` file as a reference.

4. **Install Dependencies:**
   - Navigate to the project directory in your terminal.
   - Run the following command to install the project dependencies:
     ```bash
     npm install
     ```

5. **Running the Project:**
   - Once the dependencies are installed, start the server by running:
     ```bash
     npm start
     ```

6. **Accessing the Project:**
   - Open your web browser and enter the following URL to access the project locally:
     ```
     http://localhost:<PORT>
     ```
     Replace `<PORT>` with the port number specified in your `.env` file.

## Possible Improvements
1. User segregration for DB to imporve security

## Tasks :white_check_mark:
 - [X] Start a PostgreSQL Container using Docker.
 - [X] Design Tables for the database schema.
 - [X] Write Scripts to set up the databases and tables.
 - [X] Create the Data Creation API endpoint.
 - [] Develop the Event Finder API endpoint. 
 - [X] Containerize the application for deployment.
 - [X] Writing the Docker Compose file

#### Data Injestion Endpoint:

#### Event Finder Endpoint: 
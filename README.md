# Event management system

## Backend Documentation: 

## Deployed Link: [Click here :cloud:](https://gyangrove-lnvv.onrender.com)


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

3. **Change Directories:**
   - Switch to the cloned directory, and then to the setup folder:
     ```bash
     cd gyangrove/setups/
     ```

4. **Environment Variables Setup:**
   - Create an `.env` file in the root directory of the project.
   - Add the following variables to the `.env` file and assign values to them. You can use the provided `.env.example` file as a reference.

5. **Running the project:**
   - Execute the setup script:
     ```bash
     ./setup.sh
     ```
     If unable to execute, give necessary executable permission. For example:
     ```bash
     chmod +x setup.sh
     ```

   - On another terminal, run the following command to set up the database:
     ```bash
     ./database-setup.sh
     ```
     If unable to execute, give necessary executable permission. For example:
     ```bash
     chmod +x database-setup.sh
     ```

6. **Accessing the Project:**
   - Open your web browser and enter the following URL to access the project locally:
     ```
     http://localhost:<PORT>
     ```
     Replace `<PORT>` with the port number specified in your `.env` file.

7. **Starting and Stopping the project:**
   - To start and stop the project, navigate to the same folder and,

   - To start the Docker containers:
     ```bash
     docker-compose up
     ```
   - To stop the Docker containers, use:
     ```bash
     docker-compose down
     ``` 

## Possible Improvements
1. User segregration for DB to imporve security

2. Implement a logging library like ```winston``` to log HTTP requests and other important information.

3. Add a global error handler middleware to handle any uncaught exceptions or unhandled promise rejections.

4. User authenticaltion using libraries like ```jsonwebtoken``` and ```passportjs``` 

5. Implementaion of docker swarm and to scale the solution horizontally


## Tasks :white_check_mark:
- [X] Start a PostgreSQL Container using Docker.

- [X] Design Tables for the database schema.

- [X] Write Scripts to set up the databases and tables.

- [X] Create the Data Creation API endpoint.

- [X] Develop the Event Finder API endpoint.

- [X] Containerize the application for deployment.

- [X] Writing the Docker Compose file.


### Data Injestion Endpoint:
- [X] Process data from CSV using csv-parser.

- [X] Add Data to table, by deleting existing data.

- [X] Append Data to table.


### Event Finder Endpoint: 
- [X] Find events data.

- [X] Add Pagination to the Endpoint.

- [X] Use Promises to parallelize fetching data from External API.


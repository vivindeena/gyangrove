# Event management system

## Backend Documentation: [Click here :bookmark_tabs:](https://documenter.getpostman.com/view/21780682/2sA3BobXRW)

## Deployed Link: [Click here :cloud:]()


## Tech Stack and Database Choice

### Node.js
- **Scalability:** Node.js offers asynchronous event-driven architecture, making it suitable for handling concurrent operations and scaling horizontally.
- **Development Speed:** With a vast ecosystem of libraries and packages, Node.js enables rapid development and easy integration of external APIs.
- **RESTful APIs:** Node.js is well-suited for building RESTful services, facilitating the implementation of API endpoints for data management.

### PostgreSQL
- **Relational Database:** PostgreSQL provides ACID compliance, ensuring data integrity and reliability for managing event data.
- **Indexing:** Utilizing appropriate indexes enhances query performance, especially for spatial and date-based queries in a large dataset.

### Docker Compose
- **Containerization:** Docker Compose simplifies deployment by containerizing the application components, ensuring consistent environments across development, testing, and production.
- **Orchestration:** Managing multiple containers as a single service streamlines deployment and maintenance, enhancing scalability and reliability.

### AWS Deployment
- **Scalability:** AWS provides scalable infrastructure with services like EC2, ECS, or EKS, enabling seamless scaling based on workload demands.
- **Integration:** AWS integrates seamlessly with Docker containers, allowing easy deployment and management through services like ECS or EKS.
- **Cost-Effectiveness:** Leveraging AWS's pay-as-you-go model and free-tier services can optimize costs for hosting and scaling the application.

**Summary:** The chosen tech stack and database combination leverages Node.js for agility and scalability, PostgreSQL for robust data management and geospatial capabilities, Docker Compose for containerized deployment, and AWS for scalable, reliable, and cost-effective hosting solutions.



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


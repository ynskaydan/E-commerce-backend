
# Ecommerce backend with microservices



## Overview
This project adopts a microservices architecture to build a scalable and maintainable system. It consists of the following microservices and an API Gateway:

 User Service: Manages user-related functionalities like registration, login, and profile management.

•   Product Service: Handles product catalog, including adding, listing, and retrieving product details.

•   Order Service: Manages order processing, including creating orders, listing orders, and retrieving order details.

•   API Gateway: Serves as the entry point for the microservices, routing requests to the appropriate service.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### Prerequisites
What things you need to install the software and how to install them.

•	Node.js - Download & Install Node.js

•	MongoDB - Download & Install MongoDB, or set up a cloud instance on MongoDB Atlas

•	Consul

•	Nginx

•	A good text editor or IDE (e.g., VSCode, IntelliJ)





## Installation

#### 1. Clone the repository
```sh
git clone <repository-url>
cd <project-name>
```
#### 2. Install Dependencies
```sh
cd user-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
```
#### 3. Set Up Environment Variables
In each service, create a .env file and configure your environment variables. For example, in the user-service:
```sh
MONGO_URI=mongodb://localhost:27017/userService
PORT=3001
```

#### 4. Setting up NGINX
Install Nginx: Follow the instructions for your operating system to install Nginx.

Configure Nginx: Create a configuration file for your project. Here's an example of what it might look like:
```bash
http {
    server {
        listen 80;

        location /user-service {
            proxy_pass http://localhost:3001;
        }

        location /product-service {
            proxy_pass http://localhost:3002;
        }

        location /order-service {
            proxy_pass http://localhost:3003;
        }
    }
}

```

Start/Restart Nginx: After configuring, start or restart the Nginx server.

Testing Nginx Setup
To test if Nginx is correctly routing requests to your services, send requests to Nginx's address (usually http://localhost/ followed by the service path).

#### 5. Setting Up Consul
Install Consul: Download and install Consul from the official website.

Run Consul Agent: Start the Consul agent in development mode:
```sh
consul agent -dev
```

Register Services with Consul: Each service needs to be registered with Consul. This can be done via configuration files or using Consul's HTTP API.

#### 6. Start the services
```sh
npm start 
```











    
## Usage/Examples
Details about how to use each service.

### User Service
Register User: POST /api/users/register

Login User: POST /api/users/login
### Product Service
Add Product: POST /api/products

List Products: GET /api/products
### Order Service
Create Order: POST /api/orders

Get User Orders: GET /api/orders/:userId
### API Gateway
Route Requests: Routes requests to the appropriate microservice.
Running the Tests

### Running the Tests
```sh
npm test
```


## Authors

- Yunus Kaydan [@ynskaydan](https://www.github.com/ynskaydan)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details.




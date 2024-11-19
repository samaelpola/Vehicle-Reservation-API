# 🚗 Vehicle Reservation API

A RESTful API for managing vehicle reservations built with **Express**, **Sequelize**, and **PostgreSQL**. 
This project utilizes **Docker** for easy setup and deployment.

---

## 📋 Prerequisites

- **Docker**: Ensure Docker is installed and running on your machine.

> **Note**:  
> If `make` is not installed on your machine, refer to the `Makefile` for the equivalent Docker commands.

---

## 🚀 **Getting Started**

### 🏁 Launch the Application

To build and launch the application, run:

```bash
make
```
Or manually execute the following:
```bash
docker compose build
docker compose install
docker compose up
```

---

### 🔗 API Access

- **API Base URL: http://localhost:3000**
- **Adminer (Database Management): http://localhost:8080**

---

### 🔗 API ENDPOINT
### 1. Customer Management
- **Create**: 
  - **URI**: /customers
  - **Method**: POST
  - **Example Body**:
    ```
        {
          "lastName": "doe",
          "firstName": "john",
          "email": "jhon.doe@test.test",
          "phoneNumber": "23232323"
        }   
    ```
- **Update**:
    - **URI**: /customers/:customerId
    - **Method**e: PATCH
    - **NB****: property of body is optionnal
    - **Example Body**:
      ```
          {
            "lastName": "doe",
            "firstName": "john",
            "email": "jhon.doe@test.test",
            "phoneNumber": "23232323"
          }   
      ```
      or
      ```
          {
            "lastName": "doe",
            "phoneNumber": "23232323"
          }   
      ```
- **Delete**: 
  - **URI**: /customers/:customerId
  - **Method**: DELETE
- **GET all**: 
  - **URI**: /customers
  - **Method**: GET
- **GET by ID**: 
  - **URI**: /customers/:customerId
  - **Method**: GET

---

### 2. Vehicle Model Management

- **Create**:
  - **URI**: /models
  - **Method**e: POST
    - **Example Body**:
      ```
          {
            "name": "peugeot 2007",
            "make": "peugeot",
            "year": 2007
          }   
      ```
- **Update**:
    - **URI**: /models/:modelId
    - **Method**e: PATCH
    - **NB****: property of body is optional
    - **Example Body**:
      ```
          {
            "name": "peugeot 2007",
            "make": "peugeot",
            "year": 2007
          }     
      ```
      or
      ```
          {
            "year": 2019
          }   
      ```
- **Delete**:
    - **URI**: /models/:modelId
    - **Method**: DELETE
- **GET all**:
    - **URI**: /models
    - **Method**: GET
- **GET by ID** :
    - **URI**: /models/:modelId
    - **Method**: GET

---

### 3. Vehicle Management

- **Create**:
  - **URI**: /vehicles
    - **Method**e: POST
        - **Example Body**:
          ```
              {
                "registration": "1645546",
                "modelId": 2
              }   
          ```
- **Update**:
    - **URI**: /vehicles/:vehicleId
    - **Method**e: PATCH
    - **NB**: property of body is optional
    - **Example Body**:
      ```
          {
            "registration": "1645546",
            "modelId": 2
          }     
      ```
      or
      ```
          {
            "modelId": 2
          }   
      ```
- **Delete**:
    - **URI**: /vehicles/:vehicleId
    - **Method**: DELETE
- **Get all**:
    - **URI**: /vehicles
    - **Method**: GET
- **GET by id**:
    - **URI**: /vehicles/:vehicleId
    - **Method**: GET

---

### 4. Reservation Management

- **Create**:
    - **URI**: /reservations
    - **Method**e: POST
        - **Example Body**:
          ```
              {
                "startDate": "2024-05-11",
                "endDate": "2024-05-25",
                "customerId": 2,
                "vehicleId": 3
              }   
          ```
- **Update**:
    - **URI**: /reservations/:reservationId
    - **Method**e: PATCH
    - **NB**: property of body is optional
    - **Example Body**:
      ```
          {
             "startDate": "2024-05-11",
             "endDate": "2024-05-25",
             "customerId": 2,
             "vehicleId": 3
          }    
      ```
      or
      ```
          {
            "customerId": 2
          }   
      ```
- **Delete**:
    - **URI**: /reservations/:reservationId
    - **Method**: DELETE
- **GET all**:
    - **URI**: /reservations
    - **Method**: GET
- **GET by id**:
    - **URI**: /reservations/:reservationId
    - **Method**: GET

---

## 🛠 Makefile Commands

| Command              | Description                         |
|----------------------|-------------------------------------|
| <pre>`make build`    | Build the project                   |
| <pre> `make install` | Install dependencies                |
| <pre>`make up`       | Start the project                   |
| <pre> `make down`    | Stop and remove containers          |
| <pre>`make exec`     | Execute a command inside a container|
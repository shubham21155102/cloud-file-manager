# Cloud-File-Manager-


# File Upload and Database Interaction Application

This application utilizes Express.js and AWS SDK to handle user registration, login, file upload to an AWS S3 bucket, and folder creation in a PostgreSQL database. The code provides an API for these functionalities.

## Requirements

- Node.js
- PostgreSQL Database
- AWS account with an S3 bucket

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up environment variables:
   - Create a `.env` file and populate it with necessary credentials and configurations (Refer to `.env.example`).
4. Set up PostgreSQL:
   - Ensure the PostgreSQL database is running and configure connection details in `databasepg.js`.

## Usage

- Run the application using `npm start`.
- Endpoints:
  - `/register`: Register a new user.
  - `/login`: Authenticate user login.
  - `/createfolder`: Create a new folder in the database.
  - `/uploadfile`: Upload a file to the specified S3 bucket and store its details in the database.
  - `/test`: Endpoint to check the server status.

## Endpoints

### POST `/register`

Registers a new user.

Request:

```json
{
    "username": "example_user",
    "email": "user@example.com",
    "password": "password123"
}
```
# cloud-file-manager

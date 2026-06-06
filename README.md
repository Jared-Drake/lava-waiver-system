# Lava Island Waiver System

A full-stack digital waiver system built as my capstone project for my B.S. in Computer Science. The system allows guests to submit waiver information online and allows staff to look up submitted waivers.

## Features

- Guest waiver submission form
- Multiple participants per waiver
- Parent/guardian contact information
- Required agreement confirmation
- Automatic confirmation code generation
- Waiver signed date and expiration date
- Active/inactive waiver status
- Staff lookup by confirmation code
- Staff lookup by parent last name
- Staff lookup by participant last name
- Backend validation
- Custom API error handling
- DTO-based request and response models
- Environment-based configuration
- Service-layer unit tests

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Jakarta Validation
- MySQL
- Gradle
- JUnit
- Mockito

## Project Structure

```text
lava-waiver-system
├── backend
│   ├── src/main/java/com/lavaisland/waiver
│   │   ├── controller
│   │   ├── dto
│   │   ├── exception
│   │   ├── mapper
│   │   ├── model
│   │   ├── repository
│   │   └── service
│   ├── src/main/resources
│   └── src/test
│
└── frontend
    └── src
        ├── api
        ├── components
        ├── utils
        ├── App.jsx
        └── main.jsx
```

## Architecture

The application uses a layered full-stack architecture.

```text
React Frontend
      ↓
Spring Boot REST Controller
      ↓
DTO Request/Response Layer
      ↓
Mapper Layer
      ↓
Service Layer
      ↓
Repository Layer
      ↓
MySQL Database
```

The frontend handles the user interface, waiver form, participant fields, and staff search views. The backend handles validation, waiver creation, confirmation code generation, expiration dates, database persistence, and API responses.

## Backend Design

The backend is organized into separate layers:

- `controller`: Handles REST API requests.
- `dto`: Defines request and response models.
- `mapper`: Converts between DTOs and JPA entities.
- `service`: Contains business logic.
- `repository`: Handles database access with Spring Data JPA.
- `model`: Defines database entities.
- `exception`: Handles custom API errors and validation failures.

Using DTOs keeps the API model separate from the database model and makes the system easier to maintain.

## Frontend Design

The frontend was refactored into smaller files for better readability and maintainability.

Main folders:

- `src/api`: Backend API calls.
- `src/components`: Reusable React components.
- `src/utils`: Helper functions such as date formatting.

Main components include:

- `WaiverForm`
- `ParticipantCard`
- `StaffLookup`
- `WaiverResultCard`
- `Header`
- `Tabs`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/waivers` | Submit a new waiver |
| GET | `/api/waivers` | Get all waivers |
| GET | `/api/waivers/code/{confirmationCode}` | Find a waiver by confirmation code |
| GET | `/api/waivers/search/parent?lastName=` | Search by parent last name |
| GET | `/api/waivers/search/participant?lastName=` | Search by participant last name |

## Configuration

The project uses environment-based configuration.

### Backend

Spring profile files:

```text
application.properties
application-dev.properties
application-prod.properties
```


### Frontend

The frontend uses a Vite environment variable for the backend API URL.

```env
VITE_API_BASE_URL=http://localhost:8080/api/waivers
```

## Running the Project Locally

### Backend

```bash
cd backend
./gradlew bootRun
```

On Windows PowerShell:

```powershell
cd backend
.\gradlew bootRun
```

Backend URL:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Testing

The project includes service-layer unit tests.

The tests verify:

- Waiver creation
- Signed status assignment
- Active status assignment
- Expiration date assignment
- Confirmation code generation
- Participant linking
- Confirmation code lookup
- Custom exception behavior for missing waivers
- Parent last name search
- Participant last name search

Run backend tests:

```bash
cd backend
./gradlew test
```

## Production-Style Improvements

Completed improvements include:

- Frontend component refactor
- Centralized frontend API layer
- Frontend environment variable configuration
- Backend development and production profiles
- Backend environment variable database configuration
- DTO-based API design
- Mapper layer between DTOs and entities
- Custom exception handling
- Improved validation rules
- Service-layer unit testing

## Current Status

This project is currently at a point where I am satisfied submitting it as my capstone project, in the future I may come back to this project to potentially make it production ready.
## Future Improvements

Planned future improvements include:

- Staff authentication and authorization
- Role-based access control
- Controller and integration tests
- Flyway database migrations
- Admin dashboard
- Audit logging
- Waiver PDF export
- Email confirmation
- Cloud deployment
- CI/CD with GitHub Actions
- Improved mobile styling
- Database backup and restore process
es the design and implementation of a full-stack software application using React, Spring Boot, and MySQL. The project shows how a real business process can be improved through software by replacing a manual waiver lookup process with a digital submission and search workflow.
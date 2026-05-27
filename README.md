# Lava Island Waiver System

This project is a digital waiver system built for Lava Island. The goal of the project is to replace or improve the current waiver process by allowing guests to submit waiver information online and allowing staff to look up submitted waivers through a confirmation code.

## Project Overview

The system includes a Spring Boot backend, a MySQL database, and a React frontend. Guests can fill out a waiver form, submit it, and receive a confirmation code. Staff can then use that confirmation code to look up the waiver and verify that it is active.

## Features

- Guest waiver submission form
- Backend validation for required fields
- MySQL database storage
- Automatic confirmation code generation
- Waiver expiration date
- Active waiver status
- Staff lookup by confirmation code
- React frontend connected to Spring Boot backend

## Tech Stack

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- React
- Vite
- JavaScript
- CSS
- Gradle

## Project Structure

```text
lava-waiver-system
├── backend
│   ├── src
│   ├── build.gradle
│   └── settings.gradle
│
└── frontend
    ├── src
    ├── package.json
    └── vite.config.js

# Mental Care System

## Overview
The Mental Care System is a comprehensive platform designed to connect psychologists with users seeking mental health support. The platform allows psychologists to manage their appointments, post blogs, and conduct online sessions. General users can book appointments and read mental health blogs. Admins have the ability to manage psychologists and oversee platform operations.

## Features

### 1. User Roles
- **Admin**: Manages platform activities, including approving psychologist accounts and managing users.
- **Psychologists**:
  - Free sign-up (requires admin approval).
  - Create online and offline appointments.
  - Post blogs.
  - Offer online appointments via video call and chat.
  - Receive payment for appointments.
- **General Users**:
  - Read blogs.
  - Book online or offline appointments with psychologists.

### 2. Authentication & Authorization
- **User Login & Registration**:
  - Psychologist and General User registration.
  - Login functionality.
  - Token-based authentication using **JWT**.

### 3. Blog Management
- **Psychologists**:
  - Create, update, and delete blog entries.
- **General Users**:
  - View all blogs posted by psychologists.

### 4. Appointment System
- **Psychologists**:
  - Create appointment slots (online/offline).
  - Manage appointments.
- **General Users**:
  - View available appointments.
  - Book appointments and pay online for confirmation.

### 5. Communication System
- **Chat and Messaging**:
  - Psychologists and users can communicate via chat.
  - Supports file uploads and document sharing during chat.
  - Video calling functionality for online appointments.

### 6. Admin Controls
- Approve/decline psychologist sign-up requests.
- Manage and delete users.

## Technologies Used

### Frontend
- **React** - Version 18
  - **React-Router** for navigation.
  - **Redux** for state management.
  - **Bootstrap** for styling.

### Backend
- **ASP.NET Core** - Version 7 (Web API)
  - Controllers for authentication, blog, chat, and user management.
  - RESTful services for the frontend to interact with.

### Database
- **MSSQL**
  - Entity Framework Core for ORM and database management.

### Authentication
- **JWT** (JSON Web Tokens) for securing endpoints and managing user sessions.

### Real-Time Communication
- **Zego Cloud**

## Setup and Installation

### Prerequisites
- .NET SDK 7.0+
- Node.js 16.x or higher
- MSSQL Server

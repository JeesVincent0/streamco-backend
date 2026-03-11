# Streamco Backend

## Overview

Streamco is a **live streaming platform** where creators can create channels and broadcast live content.
The platform also includes a **unique advertisement auction system**, allowing advertisers to bid for banner placements on creator streams.

This repository contains the **backend API built with NestJS** that powers the Streamco platform.

The backend handles:

* User authentication and authorization
* Channel and live stream management
* Advertisement auction system
* Admin analytics and platform management
* Communication with the frontend application

---

## Architecture

The backend follows a **Modular Monolith architecture** with **Clean Architecture principles**.

Key design principles:

* SOLID principles
* Clear separation of concerns
* Scalable module-based structure
* Testable and maintainable codebase

Layers used in the architecture:

* **Domain Layer** – business entities and rules
* **Application Layer** – use cases and business logic
* **Infrastructure Layer** – database, external services, repositories
* **Interface Layer** – controllers and API endpoints

---

## Tech Stack

* NestJS
* Node.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Passport
* Google OAuth
* Docker (optional)

---

## User Roles

The platform supports multiple roles.

### Viewer

* Watch live streams
* Discover channels
* Interact with creators

### Content Creator

* Create and manage channels
* Schedule and start live streams
* Display advertisement banners during streams

### Advertiser

* Create advertisement campaigns
* Participate in banner auctions
* Bid for advertisement slots on creator streams
* Manage purchased advertisement placements

### Admin

* Manage platform users
* Manage creators and advertisers
* Monitor platform statistics
* View analytics and reports

---

## Advertisement Auction System

One of the core features of Streamco is the **advertisement auction system**.

How it works:

1. A creator schedules a live stream.
2. Advertisement banner slots become available for that stream.
3. Advertisers place bids to display their ads on the creator's stream.
4. Multiple advertisers can participate in the auction.
5. The advertiser with the **highest bid wins the banner placement**.

This allows creators to monetize their streams and advertisers to reach targeted audiences.

---

## Project Structure

```text
src
 ┣ modules
 ┃ ┣ auth
 ┃ ┣ user
 ┃ ┣ channel
 ┃ ┣ livestream
 ┃ ┣ advertisement
 ┃ ┣ auction
 ┃ ┗ admin
 ┣ shared
 ┣ config
 ┗ main.ts
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/JeesVincent0/streamco-backend
```

Navigate to the project folder

```bash
cd streamco-backend
```

Install dependencies

```bash
npm install
```

---

## Running the Application

Run the development server

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3001
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/streamco
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## API Documentation

API endpoints can be tested using:

* Postman
* Swagger (if enabled)

Example API modules:

* Authentication
* User Management
* Channel Management
* Live Streaming
* Advertisement Management
* Auction System
* Admin Analytics

---

## Future Improvements

* Real-time chat during streams
* WebRTC-based streaming improvements
* Advanced analytics for creators
* AI-based ad targeting
* Real-time auction updates using WebSockets

---

## Author

Jees Vincent

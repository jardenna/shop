# MERN Shop

A full-stack e-commerce application built with the MERN stack using modern React and TypeScript.

# Installation

## Prerequisites

Before running the project, make sure the following software is installed:

- Node.js 22+
- npm
- MongoDB
- Git

---

## Clone the repository

```bash
git clone https://github.com/your-username/mern-shop.git
cd mern-shop
```

---

## Install dependencies

Install dependencies for both the frontend and backend.

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
NODE_ENV=development

PORT=5000

CLIENT_URL=http://localhost:3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CURRENCY_API_KEY=your_currency_api_key
```

Create a `.env` file inside the `client` folder.

Example:

```env
VITE_API_URL=http://localhost:5000/api

VITE_CURRENCY_API_KEY=your_currency_api_key
```

---

## Start the application

```bash

npm start
```

The application will typically be available at:

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5000
```

## Tech Stack

### Frontend

- React 19
- TypeScript
- React Router
- Redux Toolkit
- RTK Query
- SCSS
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

---

# Localization

The application supports multiple languages.

Currently supported:

- English
- Danish

Translations are maintained in CSV files and automatically converted into JSON files during development.

# Features

## Features

- English and Danish UI
- Backend validation messages translated
- Shared translation keys across frontend and backend
- Automatic language detection
- Language preference persisted for returning users

Translation files are generated automatically, making it easy to add new languages in the future.

## Authentication

- Register
- Login
- Logout
- Cookie based authentication
- Protected routes
- Role based permissions

## Products

- Product listing
- Product details
- Categories
- Subcategories
- Product images
- Inventory management
- Published / Inactive / Scheduled products

## Shopping Cart

- Guest cart
- User cart
- Cart synchronization after login
- Quantity updates
- Remove products
- Price calculation
- Shipping calculation
- Discount calculation

## Checkout

- Shipping address selection
- Billing address selection
- Multiple payment methods
- Order summary
- Tax calculation
- Shipping calculation
- Discount handling

## Payment Methods

- Visa
- Mastercard
- PayPal
- MobilePay

Current payment flow uses fake payment validation and is designed so a real payment provider can be integrated later.

## Orders

- Create order
- Order history
- Payment status
- Order summary
- Shipping information
- Billing information

## User Profile

- Update profile
- Manage addresses
- Standard delivery address
- Standard billing address
- Duplicate address validation
- Maximum address limit

## Promotions

- Promo codes
- Employee discounts
- Automatic summary recalculation

---

# Internationalization

The application supports multiple languages.

Currently supported:

- English
- Danish

Translations are maintained as CSV files and automatically converted into language JSON files during development.

---

# Accessibility

The frontend is built with accessibility as a priority.

- WCAG 2.2 compliant components
- Keyboard navigation
- Semantic HTML
- Accessible forms
- Accessible modals
- Accessible tooltips

---

# API

REST API built with Express.

Typical resources include:

- Authentication
- Products
- Categories
- Cart
- Checkout
- Orders
- Users
- Addresses

---

# Project Structure

```
client/
    src/
        api/
        components/
        features/
        hooks/
        layouts/
        pages/
        routes/
        services/
        styles/
        utils/
        locales/

server/
    config/
    constants/
    controllers/
    middleware/
    models/
    routes/
    services/
    validators/
    utils/
```

---

# Architecture

The project follows a feature-oriented architecture with:

- Reusable UI components
- Custom hooks
- RTK Query for server state
- Utility driven business logic
- Centralized constants
- Validation utilities
- Shared pricing calculations

Business logic is kept outside controllers whenever possible.

---

# Current Highlights

- Modern React architecture
- Fully typed TypeScript frontend
- RTK Query data layer
- Cookie authentication
- Modular backend
- Centralized validation
- Reusable pricing engine
- Translation pipeline
- Accessible component library

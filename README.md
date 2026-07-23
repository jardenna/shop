# MERN Shop

A full-stack e-commerce application built with the MERN stack using modern React and TypeScript.

## Installation

### Prerequisites

Before running the project, make sure the following software is installed:

- Node.js 22+
- npm
- MongoDB
- Git

### Clone the repository

```bash
git clone https://github.com/your-username/mern-shop.git
cd mern-shop
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Copy the sample environment file:

```bash
cp .env.sample .env
```

Update the variables to match your local environment before starting the application.

### Start the application

Run the application with:

```bash
npm start
```

`npm start` uses **concurrently** to start both the frontend and backend with a single command.

The application will typically be available at:

**Frontend**

```text
http://localhost:3000
```

**Backend**

```text
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

## Localization

The application supports multiple languages.

Currently supported:

- English
- Danish

````md
Translations are maintained in CSV files. Run the following command to generate the JSON translation files:

````bash
npm run translate

Localization includes:

- English and Danish UI
- Backend validation messages
- Shared translation keys across frontend and backend
- Automatic language detection
- Persisted language preference
- CSV-based translation workflow

## Features

### User Experience

- Responsive layout across mobile, tablet, and desktop
- Skeleton loading states while data is being fetched
- Accessible navigation and forms
- Optimized loading experience

### Authentication

- Register
- Login
- Logout
- Cookie-based authentication
- Protected routes
- Role-based permissions

### Products

- Product listing
- Product details
- Categories
- Subcategories
- Product images
- Inventory management
- Published, Inactive and Scheduled products

### Shopping Cart

- Guest cart
- User cart
- Cart synchronization after login
- Quantity updates
- Remove products
- Price calculation
- Shipping calculation
- Discount calculation

### Checkout

- Shipping address selection
- Billing address selection
- Multiple payment methods
- Order summary
- Tax calculation
- Shipping calculation
- Discount handling

### Payment Methods

- Visa
- Mastercard
- PayPal
- MobilePay

Current payment flow uses fake payment validation and is designed so a real payment provider can be integrated later.

### Orders

- Create order
- Order history
- Payment status
- Order summary
- Shipping information
- Billing information

### User Profile

- Update profile
- Manage addresses
- Standard delivery address
- Standard billing address
- Duplicate address validation
- Maximum address limit

### Promotions

- Promo codes
- Employee discounts
- Automatic summary recalculation

## Accessibility

The frontend is built with accessibility as a priority.

- WCAG 2.2 compliant components
- Keyboard navigation
- Semantic HTML
- Accessible forms
- Accessible modals
- Accessible tooltips

## API

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

## Project Structure

```text
client/
└── src/
    ├── api/
    ├── components/
    ├── features/
    ├── hooks/
    ├── layouts/
    ├── locales/
    ├── pages/
    ├── routes/
    ├── services/
    ├── styles/
    └── utils/

server/
├── config/
├── constants/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── validators/
````
````

## Architecture

The project follows a feature-oriented architecture with:

- Reusable UI components
- Custom hooks
- RTK Query for server state
- Utility-driven business logic
- Centralized constants
- Shared validation utilities
- Shared pricing calculations
- Modular Express controllers
- Reusable services

Business logic is kept outside controllers whenever possible.

## Current Highlights

- Modern React 19 architecture
- Fully typed TypeScript frontend
- RTK Query data layer
- Cookie-based authentication
- Modular Express backend
- Shared pricing engine
- CSV-based localization pipeline
- WCAG 2.2 accessible component library
- English and Danish language support

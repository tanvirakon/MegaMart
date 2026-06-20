# MegaMart

MegaMart is a full-stack e-commerce application for browsing electronics,
managing products, and purchasing items through a role-based marketplace.
Buyers can search, filter, view, and add products to their cart, while sellers
can upload and manage their own product catalogue.

![MegaMart home page](ss%20for%20readme/Screenshot%202026-06-20%20190400.png)

## Features

- Buyer, seller, and admin accounts with JWT authentication
- Product search, category filters, price sorting, and recommendations
- Product details, cart quantities, and live cart totals
- Seller product uploads with multiple Cloudinary images
- Stripe and SSLCommerz payment integrations
- MongoDB Atlas storage with a repeatable product-import script

## Screenshots

<p align="center">
  <img src="ss%20for%20readme/Screenshot%202026-06-20%20190419.png" alt="Product catalogue and filters" width="49%">
  <img src="ss%20for%20readme/Screenshot%202026-06-20%20190426.png" alt="Product details and recommendations" width="49%">
</p>

<p align="center">
  <img src="ss%20for%20readme/Screenshot%202026-06-20%20190555.png" alt="Seller product dashboard" width="49%">
  <img src="ss%20for%20readme/Screenshot%202026-06-20%20190616.png" alt="Product upload form" width="49%">
</p>

## Built With

React, Vite, Tailwind CSS, Redux Toolkit, Express, Mongoose, MongoDB Atlas,
Cloudinary, Stripe, and SSLCommerz.

## Local Setup

Requirements: Node.js, npm, and a MongoDB Atlas cluster.

1. Install dependencies:

   ```powershell
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

2. Copy `backend/.env.example` to `backend/.env`, then add your MongoDB Atlas,
   authentication, email, and payment credentials. Never commit `.env`.

3. Optionally import the included product data:

   ```powershell
   cd backend
   npm run import:products
   ```

4. Start the API and frontend in separate terminals:

   ```powershell
   cd backend
   npm run dev
   ```

   ```powershell
   cd frontend
   npm run dev
   ```

On Windows, `kk.bat` starts both development servers after dependencies and
environment variables are configured.

The frontend runs at `http://localhost:5173` and the API at
`http://localhost:3000`.

For Atlas configuration details, see [backend/ATLAS_SETUP.md](backend/ATLAS_SETUP.md).

# Brevia Fullstack Project ☕

## Project Overview

Brevia is a **frontend-based coffee & bakery web application** built using **React**. The project allows users to browse menu items, customize orders, manage a cart, place orders, and view reviews. It demonstrates component-based design, state management using Context API, and clean project structure suitable for academic submission and GitHub hosting.

---

## Tech Stack

* **Frontend:** React (Vite)
* **Language:** JavaScript (JSX)
* **State Management:** React Context API
* **Assets:** Images (cakes, coffee, desserts)
* **Version Control:** Git & GitHub

---

## Folder Structure (Simplified)

```
frontend/
 └── src/
     ├── api/
     │    └── index.js
     ├── assets/
     │    └── images (coffee, cakes, desserts)
     ├── component/
     │    └── MapViews.jsx
     ├── context/
     │    └── CartContext.jsx
     ├── data/
     │    └── bakeryItems.js
     ├── pages/
     │    ├── home.jsx
     │    ├── menu.jsx
     │    ├── customize.jsx
     │    ├── checkout.jsx
     │    ├── orders.jsx
     │    ├── reviews.jsx
     │    └── admin.jsx
     ├── App.jsx
     ├── main.jsx
     └── index.js
```

---

## Project Functionalities

* Display bakery & coffee products from database
* Menu listing with images, prices, and descriptions
* Customize product options before ordering
* Add, remove, and update items in cart
* Cart state management using React Context API
* Checkout page to place orders
* Orders stored and fetched from database
* Reviews stored and displayed from database
* Admin view for managing products and orders


---

## Database Structure (MySQL / phpMyAdmin)

The project uses a database named **`brevia`** with the following tables:

| Table Name   | Purpose                                  |
| ------------ | ---------------------------------------- |
| bakery_items | Stores bakery and coffee product details |
| products     | Manages available products               |
| orders       | Stores customer orders                   |
| product_sold | Tracks sold products                     |
| reviews      | Stores customer reviews                  |

---

## Module & Work Distribution 

| Module / File       | Description                  | Student Responsible |
| ------------------- | ---------------------------- | ------------------- |
| home.jsx            | Landing page and main UI     | Nimra Rauf          |
| menu.jsx            | Menu display from database   | Nimra Rauf          |
| bakeryItems.js      | Frontend data handling       | Nimra Rauf          |
| assets (images)     | Product images and media     | Nimra Rauf          |
| products table      | Product data management      | Nimra Rauf          |
| customize.jsx       | Product customization        | Malaika Raheem      |
| checkout.jsx        | Checkout and order placement | Malaika Raheem      |
| orders.jsx          | Fetch and display orders     | Malaika Raheem      |
| reviews.jsx         | Fetch and display reviews    | Malaika Raheem      |
| CartContext.jsx     | Cart state management        | Malaika Raheem      |
| orders table        | Order storage                | Malaika Raheem      |
| reviews table       | Review storage               | Malaika Raheem      |
| product_sold table  | Sold products tracking       | Malaika Raheem      |
| api/index.js        | API communication            | Malaika Raheem      |
| App.jsx             | Routing and app structure    | Both                |
| main.jsx / index.js | Application entry point      | Both                |

--------------|------------|--------------------|
| home.jsx | Landing page and main UI | Nimra Rauf |
| menu.jsx | Menu display of bakery & coffee items | Nimra Rauf |
| bakeryItems.js | Static data for products | Nimra Rauf |
| assets (images) | Product images and media | Nimra Rauf |
| customize.jsx | Product customization logic | Malaika Raheem |
| checkout.jsx | Checkout and order confirmation | Malaika Raheem |
| orders.jsx | Display placed orders | Malaika Raheem |
| reviews.jsx | Customer reviews section | Malaika Raheem |
| CartContext.jsx | Cart state management | Malaika Raheem |
| MapViews.jsx | Map/location component | Nimra Rauf |
| api/index.js | API handling structure | Malaika Raheem |
| App.jsx | Routing and app structure | Nimra Rauf & Malaika Raheem |
| main.jsx / index.js | Application entry point | Nimra Rauf & Malaika Raheem |

---

## Contribution Summary

* **Nimra Rauf:** UI pages, menu display, assets management, map component, core layout.
* **Malaika Raheem:** Cart logic, customization, checkout, orders, reviews, and state management.
* **Both Students:** App setup, routing, debugging, testing, and GitHub collaboration.

---

## How to Run the Project

1. Clone the repository
2. Navigate to the `frontend` folder
3. Install dependencies using `npm install`
4. Run the project using `npm run dev`
5. Open the provided localhost link in the browser

---




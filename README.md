# Abhishek Singh Sahil | Premium Business Portfolio & Intake Platform

A production-ready, highly professional, minimal, and modern developer portfolio and digital solution intake platform built specifically for **Abhishek Singh Sahil**.

This application is built with a standard **MERN** stack (MongoDB, Express, React, Node) using **plain JavaScript** and is fully decoupled.

---

## 🎨 Creative Theme & Aesthetic
* **Modern Minimalist Brand**: Redesigned to look like a premium digital agency rather than a retro game.
* **Refined Palette**:
  - Warm Off-White: `#F7F6F2` (Layout Background)
  - Deep Navy: `#18212B` (Typography & Dark sections)
  - Muted Sage Green: `#7C9A8B` (Success indicators, borders, tags)
  - Soft Blue: `#6B7FA3` (Secondary cards, elements)
  - Warm Gold: `#C89B4B` (Buttons, highlights)
  - White: `#FFFFFF` (Surface Cards)
* **Typography**: Elegant classic serif (`Playfair Display`) headers and clean editorial geometric sans-serif (`Plus Jakarta Sans`) for content.
* **Subtle Pixel Touches**: Restricted to a custom cursor accent and clean geometric details.

---

## 🛠 Technology Stack

* **Frontend (`client/`)**: React.js SPA, Vite, Tailwind CSS, React Router, Framer Motion, Lucide React, React Markdown.
* **Backend (`server/`)**: Node.js, Express.js, Mongoose, Multer (Local uploads), JWT authentication, Bcrypt.
* **Database**: MongoDB (Mongoose models and schemas).

---

## 📁 Project Structure

```text
Abhishek SDE/
├── server/
│   ├── src/
│   │   ├── config/          # Database connections
│   │   ├── controllers/     # REST CRUD controllers (plain JS)
│   │   ├── middleware/      # Auth (JWT), uploads (Multer)
│   │   ├── models/          # Mongoose Schemas (Index.js)
│   │   ├── routes/          # REST route endpoints
│   │   └── scripts/         # DB Seed script
│   └── package.json
├── client/
│   ├── public/              # Global templates
│   ├── src/
│   │   ├── components/      # Premium Header, Footer, Custom Cursors, and UI Cards
│   │   ├── context/         # AuthContext (Google OAuth & Mock authentication)
│   │   ├── lib/             # API client helper (fetch)
│   │   ├── pages/           # Pages (Home, Services, Projects, Enquiry, Dashboards)
│   │   ├── App.jsx          # Route controller
│   │   ├── main.jsx         # Vite entry point
│   │   └── index.css        # Global CSS stylesheet & Tailwind imports
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js       # Vite proxy settings
└── README.md
```

---

## 🚀 Local Setup & Installation

### Prerequisite

* Install Node.js (v18+)
* Make sure MongoDB is executing locally on port `27017` or use a MongoDB Atlas connection string.

### 1. Server Configuration

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables inside `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/pixel-world
   JWT_SECRET=your_user_jwt_secret
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   GOOGLE_CLIENT_ID=optional-google-client-id
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```
4. Run the database seed script to populate default brand metrics, services, skills, projects, and seed the superadmin:
   ```bash
   npm run seed
   ```
   *Seeded Admin Credentials:*
   * **Email:** `admin@pixeldev.com`
   * **Password:** `adminpassword123`

5. Start the backend developer server:
   ```bash
   npm run dev
   ```

### 2. Client Configuration

1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔒 Security & Client Management
* **Enquiry timeline system**: Logged-in users can check real-time pipeline status updates on their dashboards.
* **Google authentication**: Allows mock logins during local development to facilitate easy testing.
* **Unified Admin Panel**: Complete dashboard for administrators to view, edit, and add services, skills, portfolio project blueprints, inbox messages, site details, and SEO settings.

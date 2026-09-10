# ContentHub - Content Writing Services Platform

A full-stack content writing services website similar to [Textuar](https://textuar.com/), built with **React**, **Node.js**, and **MySQL**.

## Features

### Public Website
- Homepage with hero, stats, services, process, testimonials, blog preview, FAQ
- About Us page
- Services listing and detail pages
- Industries listing and detail pages
- Blog with categories
- Content samples portfolio
- Contact form
- Quote request form
- FAQ page with category filters
- User registration and login

### Admin Panel (`/admin`)
- Dashboard with stats and recent inquiries/quotes
- CRUD for Services, Industries, Blog Posts, Testimonials, FAQs, Samples
- Manage contact inquiries and quote requests
- Site settings and homepage stats editor

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend  | Node.js, Express.js                 |
| Database | MySQL                               |
| Auth     | JWT (JSON Web Tokens)               |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+

## Setup Instructions

### 1. Clone and install dependencies

```bash
cd c:\seo\backend
npm install

cd ..\frontend
npm install
```

### 2. Configure MySQL

Create a MySQL database user or use root. Copy the environment file:

```bash
cd c:\seo\backend
copy .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=contenthub
JWT_SECRET=your-secret-key
```

### 3. Initialize the database

```bash
cd c:\seo\backend
npm run db:setup
```

This creates all tables and seeds sample data.

### 4. Start the servers

**Terminal 1 - Backend:**
```bash
cd c:\seo\backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd c:\seo\frontend
npm run dev
```

### 5. Open the app

- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin
- **API:** http://localhost:5001/api/health

## Default Login Credentials

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@contenthub.com   | admin123  |
| User  | user@contenthub.com    | user123   |

## Project Structure

```
c:\seo\
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── database/       # Schema & seed script
│   │   ├── middleware/     # Auth middleware
│   │   ├── routes/         # API routes
│   │   └── server.js       # Express entry point
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # Layout, admin components
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Public pages
│   │   └── pages/admin/    # Admin CRUD pages
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint              | Auth   | Description           |
|--------|-----------------------|--------|-----------------------|
| POST   | /api/auth/login       | No     | Login                 |
| POST   | /api/auth/register    | No     | Register              |
| GET    | /api/services         | No     | List services         |
| GET    | /api/industries       | No     | List industries       |
| GET    | /api/blog             | No     | List blog posts       |
| GET    | /api/testimonials     | No     | List testimonials     |
| GET    | /api/faqs             | No     | List FAQs             |
| GET    | /api/samples          | No     | List samples          |
| POST   | /api/contact          | No     | Submit contact form   |
| POST   | /api/quotes           | No     | Submit quote request  |
| GET    | /api/settings         | No     | Site settings & stats |
| GET    | /api/settings/dashboard | Admin | Dashboard data      |
| POST/PUT/DELETE | Various admin routes | Admin | CRUD operations |

## Production Build

```bash
cd c:\seo\frontend
npm run build

cd c:\seo\backend
npm start
```

Serve the `frontend/dist` folder via nginx or configure Express to serve static files.

## License

MIT
# narendra-profile

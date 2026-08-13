# KennyKentola Portfolio

A full-stack portfolio website for **Ademola Peter Kehinde (KennyKentola)** — a Full-Stack Developer, UI/UX Designer, and Author. Built with React on the front end and Express.js + MongoDB on the back end.

## Live Demo

[https://kennykentola.vercel.app ](https://kennykentola.vercel.app)

## Tech Stack

### Frontend

- **React 19** — UI library
- **React Router 7** — client-side routing
- **React Icons** — icon set
- **EmailJS** — client-side contact form emails
- **React Toastify** — toast notifications
- **Axios** — HTTP client
- **React Testing Library** — component tests
- **Vercel** — frontend deployment

### Backend

- **Node.js** — runtime
- **Express.js** — API framework
- **MongoDB** — database
- **Mongoose** — ODM
- **Nodemailer** — transactional emails
- **JWT** — admin authentication
- **Express Rate Limit** — brute-force protection
- **CORS** — cross-origin requests
- **Render / Railway** — backend deployment

## Features

- **Hero Section** — typing animation, social links, resume download, theme toggle
- **About Me** — profile, bio, contact quick-link
- **Skills** — technical skill showcase
- **Projects** — live project grid with category filtering, featured sections, and tech-stack tags
- **Education & Experience** — academic and professional timeline
- **Testimonials** — client/peer recommendations
- **Contact Form** — message submission with email notifications
- **Admin Dashboard** — JWT-protected panel to view and manage contact submissions
- **Dark / Light Theme** — persistent theme toggle
- **SEO** — sitemap.xml and robots.txt included
- **Responsive Design** — mobile-first layout

## Project Structure

```
portfolio-website/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── sitemap.xml
│   │   └── robots.txt
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── HeroSection.jsx
│       │   ├── About.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── EducationExperience.jsx
│       │   ├── Testimonials.jsx
│       │   ├── Contact.jsx
│       │   ├── Admin.jsx
│       │   └── ...
│       ├── context/
│       │   └── ThemeContext.js
│       ├── hooks/
│       │   └── useScrollAnimation.js
│       ├── utils/
│       │   └── apiBaseUrl.js
│       └── index.js
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Message.js
│   │   ├── Project.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── projectRoutes.js
│   ├── utils/
│   │   └── adminToken.js
│   └── server.js
├── vercel.json
├── nixpacks.toml
├── .env.example
├── .gitignore
└── Dockerfile
```

## Local Development

### Prerequisites

- Node.js 24.x
- MongoDB (local or Atlas)
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kennykentola/portfolio-website.git
   cd portfolio-website
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Configure environment variables in `backend/.env`:

   ```env
   MONGO_URI=your_mongodb_uri
   PORT=5001
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ADMIN_TOKEN_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. Create `frontend/.env.local`:
   ```env
   REACT_APP_API_URL=http://localhost:5001
   ```

### Running Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm start
```

- Frontend runs at `http://localhost:3000`
- Backend API runs at `http://localhost:5001`

## Deployment

- **Frontend** is deployed on Vercel using the `vercel.json` configuration.
- **Backend** is containerized with Docker and deployed via Render/Railway using `nixpacks.toml`.

## Author

**Ademola Peter Kehinde** — Full-Stack Developer, UI/UX Designer, and Author of _React Native and Expo Go_ (full-length technical book). Currently completing a B.Sc. in Computer Science at the University of Ibadan.

- GitHub: [@kennykentola](https://github.com/kennykentola)
- LinkedIn: [Ademola Peter Kehinde](https://www.linkedin.com/in/ademola-peter-kehinde-44650a2b9)
- WhatsApp: [+234 816 357 1677](https://wa.me/2348163571677)

## License

ISC

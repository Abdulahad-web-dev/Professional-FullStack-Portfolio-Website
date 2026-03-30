# 🌌 Professional Full-Stack Portfolio Website

A premium, interactive, and fully responsive portfolio website built to showcase projects, skills, and experience with a modern serverless architecture. It features a stunning dark-themed, glassmorphic UI, integrated 3D visual effects, and a secure admin dashboard powered by **Supabase**.

## ✨ Key Features

- **Premium Dark UI**: A modern interface featuring glassmorphism, smooth gradients, and elegant typography.
- **Modern Serverless Architecture**: Fully migrated from Node.js/MongoDB to **Supabase** for real-time data and media handling.
- **Secure Admin Dashboard**: Manage Projects, Skills, Experience, and Education directly through a secure, built-in interface.
- **Integrated Storage**: Automatical handles image and CV uploads via Supabase Storage.
- **Fluid Animations**: Immersive 3D backgrounds with `Three.js` and smooth element transitions with `Framer Motion`.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4
- **Animations & 3D**: Framer Motion, Three.js, tsParticles
- **Scrolling**: Lenis (Smooth Scroll)
- **Icons**: Lucide React

### Backend-as-a-Service (BaaS)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT-based)
- **Storage**: Supabase Storage (for Assets)

---

## 📂 Project Structure

- `/portfolio` - The React frontend application.
- `/archive` - Legacy Node.js backend and static files (archived).

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Abdulahad-web-dev/Professional-Full-Stack-Portfolio-Website.git
cd Professional-Full-Stack-Portfolio-Website
```

### 2. Setup Database
1. Create a new project in [Supabase](https://supabase.com/).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `portfolio/SUPABASE_SCHEMA.sql` and run them to create all required tables.

### 3. Configure Environment Variables
Create a `.env` file in the `portfolio` folder:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally
```bash
npm install
npm run dev
```

---

## 🔒 Authentication
To access the Admin Panel (`/admin`):
1. Go to **Authentication > Users** in your Supabase Dashboard.
2. Manually add an admin user with an email and password.
3. Use those credentials to log into your portfolio at `http://localhost:5173/admin/login`.

---

## 🚀 Deployment (Vercel)

When deploying to Vercel:
1. Set the **Root Directory** to `portfolio`.
2. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.
3. Vercel will automatically detect the Vite builder and deploy your site.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Abdulahad-web-dev/Professional-Full-Stack-Portfolio-Website/issues).

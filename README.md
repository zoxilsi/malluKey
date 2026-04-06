<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/keyboard.svg" width="100" height="100" alt="Keyboard Icon" style="filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);"/>
  <h1 style="color: #22c55e;">MalluKey</h1>
  <p><strong>A beautifully designed Malayalam Speed Typing Application</strong></p>
</div>

## 🌟 About The Project

MalluKey is a modern, fast, and secure web application built to help users practice and improve their Malayalam typing speed. It features a completely custom virtual Malayalam keyboard layout mapping, real-time WPM (Words Per Minute) tracking, and a global Top 10 Leaderboard.

Built with **Next.js (App Router)** and **Supabase**, this project ensures optimal performance and a secure backend where sensitive data and API keys are strictly kept on the server.

### ✨ Features
- ⌨️ **Custom Malayalam Keyboard Mapping**: Learn and practice exact Malayalam key positions.
- ⚡ **Real-time WPM & Accuracy Tracking**: Instant feedback on your typing speed.
- 🏆 **Global Top 10 Leaderboard**: Compete with others! Only the top 10 scores are kept securely in the database.
- 🔒 **Secure Architecture**: Supabase communication is handled purely via Next.js Server Actions, meaning no API keys or database exposed to the client.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mallukey.git
   cd mallukey
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Database Setup (Supabase)**
   - Create a new project in Supabase.
   - Go to the SQL Editor and run the following query to create the leaderboard table:
     ```sql
     CREATE TABLE leaderboard (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       name TEXT NOT NULL,
       wpm INTEGER NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
     );
     ```

4. **Environment Variables**
   - Copy `.env.example` to `.env.local`
     ```bash
     cp .env.example .env.local
     ```
   - Update `.env.local` with your Supabase credentials. **Note:** Do NOT use `NEXT_PUBLIC_` prefixes for these keys to keep them secure on the server.
     ```env
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
     ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## ☁️ Deployment (Vercel)

Deploying to Vercel is incredibly easy since this is a Next.js app.

1. Push your code to your GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. **Important:** In the "Environment Variables" section during setup, add your variables exactly as they are in your `.env.local` file:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click **Deploy**.

Vercel will automatically detect the Next.js framework, build the application, and assign you a live URL!

---

## 🔒 Security Note
The application uses Next.js **Server Actions** (`use server`) for all database interactions. The Supabase client is initialized with the `SUPABASE_SERVICE_ROLE_KEY` exclusively on the server side. This ensures that:
- No database credentials are leaked to the client bundle.
- Row-level security (RLS) policies can be simplified or bypassed safely since only our controlled server actions manipulate the data (e.g., pruning the leaderboard to exactly 10 users).

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

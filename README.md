<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/keyboard.svg" width="100" height="100" alt="Keyboard Icon" style="filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);"/>
  <h1 style="color: #22c55e;">MalluKey</h1>
  <p><strong>A beautifully designed Malayalam Speed Typing Application</strong></p>
</div>

## 🌟 About The Project

MalluKey is a modern, fast, and secure web application built to help users practice and improve their Malayalam typing speed. It features a completely custom virtual Malayalam keyboard layout, real-time WPM (Words Per Minute) tracking, and a global Top 10 Leaderboard.

Built with **Next.js (App Router)** and **Supabase**, this project ensures optimal performance and a robust backend. 

### 🔒 Enterprise-Grade Security Architecture
As part of our strict security posturing:
- **Zero Frontend API Keys:** Absolutely no sensitive database keys (like Supabase URLs or Anon/Service keys) are exposed to the browser, the client Javascript bundle, or the frontend console environment.
- **Server Actions Only:** The application routes 100% of database interactions natively through Next.js `use server` Server Actions. 
- **Secret Exclusion:** No `.env` or sensitive configurations are ever committed to the GitHub index or Git history. 

---

## 🚀 Deployment to Vercel

If you want to host this robust web app, follow these deployment steps. **We do not store database configs in this codebase**, so you must provide them securely on Vercel:

1. Import this repository into [Vercel](https://vercel.com/).
2. During the setup process, navigate to **Environment Variables**.
3. Add the following keys manually:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**. Vercel will safely compile the backend services with your injected secrets without ever exposing them to your visitors.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

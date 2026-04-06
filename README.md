<div align="center">
  <img src="app/opengraph-image.png" width="400" alt="MalluKey Banner" style="border-radius: 15px; box-shadow: 0px 4px 30px rgba(179, 240, 35, 0.4); margin-bottom: 20px;"/>
  <h1 style="color: #B3F023; font-size: 3em; margin: 0;">MalluKey</h1>
  <p style="font-size: 1.2em; color: #a3a3a3;"><strong> Malayalam Speed Typing Application ⚡</strong></p>
  
  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Live-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/100%25_Secure-B3F023?style=for-the-badge&logo=security&logoColor=000000" alt="Secure" />
  </div>
</div>

<br />

## 🌟 About The Project

**MalluKey** is a modern, ultra-fast web application built to help users practice and master their Malayalam typing speed. It provides a truly interactive 1:1 Malayalam keyboard layout map and pits typists against each other on a live global leaderboard.

### ✨ What makes it special?
- ⌨️ **Accurate Mapping**: Custom virtual Malayalam keyboard layout mirroring exact real-world key presses.
- ⚡ **Live WPM Engine**: Real-time Words Per Minute (WPM) and accuracy calculation engine.
- 🏆 **Global Top 10 Leaderboard**: A highly competitive, auto-updating rank list hosted on Supabase.
- 🎨 **Beautiful UI/UX**: Crafted entirely around a neon lime green (`#B3F023`) and deep dark mode aesthetic with haptic typing feedback.
- 🔒 **Enterprise-Grade Security**: A robust and modern Next.js Server Actions backend. Zero sensitive data (like API tokens) are handled client-side.

---

## 🔒 Security Architecture
As part of our strict security posturing:
- **Zero Frontend API Keys:** Absolutely no sensitive database keys (like Supabase URLs or Anon/Service keys) are exposed to the browser, the client Javascript bundle, or the frontend console environment.
- **Server Actions Only:** The application routes 100% of database interactions natively through Next.js `use server` Server Actions. 
- **Secret Exclusion:** No `.env` or sensitive configurations are ever committed to the GitHub index or Git history. 

---

## 🚀 Deployment to Vercel

If you want to host this robust web app, follow these deployment steps. **We do not store database configs in this codebase**, so you must provide them securely via your Vercel Dashboard:

1. Import this repository into [Vercel](https://vercel.com/).
2. During the setup process, navigate to **Environment Variables**.
3. Add your production keys:
   - `SUPABASE_URL` = `your-api-url.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `your-secret-key`
4. Click **Deploy**. Vercel will safely compile the backend services with your injected secrets without ever exposing them to your visitors.

## 📄 License
Distributed under the MIT License. Built with ❤️ for the Malayalam coding community.

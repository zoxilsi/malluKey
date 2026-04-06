<div align="center">
  <img src="app/opengraph-image.png" width="600" alt="MalluKey Banner" style="border-radius: 12px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"/>
  
  <h1 style="color: #B3F023; font-size: 3.5em; font-weight: 800; margin: 0; letter-spacing: -1px;">MalluKey</h1>
  <p style="font-size: 1.1em; color: #888888; font-weight: 400; letter-spacing: 2px;">
    A MODERN MALAYALAM SPEED TYPING EXPERIENCE
  </p>
  
  <div style="margin-top: 15px; margin-bottom: 15px;">
    <a href="https://github.com/zoxilsi/malluKey/stargazers">
      <img src="https://img.shields.io/github/stars/zoxilsi/malluKey?style=for-the-badge&color=B3F023&logo=github&logoColor=black" alt="Stars" />
    </a>
    <a href="https://github.com/zoxilsi/malluKey/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-black?style=for-the-badge" alt="License" />
    </a>
  </div>

  <p style="color: #a3a3a3; font-size: 0.95em;">
    <em>If you find this project interesting or useful, please consider giving it a star!</em>
  </p>
</div>

<br />

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/info.svg" width="22" height="22" align="center" /> About The Project

MalluKey is a minimalist, ultra-responsive web application designed to help users practice and master their Malayalam typing speed. Built with a strict focus on luxury design and high performance, it provides an accurate interactive keyboard layout and a competitive global leaderboard.

### <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layers.svg" width="20" height="20" align="center" /> Core Features

- **Interactive Keyboard Map**: A 1:1 custom virtual Malayalam keyboard layout mirroring real-world key presses.
- **Real-Time Analytics**: An instant Words Per Minute (WPM) and accuracy calculation engine.
- **Global Leaderboard**: A highly competitive, auto-updating Top 10 rank list hosted securely.
- **Luxury UI/UX**: Crafted around a premium dark mode aesthetic with signature neon lime green accents (`#B3F023`) and tactile haptic feedback.

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg" width="22" height="22" align="center" /> Security Architecture

Security is treated as a first-class citizen in MalluKey's architecture.

- **Zero Frontend API Keys:** No sensitive database configurations (like Supabase URLs or Anon/Service keys) are exposed to the browser or client bundle.
- **Server Actions Standard:** 100% of database interactions are routed natively through Next.js `use server` Server Actions.
- **Secret Exclusion:** Configuration variables are injected strictly at the deployment layer and are never committed to the version control history.

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/server.svg" width="22" height="22" align="center" /> Deployment

Self-hosting MalluKey via Vercel is streamlined. Database configurations are managed securely via the Vercel Dashboard.

1. Import this repository into [Vercel](https://vercel.com/).
2. Navigate to **Environment Variables** during setup.
3. Inject your production keys:
   - `SUPABASE_URL` 
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**. Vercel compiles the backend services explicitly keeping your injected secrets out of the client build.

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/users.svg" width="22" height="22" align="center" /> Contributing

MalluKey is an open-source initiative. We highly welcome and encourage contributions from the community! Whether you want to add new features, fix bugs, optimize performance, or improve documentation, your help is deeply appreciated.

1. **Fork** the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/heart.svg" width="22" height="22" align="center" /> Support & Sponsor

Creating and maintaining open-source software takes significant time and effort. If you love this project, please consider supporting its development:

<a href="https://www.buymeacoffee.com/hizoxilsij" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 200px !important;" ></a>

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/link.svg" width="22" height="22" align="center" /> Connect With Me

Built and designed by **zoxilsi**. Let's connect:

<a href="https://twitter.com/zoxilsi"><img src="https://img.shields.io/badge/Twitter-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" /></a>
<a href="https://linkedin.com/in/zoxilsi"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://instagram.com/zoxilsi"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/scale.svg" width="22" height="22" align="center" /> License

Distributed under the **MIT License**. Check out the `LICENSE` file in this repository for more information.

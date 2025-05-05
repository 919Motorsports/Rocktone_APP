# Rocktone_APP
# 🎸 RockTone Trivia App

Welcome to the **RockTone Trivia App** — a gritty, visually immersive music trivia game designed for true fans of Rock, Metal, Punk, Grunge, and Nu-Metal. Built with React, Vite, and Tailwind CSS, this game delivers electrifying visuals, rare rock facts, and killer soundstage vibes right in your browser.

---

## 🔥 Features

- 🎤 **Custom Questions** featuring legends like The Rev, Shifty Shellshock, Pat Smear & more
- 📸 **Image + Video Hints** for each question (locally hosted or CDN-based)
- 🎧 **Looped Background Video** with opacity layers for immersive aesthetics
- 📱 Fully responsive, mobile-ready layout
- ⚡ Built with **React + Vite + Tailwind CSS**

---

## 🚀 Live Demo
> _Coming soon! Hosted on [Your Hosting Platform]_

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📂 Project Structure

```bash
shopping/
├── public/                  # Static assets (images, videos)
│   ├── rocktone-background.mp4
│   └── [your trivia images]
├── src/
│   ├── components/          # UI Components
│   ├── pages/               # App Pages (Login, Trivia, Score)
│   ├── hooks/               # Custom game/data logic
│   ├── data/questions.js    # Trivia question set
│   └── App.jsx              # Main App
├── vite.config.js
├── tailwind.config.js
├── index.html
└── package.json

⚙️ How to Run Locally
# 1. Clone this repo
git clone https://github.com/YOUR_USERNAME/rocktone-trivia-app.git
cd rocktone-trivia-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

Then visit http://localhost:5173/ in your browser.

🔧 Build for Production
npm run build
The final production build will be in the /dist folder — ready to deploy to Netlify, Vercel, Surge, etc.

✏️ Customizing the Questions

Edit src/data/questions.js to add, remove, or update trivia entries:
{
  question: "Which frontman co-led Crazy Town and later dropped 'Starry Eyed Surprise' with Paul Oakenfold?",
  image: "shifty-shellshock.jpg",
  options: ["Jacoby Shaddix", "Shifty Shellshock", "Fred Durst", "Brandon Boyd"],
  answer: "Shifty Shellshock"
}

🤘 Credit

Created by [Your Name]
Powered by The RockTone – Delivering loud facts, wild history, and rock legends, one riff at a time.

📫 Contact

Instagram: @TheRockTone
TikTok: @TheRockTone
YouTube: The RockTone Channel
📜 License

MIT License. Use it, modify it, and make it yours.

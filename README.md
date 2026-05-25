<<<<<<< HEAD
<<<<<<< HEAD
# LangFlow — Language Translation App

A modern React translation web application built with Vite, Tailwind CSS, Axios, and LibreTranslate.

## Features

- Responsive React + Vite application
- Tailwind CSS styling with dark/light mode
- Text input area with character counter
- Source and target language selectors
- Swap languages button
- Translate button with loading spinner
- Translated output preview
- Copy translated text button
- Error handling and validation
- Professional navbar and footer
- Environment variables support for API configuration

## Project structure

- `src/App.tsx` — main app layout and translation logic
- `src/components/navbar.tsx` — header with theme toggle and navigation
- `src/components/Footer.tsx` — footer content
- `src/components/ThemeToggle.tsx` — dark/light mode toggle button
- `src/components/LanguageSelect.tsx` — reusable language dropdown
- `src/components/TranslationResult.tsx` — translation output and copy action
- `src/index.css` — global Tailwind styles
- `tailwind.config.js` — Tailwind configuration
- `postcss.config.js` — PostCSS setup

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example:

```bash
copy .env.example .env
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in your terminal.

## Environment variables

The app supports optional environment configuration in a `.env` file.

```env
VITE_TRANSLATE_API_URL=https://libretranslate.com
# VITE_TRANSLATE_API_KEY=
```

If you use a custom LibreTranslate instance, update `VITE_TRANSLATE_API_URL`.

## Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Vercel

1. Log in to Vercel and import the repository.
2. Select the correct project root folder.
3. Set any environment variables in Vercel settings if needed.
4. Deploy.

### Notes

- Use `npm run build` to verify production readiness.
- If you add a private LibreTranslate API key, set it using Vercel environment variables and avoid committing `.env`.

## GitHub ready

This repository includes:

- `.gitignore` with `node_modules`, `dist`, and environment files
- `README.md` with setup instructions
- `package.json` with scripts for dev, build, lint, and preview

Enjoy building your modern translation app with React and Tailwind!
=======
# Real-Time-Multilingual-Translation-System
A web-based multilingual translation system that uses a translation API to convert text between different languages in real time through a simple and interactive user interface.
>>>>>>> dbf59fd2e50d4271501de74cb2ca4c243289b0ef
=======
# ðŸŒ Real-Time Multilingual Translation System

A modern web-based translation application that enables real-time text translation between multiple languages using a translation API. Built with React, Vite, and Tailwind CSS for a fast, responsive, and user-friendly experience.

---

## ðŸš€ Features

- ðŸŒ Real-time language translation
- ðŸ”„ Swap source and target languages
- ðŸ“‹ Copy translated text with one click
- ðŸ”¢ Character counter for input text
- âš¡ Loading indicator during translation
- ðŸŽ¨ Responsive and modern UI
- ðŸŒ™ Dark / Light mode support
- ðŸ§  Error handling for API failures

---

## ðŸ› ï¸ Tech Stack

- React.js (with Vite)
- TypeScript
- Tailwind CSS
- Axios
- LibreTranslate API

---

## ðŸ“¸ UI Preview

(Add screenshots here later for better GitHub profile)

---

## ðŸ“¦ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/Real-Time-Multilingual-Translation-System.git

# Navigate to project
cd Real-Time-Multilingual-Translation-System

# Install dependencies
npm install

# Start development server
npm run dev
>>>>>>> 90a4d1aa7f92989276b28970d67090cf10d8b54a

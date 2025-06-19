# Claude Bot 🤖 — AI Chatbot Interface (Frontend Developer Challenge)

## 📌 Overview

ClaudeBot is a simple yet elegant AI chatbot interface inspired by ChatGPT. It demonstrates modular frontend architecture, clean UI/UX, secure backend middleware, and smooth integration with Anthropic’s Claude API.

This was built as part of a **Frontend Developer Programming Challenge**, showcasing skills in **Vue 3**, **TypeScript**, **Tailwind CSS**, and **Node.js**.

## ✨ Features

### ✅ Frontend (Vue + Vite + TypeScript)
- 💬 Persistent chat bar fixed to bottom
- 🔄 Scrolls to the latest message automatically
- 💡 Assistive prompt buttons with icons
- 👤 Displays user messages and Claude AI responses
- ⏳ Shows loading indicator while waiting for response
- 🌓 Toggle between **Light** and **Dark** mode
- 🤖 Fixed animated robot mascot at bottom-right

### ✅ Backend (Node.js Middleware)
- 🔐 Secure Claude API proxy using `.env` to store API keys
- 🛡️ Error handling with informative messages
- 🌍 CORS enabled and request validation
- ⚠️ Prevents exposing Claude API key to frontend

## 🛠 Tech Stack

- **Frontend**: Vue 3, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Axios, Dotenv, CORS
- **AI API**: Anthropic Claude

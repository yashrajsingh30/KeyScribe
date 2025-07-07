# 🎯 KeyScribe

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/yourusername/keyscribe)  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/keyscribe/actions)  
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)  
[![OpenAI API](https://img.shields.io/badge/OpenAI-Enabled-purple)](https://platform.openai.com)

---

> **KeyScribe** is a premium note-taking workspace with integrated AI “superpowers”.  
> Capture, organize, and enrich your ideas—and let GPT-4.1 Nano summarize, extract tags, highlight context, and even build a mind-map of your notes.

---

## 📋 Table of Contents

- [✨ Features](#-features)  
- [🖼️ Demo](#️-demo)  
- [🚀 Getting Started](#-getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
- [🗂️ Project Structure](#️-project-structure)  
- [🛠️ Tech Stack](#️-tech-stack)  
- [📈 Cost Optimization](#-cost-optimization)  
- [🤝 Contributing](#-contributing)  
- [📝 License](#-license)

---

## ✨ Features

- 🗒️ **Notebooks & Notes**  
  - Create, rename, and organize notes in notebooks  
  - Autosave to `localStorage` for instant persistence  
- 🤖 **AI Sidebar**  
  - **Summarization** (3/5/8-bullet mode)  
  - **Keyword & Tag Extraction**  
  - **Contextual Highlighting** — click a bullet to jump to the source  
  - **Mind-Map Generation** — interactive graph of your note’s structure  
- 🎨 **Premium UI**  
  - 🔆 Light & 🌙 Dark mode with smooth transitions  
  - 🖋️ Refined typography (Inter font) & custom color palette  
  - 💎 Glassmorphism cards & motion-enhanced buttons  
  - ⚡ Loading skeletons & toast notifications  
- 🔒 **Server-Side AI Cache**  
  - File-backed cache for instant repeat results  
  - SHA-256 keying to avoid duplicate API calls  
- 💾 **Easy Export**  
  - Copy summary + tags to clipboard  
  - Download as `.txt` or Markdown  

---

## 🖼️ Demo

<p align="center">
  <img src="docs/screenshots/dashboard-light.png" alt="KeyScribe Light Mode" width="600" />
  <img src="docs/screenshots/dashboard-dark.png"  alt="KeyScribe Dark Mode"  width="600" />
</p>

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+  
- [npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- OpenAI API key (GPT-4.1 Nano or GPT-3.5 Turbo)

---

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/keyscribe.git
cd keyscribe

# Install dependencies
npm install

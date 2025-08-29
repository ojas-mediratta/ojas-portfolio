# Ojas Mediratta — Portfolio Website

This is my personal portfolio website, built with **React**, **TypeScript**, and **Vite**.  
It serves as a central place to highlight my projects, research, and experiences in robotics, embedded systems, and applied machine learning.

## 🎨 Design & Inspirations

The site design was inspired by a mix of modern portfolio trends and my own aesthetic preferences:

- **Color theme**: Based on the [Ayu Mirage](https://github.com/ayu-theme) palette for a clean, dark-but-soft feel.
- **Mouse glow effect**: Inspired by [Brittany Chiang’s portfolio](https://brittanychiang.com/) and adapted for React.
- **Typing effect**: Borrowed from countless developer portfolios online, fine-tuned to fit my site’s introduction.
- **Layout & feel**: Iteratively shaped after exploring an innumerable number of online portfolios for ideas on section flow, animations, and responsiveness.

The goal was to create something visually engaging but lightweight, putting the focus on content.

## ⚡ Tech Stack

- **React + TypeScript + Vite** for a fast, modern frontend setup.
- **TailwindCSS** for styling and responsive design.
- **GitHub Pages** for deployment and hosting.

## 🚀 Development Setup

This project started from the Vite + React + TypeScript template. It supports hot module replacement (HMR) and linting out of the box.

To run locally:

```bash
npm install
npm run dev
```

## 🛠 ESLint Configuration

The repo uses @vitejs/plugin-react and includes ESLint rules for TypeScript/React projects.
For production-grade apps, consider expanding the configuration with type-aware lint rules:

```bash
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // or stricter rules:
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
You can also use:
	•	eslint-plugin-react-x
	•	eslint-plugin-react-dom

for React-specific lint rules.

## 🌐 Deployment

The site is deployed through GitHub Pages using a custom domain:
👉 ojasmediratta.com

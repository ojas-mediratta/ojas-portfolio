# Ojas Mediratta — Portfolio Website

This is my personal portfolio website, built with React, TypeScript, and Vite. It showcases my projects, research, and experience in robotics, embedded systems, and applied machine learning.

The site is intentionally simple and lightweight. The focus is on clarity, responsiveness, and clean presentation rather than heavy frameworks or complex infrastructure.

---

## How This Site Is Built

If you want to build something similar, here’s the basic idea behind the stack.

### Core Technologies

- **Vite** – A fast development tool that runs your project locally and builds it for production.
- **React** – A library for building user interfaces using reusable components.
- **TypeScript** – Adds type safety to JavaScript, helping prevent bugs as projects grow.
- **TailwindCSS** – A utility-based CSS framework for fast, responsive styling.

Vite handles development and bundling.  
React structures the UI.  
TypeScript improves reliability.  
Tailwind handles styling and layout.

---

## How to Build Your Own Portfolio with Vite

### 1. Install Node.js

Download Node.js from https://nodejs.org.

Verify installation:

```bash
node -v
npm -v
```

---

### 2. Create a New Vite + React + TypeScript Project

```bash
npm create vite@latest my-portfolio
```

Select:
- Framework: React  
- Variant: TypeScript  

Then run:

```bash
cd my-portfolio
npm install
npm run dev
```

Your site will now run locally (usually at http://localhost:5173).

---

### 3. Add TailwindCSS

Install Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure the `content` paths in `tailwind.config.js`, and add Tailwind’s base directives to your main CSS file. You can then style directly inside your React components using utility classes.

---

### 4. Organize Your Project

A simple portfolio usually includes:

- Hero section (name + short intro)
- Projects section
- Experience section
- Contact section

Each section can be its own React component:

```
src/
  components/
    Hero.tsx
    Projects.tsx
    Experience.tsx
  App.tsx
```

`App.tsx` acts as the layout that assembles everything.

---

## Using AI Effectively (Vibecoding)

AI can speed up development significantly if you prompt it clearly and iterate.

Instead of:
> Make me a portfolio site

Try:
> Create a responsive hero section in React using Tailwind. Dark theme. Large name header, short paragraph underneath, and social links below.

Then refine:
- Make it more minimal  
- Improve mobile layout  
- Add subtle hover animations  
- Refactor for cleaner structure  

Treat AI as a fast collaborator. Guide the direction, iterate quickly, and improve the design step by step.

---

## Deployment

You can deploy a site like this for free using:

- GitHub Pages  
- Vercel  
- Netlify  

For GitHub Pages:

1. Push your project to GitHub.
2. If deploying to a subpath, configure the `base` field in `vite.config.ts`.
3. Build the project:

```bash
npm run build
```

4. Deploy the generated `dist` folder.

You can connect a custom domain later through your domain provider.

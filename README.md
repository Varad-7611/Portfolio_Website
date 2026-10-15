# 🌐 Varad Gotkhindikar - Portfolio Website

Welcome to my personal **Portfolio Website**, showcasing my projects, skills, and achievements.  
This site is built and deployed automatically by **Netlify** whenever changes are pushed to the repository.

---

## 🚀 Live Website

✅ **HTTPS (Netlify)**  
👉 https://varad-gotkhindikar-portfolio.netlify.app/

---

## 🧩 Project Overview

This is a responsive and modern portfolio website built using **HTML**, **CSS**, and **JavaScript**.  
It represents my work, technical background, and contact details in a clean and interactive way.

### ✨ Features
- Fully responsive design  
- Smooth scrolling and animations  
- Showcases projects and contact information  
- Automatically deployed on every code update  
- Served over HTTPS from Netlify's global CDN  

---

## ⚙️ Tech Stack

| Component | Technology |
|---------|------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Hosting & CDN** | Netlify |
| **CI/CD** | Netlify Git-based continuous deployment |
| **HTTPS** | Automatic TLS certificate from Netlify |

---

## 🔄 CI/CD Workflow

Netlify is connected to this GitHub repository and handles the full pipeline. Configuration lives in [`netlify.toml`](netlify.toml).

### Continuous Deployment (production)
1. Code is pushed (or a pull request is merged) to the **main** branch.  
2. Netlify detects the commit and starts a deploy automatically.  
3. The static files are published atomically to Netlify's CDN — visitors never see a half-updated site.  
4. The live site at https://varad-gotkhindikar-portfolio.netlify.app/ is updated over HTTPS.

### Continuous Integration (pull requests)
1. Open a pull request against **main**.  
2. Netlify builds a **Deploy Preview** with its own unique URL and posts the status check and link on the pull request.  
3. Review the change live before merging; merging promotes it to production.

### Rollbacks
Every deploy is kept in the Netlify dashboard. Any previous deploy can be republished instantly with **"Publish deploy"**.

---

## ✅ Testing the Deployment

1. Make a small change (for example, edit `index.html`).  
2. Push the changes to a new branch and open a pull request.  
3. Open the **Deploy Preview** link Netlify adds to the pull request and check the change.  
4. Merge the pull request into **main**.  
5. Wait for the production deploy to finish in the Netlify dashboard, then refresh:

👉 https://varad-gotkhindikar-portfolio.netlify.app/

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

💡 **Tip:** Use Deploy Previews to review every change on a real URL before it reaches production.

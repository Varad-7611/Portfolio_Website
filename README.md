# 🌐 Varad Gotkhindikar - Portfolio Website

Welcome to my personal **Portfolio Website**, showcasing my projects, skills, and achievements.  
This site is automatically deployed and updated on **AWS S3** using **GitHub Actions** whenever new changes are pushed to the repository.

---

## 🚀 Live Website

❌ **HTTP (Not Secure – S3 Website Endpoint)**  
👉 http://git-hub-devops-1234.s3-website.eu-north-1.amazonaws.com/

✅ **HTTPS (Secure – CloudFront)**  
👉 https://d2y6nbm2sahhg9.cloudfront.net/

---

## 🧩 Project Overview

This is a responsive and modern portfolio website built using **HTML**, **CSS**, and **JavaScript**.  
It represents my work, technical background, and contact details in a clean and interactive way.

### ✨ Features
- Fully responsive design  
- Smooth scrolling and animations  
- Showcases projects and contact information  
- Automatically deployed on every code update  
- Hosted on AWS using static website hosting  

---

## ⚙️ Tech Stack

| Component | Technology |
|---------|------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Hosting** | AWS S3 |
| **Secure Delivery** | AWS CloudFront |
| **Automation** | GitHub Actions |
| **Region** | eu-north-1 (Stockholm) |

---

## 🔄 Deployment Workflow (HTTP)

1. Website code is pushed to the **main branch** on GitHub.  
2. GitHub Actions automatically runs the deployment workflow.  
3. Updated files are uploaded to the **AWS S3 bucket**.  
4. S3 serves the website using the **HTTP website endpoint**.  

⚠️ This endpoint is **not secure** because it does not support HTTPS.

---


## 🔐 Secure HTTPS Workflow (CloudFront)

To secure the website, **AWS CloudFront** is configured in front of the S3 bucket.

### How HTTPS Works

1. The user accesses the website via the **CloudFront HTTPS URL**.  
2. CloudFront handles **SSL/TLS encryption**.  
3. CloudFront fetches content from the **S3 bucket (origin)**.  
4. Content is cached at edge locations for better performance.  
5. The website is delivered securely over **HTTPS**.

---

## 📊 Architecture Diagram

<img width="1793" height="712" alt="Screenshot 2026-01-02 203300" src="https://github.com/user-attachments/assets/64e0f823-d527-45f1-9cac-d20a45267e4b" />

---

## ✅ Testing the Deployment

1. Make a small change (for example, edit `index.html`).  
2. Push the changes to the **main branch**.  
3. Go to the **Actions** tab in the GitHub repository.  
4. Wait for the workflow to complete successfully.  
5. Open the secure website link and refresh the page:

👉 https://d2y6nbm2sahhg9.cloudfront.net/

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

💡 **Tip:**  

For production use, always serve static websites through **CloudFront with HTTPS** instead of exposing the S3 website endpoint directly.


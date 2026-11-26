# OCULUS – Mini CRM Dashboard

### See Beyond. Connect Better. ✨

**OCULUS** is a modern, responsive Mini CRM Dashboard designed to help users manage business leads through a visually engaging and easy-to-use interface.

## 🌐 Project Links

- **Live Demo:** https://vocal-horse-1e3f4c.netlify.app
- **GitHub Repository:** https://github.com/JiyaSoni24/oculus-mini-crm

## ✨ Features

- Dashboard overview displaying total, new and converted leads.
- Add new leads with contact and business details.
- Edit existing lead information.
- Delete leads.
- Search leads by name or email.
- Filter leads by status: New, Contacted and Converted.
- Automatically updated dashboard statistics.
- Responsive user interface.
- Browser-based data persistence.
- Animated cosmic theme with glowing elements and glassmorphism styling.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling, responsive layout and animations |
| JavaScript | Application logic and CRUD operations |
| LocalStorage | Saving lead records in the browser |
| Netlify | Website deployment |
| GitHub | Source code hosting |

## 📁 Project Structure

```text
oculus-mini-crm/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run Locally

1. Clone or download this repository.
2. Extract the project folder if downloaded as a ZIP.
3. Open the folder in Visual Studio Code.
4. Open `index.html` in your browser.
5. Start adding and managing leads.

No additional software installation is required to run the frontend.

## 💾 Database and Data Storage Setup

The current version uses the browser's built-in **LocalStorage** for data persistence.

- Lead records are stored in the browser.
- Data remains available after refreshing the page in the same browser.
- No external database configuration or database credentials are required.
- Data is browser-specific and is not shared between different devices or browsers.

**Current implementation note:** This version does not include a server-side database or backend API. LocalStorage is used as a lightweight storage solution for the current prototype.

## 💡 Challenges Faced

- Implementing CRUD functionality using JavaScript.
- Keeping dashboard statistics synchronized with lead records.
- Integrating search and status-based filtering.
- Creating a visually appealing interface while maintaining usability.
- Implementing persistent storage without a separate database.

## 🎯 Project Objective

The objective of OCULUS is to demonstrate the fundamentals of frontend development, interactive dashboard design, lead management and browser-based data handling.

---

**Developed as part of the Social House Learning Tech Internship Task.**

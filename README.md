# Sleek Glassmorphism Portfolio 🚀

A modern, responsive, and high-performance personal portfolio website designed for developers. Built with clean semantic HTML, modular vanilla CSS, and dynamic JavaScript, this portfolio features a premium dark-mode aesthetic with vibrant glassmorphic elements, smooth micro-animations, and dynamic GitHub integration.

## 🌟 Key Features

*   **Premium Aesthetics:** A state-of-the-art dark-mode interface styled using custom CSS gradients, backdrop filters (`glassmorphism`), and modern typography.
*   **Dynamic GitHub Integration:** Connects directly to the GitHub REST API to fetch live profile metrics (repositories, followers, total stars) and dynamically render cards for public repositories.
*   **Fully Responsive & Interactive:** Optimized for desktop and mobile viewports with a responsive navigation bar, mobile toggle drawer, scroll-spy section highlighting, and fade-in animations on scroll.
*   **Validated Contact Form:** Client-side email and field validation with animated success states.
*   **Structured Configuration:** Content is driven by a clean, centralized configuration object (`CONFIG` in `app.js`), making it incredibly easy to customize.

---

## 🛠️ Built With

*   **Structure:** HTML5 (Semantic elements)
*   **Styling:** Vanilla CSS (Glassmorphism, custom scrollbar, CSS variables, keyframe animations)
*   **Logic:** Modern Vanilla JavaScript (Fetch API, Intersection Observer, Scroll Spy)
*   **Icons:** [Lucide Icons](https://lucide.dev/) (CDN-based integration)
*   **Typography:** Google Fonts (Outfit & Inter)

---

## ⚙️ Configuration & Customization

To customize the website with your own information:

1.  Open [app.js](file:///c:/Users/HP/OneDrive/Documents/portfolio/app.js).
2.  Update the `CONFIG` object at the top of the file with your details:

```javascript
const CONFIG = {
    name: "Your Name",
    username: "YourGitHubUsername",
    title: "Your Professional Title",
    location: "City, Country",
    email: "your.email@example.com",
    phone: "+XX XXXXX XXXXX",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    bio: "Your bio description goes here...",
    skills: [ ... ],
    featuredProjects: [ ... ]
};
```

---

## 🚀 Running Locally

To start a local server and test the website:

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal in the project directory and run:
   ```bash
   npx serve
   ```
3. Open your browser and navigate to `http://localhost:3000`.

---

## 📂 Project Structure

```
portfolio/
├── index.html        # Main HTML layout & structure
├── style.css         # Styling system, tokens, animations, responsive design
├── app.js            # Configuration object & dynamic DOM rendering / API fetch
├── README.md         # Documentation
└── profile.png       # Profile avatar picture
```

---

## 🤝 Connect With Me

*   **LinkedIn:** [Swaroop M R](https://linkedin.com/in/swaroop-m-r-852028289)
*   **Email:** [swaroopmr54@gmail.com](mailto:swaroopmr54@gmail.com)
*   **GitHub:** [@SwaroopMR](https://github.com/SwaroopMR)

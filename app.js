// ==========================================================================
// Portfolio Configuration Object (Using Swaroop's Resume Data)
// ==========================================================================
const CONFIG = {
    name: "Swaroop M R",
    username: "SwaroopMR",
    title: "Software & AI Developer",
    location: "Mysuru, Karnataka - 570029",
    email: "swaroopmr54@gmail.com",
    phone: "+91 70192 55572",
    linkedin: "https://linkedin.com/in/swaroop-m-r-852028289",
    github: "https://github.com/SwaroopMR",
    bio: "A motivated BCA student seeking opportunities in software development, AI, and machine learning. Driven by creating efficient, real-world solutions.",
    
    skills: [
        { name: "Python", details: "Machine learning model pipelines, Scikit-learn, Pandas, NumPy, OpenCV computer vision." },
        { name: "Java", details: "Enterprise backend development using JSP, Servlets, MVC architecture, and OOP concepts." },
        { name: "SQL", details: "Relational database management, querying, and schema design with MySQL." },
        { name: "HTML & CSS", details: "Responsive layout structure, Bootstrap framework, and modern Glassmorphism styling." },
        { name: "C", details: "Low-level system logic, foundational programming syntax, and algorithm design." },
        { name: "DSA", details: "Optimized problem-solving using linear/non-linear structures and search-sort algorithms." },
        { name: "OOP", details: "Object-oriented design patterns, encapsulation, polymorphism, inheritance." },
        { name: "VS Code & Git", details: "Professional version control, repository management, and workspace optimization." }
    ],

    featuredProjects: [
        {
            title: "AI-Driven Collision Detection & Emergency Response",
            subtitle: "Automobile Safety System",
            description: "Built a real-time computer vision system to detect collision risks using ML algorithms. Implemented automated alerts and emergency response simulations to facilitate rapid vehicle decision-making.",
            tech: ["Python", "Machine Learning", "Computer Vision", "OpenCV"],
            icon: "shield"
        },
        {
            title: "Raisin Type Classification Pipeline",
            subtitle: "Gaussian Naïve Bayes System",
            description: "Built an end-to-end ML pipeline classifying raisin types (Besni/Kecimen) based on morphological features. Conducted extensive cleanups, EDA, and dimensionality reduction, yielding statistical and visual insights.",
            tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
            icon: "line-chart"
        },
        {
            title: "Lost & Found Management System",
            subtitle: "Full Stack MVC Web Application",
            description: "Developed a secure full-stack platform following MVC architecture. Integrated secure user authentication, admin role dashboards, image uploads, and responsive responsive layouts.",
            tech: ["Java", "JSP", "Servlets", "MySQL", "HTML/CSS", "Bootstrap"],
            icon: "search"
        }
    ]
};

// Global Intersection Observer for scroll animation
let revealObserver;

// ==========================================================================
// Initialize Portfolio Page & Populate Content
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Statically Configured Data
    populateConfigData();
    
    // 2. Fetch and Integrate GitHub Profile & Repos
    fetchGitHubData();
    
    // 3. Setup Layout & Interactive Mechanics
    setupInteractiveFeatures();
});

// ==========================================================================
// Populate Content From Local Config
// ==========================================================================
function populateConfigData() {
    // Brand & Hero
    document.getElementById("nav-brand-name").textContent = "Swaroop";
    document.getElementById("hero-name").textContent = CONFIG.name;
    document.getElementById("hero-title-role").textContent = CONFIG.title;
    document.getElementById("hero-bio").textContent = CONFIG.bio;
    document.getElementById("profile-card-name").textContent = CONFIG.name;
    document.getElementById("profile-card-tag").textContent = `@${CONFIG.username}`;
    document.getElementById("footer-name").textContent = CONFIG.name;
    document.getElementById("footer-year").textContent = new Date().getFullYear();

    // Social Links
    document.getElementById("github-link").href = CONFIG.github;
    document.getElementById("linkedin-link").href = CONFIG.linkedin;
    document.getElementById("contact-email-link").href = `mailto:${CONFIG.email}`;
    document.getElementById("contact-email-link").textContent = CONFIG.email;
    document.getElementById("contact-location").textContent = CONFIG.location;

    // Skills Grid
    const skillsContainer = document.getElementById("skills-grid-container");
    skillsContainer.innerHTML = "";
    CONFIG.skills.forEach(skill => {
        const tag = document.createElement("div");
        tag.className = "skill-tag reveal-element";
        tag.textContent = skill.name;
        tag.setAttribute("data-details", skill.details);
        skillsContainer.appendChild(tag);
    });

    // Featured Projects Grid
    const projectsContainer = document.getElementById("featured-projects-container");
    projectsContainer.innerHTML = "";
    CONFIG.featuredProjects.forEach(proj => {
        const card = document.createElement("div");
        card.className = "card-glass reveal-element";
        
        let tagsHtml = proj.tech.map(t => `<span class="proj-tag">${t}</span>`).join("");
        
        card.innerHTML = `
            <div>
                <span class="featured-badge">Featured Project</span>
                <div class="card-header">
                    <div class="card-icon">
                        <i data-lucide="${proj.icon}"></i>
                    </div>
                </div>
                <h3 class="card-title">${proj.title}</h3>
                <h4 style="font-size:0.85rem; color:var(--accent-cyan); margin-bottom:1rem; font-weight:500;">${proj.subtitle}</h4>
                <p class="card-description" style="margin-bottom:1.5rem;">${proj.description}</p>
            </div>
            <div class="card-bottom">
                <div class="project-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}

// ==========================================================================
// GitHub REST API Integration
// ==========================================================================
async function fetchGitHubData() {
    const loadingElem = document.getElementById("github-loading");
    const errorElem = document.getElementById("github-error");
    const reposContainer = document.getElementById("repos-container");
    
    const userUrl = `https://api.github.com/users/${CONFIG.username}`;
    const reposUrl = `https://api.github.com/users/${CONFIG.username}/repos?sort=updated&per_page=12`;

    try {
        // Fetch user metadata (e.g. avatar, actual counts)
        const userResponse = await fetch(userUrl);
        if (!userResponse.ok) throw new Error("Profile fetch failed");
        const userData = await userResponse.ok ? await userResponse.json() : null;

        if (userData) {
            document.getElementById("github-repos-count").textContent = userData.public_repos;
            document.getElementById("github-followers-count").textContent = userData.followers;
        }

        // Fetch Repositories
        const reposResponse = await fetch(reposUrl);
        if (!reposResponse.ok) throw new Error("Repos fetch failed");
        let repos = await reposResponse.json();

        // Filter out forks & sort by stargazers/updated
        repos = repos.filter(repo => !repo.fork)
                     .sort((a, b) => b.stargazers_count - a.stargazers_count)
                     .slice(0, 6);

        // Compute total stars across the top public repos for the badge
        const totalStars = repos.reduce((acc, curr) => acc + curr.stargazers_count, 0);
        document.getElementById("github-stars-count").textContent = totalStars;

        // Render Repository Cards
        reposContainer.innerHTML = "";
        
        if (repos.length === 0) {
            reposContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No public repositories found.</p>`;
        } else {
            repos.forEach(repo => {
                const card = document.createElement("div");
                card.className = "card-glass reveal-element";
                
                const langColor = getLanguageColor(repo.language);
                
                card.innerHTML = `
                    <div class="card-top">
                        <div class="card-header">
                            <div class="card-icon">
                                <i data-lucide="folder"></i>
                            </div>
                            <div class="card-links">
                                <a href="${repo.html_url}" target="_blank" class="card-link" aria-label="Open Repository">
                                    <i data-lucide="external-link"></i>
                                </a>
                            </div>
                        </div>
                        <h3 class="card-title">${repo.name}</h3>
                        <p class="card-description">${getRepoDescription(repo)}</p>
                    </div>
                    <div class="card-meta">
                        <span class="lang-indicator">
                            <span class="lang-dot" style="background-color: ${langColor}"></span>
                            ${repo.language || "Markdown"}
                        </span>
                        <div class="card-stats">
                            <span class="stat-inline">
                                <i data-lucide="star"></i>
                                ${repo.stargazers_count}
                            </span>
                            <span class="stat-inline">
                                <i data-lucide="git-fork"></i>
                                ${repo.forks_count}
                            </span>
                        </div>
                    </div>
                `;
                reposContainer.appendChild(card);
            });
        }

        // Display repos, hide loader
        loadingElem.classList.add("hidden");
        reposContainer.classList.remove("hidden");
        lucide.createIcons(); // Initialize newly added icons

        // Observe newly added elements if the observer is initialized
        if (revealObserver) {
            reposContainer.querySelectorAll(".reveal-element").forEach(elem => {
                revealObserver.observe(elem);
            });
        }

    } catch (err) {
        console.error("GitHub Fetch Error: ", err);
        // Soft Fallback - Show profile card details & mock indicators
        document.getElementById("github-repos-count").textContent = "3+";
        document.getElementById("github-followers-count").textContent = "5+";
        document.getElementById("github-stars-count").textContent = "0";

        // Show Error container
        loadingElem.classList.add("hidden");
        errorElem.classList.remove("hidden");
    }
}

// Helper: GitHub Language colors mapping
function getLanguageColor(lang) {
    const colors = {
        "JavaScript": "#f1e05a",
        "Python": "#3572A5",
        "Java": "#b07219",
        "HTML": "#e34c26",
        "CSS": "#563d7c",
        "C": "#555555",
        "C++": "#f34b7d",
        "TypeScript": "#3178c6",
        "PHP": "#4f5d95",
        "Shell": "#89e051"
    };
    return colors[lang] || "#8b5cf6"; // Default violet accent
}

// Helper: Custom fallback descriptions for GitHub repositories
function getRepoDescription(repo) {
    if (repo.description && repo.description.trim() !== "") {
        return repo.description;
    }
    
    const fallbacks = {
        "myportfolio": "A professional developer portfolio website featuring a dark-mode glassmorphic aesthetic, custom CSS styling, and real-time GitHub API integration.",
        "team-c-adventurers": "A collaborative web application developed by Team C, focusing on responsive layout design, interactive user experiences, and modern web standards.",
        "recipe-management-system": "A web application designed to search, browse, and organize cooking recipes. Built with interactive recipe cards and categorization tools.",
        "stoneage-number-quest": "An engaging, prehistoric-themed educational game designed to teach math and number skills through interactive puzzles.",
        "virtual-drum-kit": "An interactive audio application that simulates a real drum set. Playable using keyboard triggers or click events, built with TypeScript.",
        "lost-and-found-management-system": "A secure full-stack Java MVC platform utilizing JSP, Servlets, and MySQL for registering, tracking, and claiming lost items.",
        "ai-driven-collision-detection-and-autonomous-emergency-response-system-for-automobiles": "A real-time machine learning and computer vision automobile safety system developed in Python and OpenCV for risk detection and simulated automated alerts.",
        "raisin-type-classification": "An end-to-end Python machine learning pipeline implementing a Gaussian Naïve Bayes model to classify raisin types based on morphological features."
    };

    const key = repo.name.toLowerCase();
    return fallbacks[key] || "A public software development repository. Click the external link to view the code and documentation.";
}

// ==========================================================================
// Setup Interactive Mechanics & Animation Observers
// ==========================================================================
function setupInteractiveFeatures() {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Mobile Nav Burger Toggle
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const navLinksContainer = document.querySelector(".nav-links");
    
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("mobile-open");
            const icon = navToggle.querySelector("[data-lucide]");
            if (icon) {
                if (navLinksContainer.classList.contains("mobile-open")) {
                    icon.setAttribute("data-lucide", "x");
                } else {
                    icon.setAttribute("data-lucide", "menu");
                }
            }
            lucide.createIcons();
        });
    }

    // Close mobile nav when link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("mobile-open");
            const toggleIcon = navToggle.querySelector("[data-lucide]");
            if (toggleIcon) {
                toggleIcon.setAttribute("data-lucide", "menu");
                lucide.createIcons();
            }
        });
    });

    // 3. Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 4. Scroll-Spy and Active Navigation Tracking
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // 5. Contact Form Client-side Validation & Mock Handling
    const form = document.getElementById("portfolio-contact-form");
    const successMsg = document.getElementById("form-success-container");
    const resetBtn = document.getElementById("btn-reset-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate Name
            const nameInput = document.getElementById("form-name");
            const nameError = document.getElementById("name-error");
            if (nameInput.value.trim() === "") {
                nameInput.classList.add("invalid");
                nameError.classList.add("visible");
                isValid = false;
            } else {
                nameInput.classList.remove("invalid");
                nameError.classList.remove("visible");
            }

            // Validate Email
            const emailInput = document.getElementById("form-email");
            const emailError = document.getElementById("email-error");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add("invalid");
                emailError.classList.add("visible");
                isValid = false;
            } else {
                emailInput.classList.remove("invalid");
                emailError.classList.remove("visible");
            }

            // Validate Message
            const messageInput = document.getElementById("form-message");
            const messageError = document.getElementById("message-error");
            if (messageInput.value.trim() === "") {
                messageInput.classList.add("invalid");
                messageError.classList.add("visible");
                isValid = false;
            } else {
                messageInput.classList.remove("invalid");
                messageError.classList.remove("visible");
            }

            if (isValid) {
                // Mock form submission success state
                form.classList.add("hidden");
                successMsg.classList.remove("hidden");
                
                // Clear input values
                form.reset();
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            successMsg.classList.add("hidden");
            form.classList.remove("hidden");
        });
    }

    // 6. Intersection Observer - Fade-in On Scroll Elements
    revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Optional: stop observing once elements are revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe all elements with .reveal-element
    // We add observer slightly delayed so DOM rendering completes first
    setTimeout(() => {
        document.querySelectorAll(".reveal-element").forEach(elem => {
            revealObserver.observe(elem);
        });
        
        // Also observe section titles and headers for reveal (excluding grid containers and status cards)
        document.querySelectorAll("section > *:not(.repos-grid):not(.projects-grid):not(.showcase-status)").forEach(child => {
            child.classList.add("reveal-element");
            revealObserver.observe(child);
        });
    }, 150);
}

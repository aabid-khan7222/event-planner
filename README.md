# Event Planner

A premium static website for an event planning and decoration company. Built with **HTML**, **CSS**, and **Vanilla JavaScript**—no frameworks or libraries.

---

## About

**Event Planner** offers wedding, engagement, baby shower, birthday party decoration, and complete event planning & execution services. This website is designed **mobile-first** for clients who browse mostly on phones.

---

## Features

- **Sections:** Home (Hero), Services, Gallery, About, Why Choose Us, Testimonials, Contact, Footer
- **Sticky navbar** with mobile hamburger menu and smooth scroll
- **Hero slideshow** with overlay and CTA buttons
- **Service cards** with hover effects
- **Gallery** — slider + grid with image zoom on hover
- **Contact form** with basic validation (name, phone, email, message)
- **Local images** — all photos stored in the project folder

---

## How to Run

1. Open the project folder in File Explorer.
2. Double-click **`index.html`** to open it in your default browser.

   **Or** from the project folder in terminal:
   ```bash
   start index.html
   ```

3. No server or build step is required. The site works offline once opened.

---

## Project Structure

```
event planner/
├── index.html      # Main HTML (structure & content)
├── style.css       # All styles (mobile-first)
├── project.js      # Nav, slideshow, gallery, form validation
├── images/         # Local photos (if you use the images folder)
│   ├── wedding.jpg
│   ├── event-setup.jpg
│   ├── birthday.jpg
│   ├── engagement.jpg
│   ├── baby-shower.jpg
│   └── about-team.jpg
└── README.md       # This file
```

*(If your images are in the project root instead of `images/`, update the paths in `index.html` to match.)*

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, flexbox, grid, media queries
- **Vanilla JavaScript** — no jQuery, React, or Bootstrap
- **Google Fonts** — Playfair Display, Poppins, Montserrat

---

## Design

- **Colours:** White, cream, soft pastels, gold accents
- **Layout:** Mobile-first; breakpoints at 768px and 1024px
- **Typography:** Clear hierarchy with rounded corners and soft shadows

---

## License

Free to use for the Event Planner business. Image sources (e.g. Unsplash) may have their own terms if you replace or add photos.

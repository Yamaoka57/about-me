document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".theme-toggle");
    const body = document.body;

    const applyTheme = (theme) => {
        body.dataset.theme = theme;
        localStorage.setItem("theme", theme);

        if (toggleButton) {
            toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
            toggleButton.setAttribute(
                "aria-label",
                theme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"
            );
        }
    };

    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(initialTheme);

    toggleButton?.addEventListener("click", () => {
        const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
    });

    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const skillItems = document.querySelectorAll(".skill-item");
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    const fill = entry.target.querySelector(".skill-fill");
                    if (fill) {
                        fill.style.width = `${fill.dataset.width}%`;
                    }
                    skillObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    skillItems.forEach((item) => skillObserver.observe(item));
});

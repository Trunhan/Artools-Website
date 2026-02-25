// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Entry & Scroll Reveal Animations
const initAnimations = () => {
    // Hero Video Cinematic Entrance
    gsap.fromTo(".reveal-video",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2.5, ease: "power3.inOut" }
    );

    // Animates elements with .reveal-text when they enter the viewport
    gsap.utils.toArray('.reveal-text').forEach((elem) => {
        ScrollTrigger.create({
            trigger: elem,
            start: "top 85%", // Triggers when the top of the element hits 85% of viewport height
            onEnter: () => gsap.fromTo(elem,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
            ),
            once: true // Animate only once
        });
    });

    // Animates elements with .reveal-fade using Stagger/Batch for groups
    ScrollTrigger.batch(".reveal-fade", {
        onEnter: batch => gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power2.out" }
        ),
        start: "top 85%",
        once: true
    });
};

// Smooth Video Scrubbing Function
const initVideoScrub = () => {
    const video = document.getElementById('hero-video');

    // Ensure video is valid
    if (!video || !video.duration) return;

    let targetTime = 0;
    let currentTime = 0;

    ScrollTrigger.create({
        trigger: "#hero-section",
        start: "top top",
        end: "+=3500", // Scroll length to finish video
        pin: true,
        onUpdate: (self) => {
            // Updated to be safer and rely on the video's current known duration
            if (!Number.isNaN(video.duration)) {
                targetTime = self.progress * video.duration;
            }
        }
    });

    // Continuous render loop for ultra-smooth interpolation using GSAP Ticker
    const renderLoop = () => {
        // Lerp (Linear Interpolation) with factor 0.08 to smoothly glide to target
        currentTime += (targetTime - currentTime) * 0.08;

        // Avoid unnecessary updates if change is miniscule and ensure video is not playing
        if (video.readyState >= 3 && video.paused && Math.abs(currentTime - video.currentTime) > 0.01) {
            video.currentTime = currentTime;
        }
    };

    // Use gsap.ticker instead of requestAnimationFrame for better synchronization with ScrollTrigger
    gsap.ticker.add(renderLoop);
};

const setup = async () => {
    initAnimations();

    const video = document.getElementById('hero-video');

    // 🚀 MAX FLUIDITY OPTIMIZATION 🚀
    // Load video entirely into RAM (via Blob) before user scrolls.
    // Prevents network or disk I/O stuttering during frame scrubbing.
    try {
        const src = video.getAttribute('src');
        if (src && !src.startsWith('blob:')) {
            const response = await fetch(src);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            video.src = blobUrl;
        }
    } catch (e) {
        console.warn("Failed to load as Blob. Using native stream fallback.", e);
    }

    // Wait for video to load initial data before attaching timeline
    if (video.readyState >= 2) {
        initVideoScrub();
    } else {
        video.addEventListener('loadeddata', initVideoScrub, { once: true });
    }

};

// Initialize when window finishes loading
window.addEventListener('load', setup);

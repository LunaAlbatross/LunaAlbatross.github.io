const textLines = [
    "sudo connect -user Kowshik",
    "[+] Establishing secure connection to node@secure-sys...",
    "[*] Authentication bypass successful. Role: ROOT",
    "[+] Degree: B.E Computer Science & Engineering (Cyber Security)",
    "[*] Certs Found: ISC2, NPTEL-Google Cloud, HackQuest 2k25",
    "[*] Skills: Routing, Traffic Management, System Exploitation, Flask",
    "[*] Projects: Automated WAF, BugTracker, capy-malware-tool, OSI Simulator",
    "[!] Welcome, to my Arena. Pitch is Loading..."
];

const terminalBody = document.getElementById('typing-text');
let lineIndex = 0;
let charIndex = 0;

function typeTerminalLine() {
    if (!terminalBody) return;

    if (lineIndex < textLines.length) {
        if (charIndex === 0) {
            terminalBody.innerHTML += `
                <div class="line" id="line-${lineIndex}">
                    <span class="prompt root">root@secure-sys:~# </span>
                    <span class="text"></span>
                    <span class="cursor"></span>
                </div>
            `;
        }

        const currentLineText = textLines[lineIndex];
        const currentLineEl = document.getElementById(`line-${lineIndex}`).querySelector('.text');

        if (charIndex < currentLineText.length) {
            currentLineEl.innerHTML += currentLineText.charAt(charIndex);
            charIndex++;
            // Variable typing speed to simulate human typing
            setTimeout(typeTerminalLine, Math.random() * 40 + 20);
        } else {
            // Remove cursor from this finished line
            document.getElementById(`line-${lineIndex}`).querySelector('.cursor').remove();

            lineIndex++;
            charIndex = 0;
            setTimeout(typeTerminalLine, 400); // Wait before evaluating the next line
        }
    } else {
        // Appending the final blinking idle cursor line
        terminalBody.innerHTML += '<div class="line"><span class="prompt root">root@secure-sys:~# </span><span class="cursor"></span></div>';
    }
}

// Init sequence on load
window.addEventListener('load', () => {
    setTimeout(typeTerminalLine, 800);
});


// Intersection Observer for scroll animations (fade ins)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // trigger slightly before it comes fully into view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(elem => {
    observer.observe(elem);
});

// Network Canvas Animation
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
const connectionDistance = 150;

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / connectionDistance})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();

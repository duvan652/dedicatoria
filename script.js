//© Zero - Código libre no comercial

// --- FUNCIONES ORIGINALES DE TU PAGINA (DEFINICIONES) ---

// Cargar el SVG y animar los corazones
function initializeTreeAnimation() {
    fetch('Img/treelove.svg')
        .then(res => res.text())
        .then(svgText => {
            const container = document.getElementById('tree-container');
            if (!container) {
                console.error("Contenedor 'tree-container' no encontrado. Asegúrate de que tu HTML esté correcto.");
                return;
            }
            container.innerHTML = svgText;
            const svg = container.querySelector('svg');
            if (!svg) return;

            // Animación de "dibujo" para todos los paths
            const allPaths = Array.from(svg.querySelectorAll('path'));
            allPaths.forEach(path => {
                path.style.stroke = '#222';
                path.style.strokeWidth = '2.5';
                path.style.fillOpacity = '0';
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.transition = 'none';
            });

            // Forzar reflow y luego animar
            setTimeout(() => {
                allPaths.forEach((path, i) => {
                    path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
                    path.style.strokeDashoffset = 0;
                    setTimeout(() => {
                        path.style.fillOpacity = '1';
                        path.style.stroke = '';
                        path.style.strokeWidth = '';
                    }, 1200 + i * 80);
                });
 // Después de la animación de dibujo, mueve y agranda el SVG
const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
setTimeout(() => {
    svg.classList.add('move-and-scale');
    // Aquí debes ejecutar showDedicationText() después de mover el SVG
}, totalDuration);
            }, 40);

            // Selecciona los corazones (formas rojas)
            const heartPaths = allPaths.filter(el => {
                const style = el.getAttribute('style') || '';
                return style.includes('#FC6F58') || style.includes('#C1321F');
            });
            heartPaths.forEach(path => {
                path.classList.add('animated-heart'); // Asegúrate de que esta clase CSS esté en tu style.css
            });
        })
        .catch(error => console.error("Error al cargar el SVG del árbol:", error));
}


// Efecto máquina de escribir para el texto de dedicatoria
function getURLParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function showDedicationText() {
    let text = getURLParam('text');
    if (!text) {
        text = `Para el amor de mi vida:Shelsy\n\nDesde el primer momento supe que eras tú. Tu sonrisa, tu voz, tu forma de ser… todo en ti me hace sentir en casa.\n\nGracias por acompañarme en cada paso, por entenderme incluso en silencio, y por llenar mis días de amor.\n\nTe amo más de lo que las palabras pueden expresar.`;
    } else {
        text = decodeURIComponent(text).replace(/\\n/g, '\n');
    }
    const container = document.getElementById('dedication-text');
    if (!container) return; // Asegúrate de que el contenedor existe
    container.classList.add('typing');
    let i = 0;
    function type() {
        if (i <= text.length) {
            container.textContent = text.slice(0, i);
            i++;
            setTimeout(type, text[i - 2] === '\n' ? 450 : 55);
        } else {
            setTimeout(showSignature, 500);
        }
    }
    type();
}

// Firma manuscrita animada
function showSignature() {
    const dedication = document.getElementById('dedication-text');
    let signature = dedication.querySelector('#signature');
    if (!signature) {
        signature = document.createElement('div');
        signature.id = 'signature';
        signature.className = 'signature';
        dedication.appendChild(signature);
    }
    let firma = getURLParam('firma');
    signature.textContent = firma ? decodeURIComponent(firma) : "Con amor, Tu chocalitico Jhorwan";
    signature.classList.add('visible');
}

// Controlador de objetos flotantes
function startFloatingObjects() {
    const container = document.getElementById('floating-objects');
    if (!container) return; // Asegúrate de que el contenedor existe
    let count = 0;
    function spawn() {
        let el = document.createElement('div');
        el.className = 'floating-petal';
        el.style.left = `${Math.random() * 90 + 2}%`;
        el.style.top = `${100 + Math.random() * 10}%`;
        el.style.opacity = 0.7 + Math.random() * 0.3;
        container.appendChild(el);

        const duration = 6000 + Math.random() * 4000;
        const drift = (Math.random() - 0.5) * 60;
        setTimeout(() => {
            el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
            el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
            el.style.opacity = 0.2;
        }, 30);

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, duration + 2000);

        if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
        else setTimeout(spawn, 1200 + Math.random() * 1200);
    }
    spawn();
}

// Cuenta regresiva o fecha especial
function showCountdown() {
    const container = document.getElementById('countdown');
    if (!container) return; // Asegúrate de que el contenedor existe
    let startParam = getURLParam('start');
    let eventParam = getURLParam('event');
    let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2025-02-10T00:00:00');
    let eventDate = eventParam ? new Date(eventParam + 'T00:00:00') : new Date('2026-02-10T00:00:00');

    function update() {
        const now = new Date();
        let diff = now - startDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let eventDiff = eventDate - now;
        let eventDays = Math.max(0, Math.floor(eventDiff / (1000 * 60 * 60 * 24)));
        let eventHours = Math.max(0, Math.floor((eventDiff / (1000 * 60 * 60)) % 24));
        let eventMinutes = Math.max(0, Math.floor((eventDiff / (1000 * 60)) % 60));
        let eventSeconds = Math.max(0, Math.floor((eventDiff / 1000) % 60));

        container.innerHTML =
            `Llevamos juntos: <b>${days}</b> días<br>` +
            `Nuestro aniversario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
        container.classList.add('visible');
    }
    update();
    setInterval(update, 1000);
}

// --- Música de fondo ---
// Esta función ahora será llamada SOLO cuando se desbloquee la pagina
function playBackgroundMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio) {
        console.error("Elemento de audio con ID 'bg-music' no encontrado.");
        return;
    }

    let btn = document.getElementById('music-btn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'music-btn';
        btn.textContent = '🔊 Música';
        btn.style.position = 'fixed';
        btn.style.bottom = '18px';
        btn.style.right = '18px';
        btn.style.zIndex = 99;
        btn.style.background = 'rgba(255,255,255,0.85)';
        btn.style.border = 'none';
        btn.style.borderRadius = '24px';
        btn.style.padding = '10px 18px';
        btn.style.fontSize = '1.1em';
        btn.style.cursor = 'pointer';
        document.body.appendChild(btn);
    }
    audio.volume = 0.7;
    audio.loop = true;

    // Intentar reproducir inmediatamente después del desbloqueo
    audio.play().then(() => {
        btn.textContent = '🔊 Música';
    }).catch(error => {
        console.error("Error al intentar reproducir la música después del desbloqueo:", error);
        btn.textContent = '▶️ Música'; // Si falla, muestra el botón de reproducir
    });

    btn.onclick = () => {
        if (audio.paused) {
            audio.play();
            btn.textContent = '🔊 Música';
        } else {
            audio.pause();
            btn.textContent = '🔈 Música';
        }
    };
}


// --- NUEVA FUNCION CENTRALIZADA PARA INICIAR EL CONTENIDO PRINCIPAL ---
function initializeMainPageContent() {
    console.log("Iniciando contenido principal y animaciones...");
    initializeTreeAnimation(); // Inicia la carga y animación del SVG del árbol
    showDedicationText();     // Inicia el efecto de máquina de escribir del texto
    startFloatingObjects();   // Inicia los objetos flotantes
    showCountdown();          // Inicia el contador
    playBackgroundMusic();    // Inicia la música de fondo
}


// --- LOGICA DEL CANDADO Y DESBLOQUEO ---
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const passwordInput = document.getElementById('passwordInput');
    const unlockButton = document.getElementById('unlockButton');
    const errorMessage = document.getElementById('errorMessage');
    const mainContent = document.getElementById('mainContent');

    // ¡OJO! Tu código secreto es una fecha, asegúrate de que el formato coincida con el input
    const correctCode = "1234"; // Define tu código secreto aquí

    // Eliminar la llamada directa a playBackgroundMusic() al cargar la página
    // window.addEventListener('DOMContentLoaded', () => { playBackgroundMusic(); }); // ELIMINAR ESTO

    unlockButton.addEventListener('click', () => {
        if (passwordInput.value === correctCode) {
            overlay.style.opacity = '0'; // Desvanece el overlay
            overlay.style.pointerEvents = 'none'; // Deshabilita los eventos del overlay

            setTimeout(() => {
                overlay.classList.add('hidden'); // Oculta completamente el overlay después del desvanecimiento
                mainContent.classList.remove('hidden'); // Muestra el contenido principal
                document.body.style.overflow = 'auto'; // Habilita el scroll

                // *** ¡AQUÍ ES DONDE LLAMAMOS A LA FUNCION QUE INICIA TODO! ***
                initializeMainPageContent();

            }, 500); // Coincide con la duración de la transición en CSS si la añades

        } else {
            errorMessage.textContent = "Código incorrecto. Intenta de nuevo.";
            passwordInput.value = ''; // Limpia el input
        }
    });

    // Opcional: Permitir desbloquear con la tecla Enter
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockButton.click();
        }
    });
});
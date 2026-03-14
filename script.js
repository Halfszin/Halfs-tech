document.addEventListener("DOMContentLoaded", function() {
    
 // --- 1. LÓGICA DO NOME ESCREVENDO (TYPEWRITER) ---
    const titulo = document.getElementById('texto-maquina');
    const nome = "Rafael Souza"; 
    let index = 0;

    if (titulo) {
        titulo.innerHTML = ""; 
        function escreverTexto() {
            if (index < nome.length) {
                titulo.innerHTML += nome.charAt(index);
                index++;
                setTimeout(escreverTexto, 150);
            }
        }
        escreverTexto();
    }

    // --- 2. ELEMENTOS PARA O SCROLL ---
    const btnTopo = document.getElementById("btnTopo");
    const progressBar = document.getElementById("progress-bar");
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".sumario-item");

    // --- 3. EVENTO DE SCROLL CONSOLIDADO ---
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / scrollHeight;
        
        // A. Lógica da Barra de Progresso e Cor Dinâmica da Scrollbar
        if (progressBar) {
            progressBar.style.width = (scrollPercent * 100) + "%";
        }

        // Cor dinâmica para a variável CSS --scroll-color
        const r = Math.round(200 + (168 - 200) * scrollPercent);
        const g = Math.round(160 + (85 - 160) * scrollPercent);
        const b = Math.round(20 + (247 - 20) * scrollPercent);
        document.documentElement.style.setProperty('--scroll-color', `rgb(${r}, ${g}, ${b})`);

        // B. Lógica do Botão Voltar ao Topo
        if (btnTopo) {
            btnTopo.style.display = (scrollTop > 400) ? "block" : "none";
        }

        // C. Lógica do Sumário (Scroll Spy)
        let current = "";
        const isAtAbsoluteBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollTop >= sectionTop - (window.innerHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        if (isAtAbsoluteBottom) {
            current = "contato";
        }

        navItems.forEach((item) => {
            item.classList.remove("active");
            if (current && item.getAttribute("href").includes(current)) {
                item.classList.add("active");
            }
        });
    });

    // --- 4. EVENTO DE CLIQUE NO BOTÃO TOPO ---
    if (btnTopo) {
        btnTopo.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. CONTADOR DE MÉTRICAS (INTERSECTION OBSERVER) ---
    const animarNumeros = () => {
        const counters = document.querySelectorAll('.number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const metricsSection = document.querySelector('.status-metrics');
    if (metricsSection) {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                animarNumeros();
                observer.disconnect(); 
            }
        }, { threshold: 0.5 });

        observer.observe(metricsSection);
    }
});

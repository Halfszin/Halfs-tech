document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DO NOME ESCREVENDO (TYPEWRITER) ---
    const titulo = document.getElementById('texto-maquina');
    const nome = "Rafael Souza"; 
    let index = 0;

    if (titulo) {
        titulo.innerHTML = ""; // Limpa antes de começar
        function escreverTexto() {
            if (index < nome.length) {
                titulo.innerHTML += nome.charAt(index);
                index++;
                setTimeout(escreverTexto, 150);
            }
        }
        escreverTexto();
    }

    // --- 2. LÓGICA DO BOTÃO VOLTAR AO TOPO ---
    const btnTopo = document.getElementById("btnTopo");

    if (btnTopo) {
        window.onscroll = function() {
            // Se descer mais de 400px, o botão aparece
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                btnTopo.style.display = "block";
            } else {
                btnTopo.style.display = "none";
            }
        };

        // Adicionamos o evento de clique diretamente pelo JS para ser mais seguro
        btnTopo.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
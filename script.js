document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LÓGICA DEL BOTÓN DE INGRESO (FORMULARIO Y VALIDACIONES) ---
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            // Evita que la página se recargue automáticamente
            event.preventDefault(); 

            // Obtiene los valores limpiando espacios al inicio y al final
            const username = document.getElementById("usernameInput").value.trim();
            const password = document.getElementById("passwordInput").value.trim();

            // VALIDACIÓN 1: Formato estricto del correo
            // ^al : debe empezar con "al"
            // (\d{5}) : debe contener exactamente 5 dígitos numéricos (los capturamos)
            // @un\.edu\.mx$ : debe terminar exactamente con "@un.edu.mx"
            const emailRegex = /^al(\d{5})@un\.edu\.mx$/;
            const matchCorreo = username.match(emailRegex);

            if (!matchCorreo) {
                alert("Error: El usuario debe empezar con 'al', seguido de exactamente 5 números y terminar en '@un.edu.mx'.\n\nEjemplo válido: al34567@un.edu.mx");
                return; // Detiene la ejecución
            }

            // Extraemos los 5 números (matrícula) que guardamos gracias a (\d{5})
            const matricula = matchCorreo[1]; 
            const passwordPorDefecto = "Uv." + matricula; // Construimos la contraseña que debería ser

            // VALIDACIÓN 2: Contraseña por defecto o contraseña cambiada
            // Si no es la contraseña por defecto, pedimos que al menos tenga 8 caracteres (asumiendo que si la cambió, es una contraseña real)
            if (password !== passwordPorDefecto && password.length < 8) {
                alert(`Error en la contraseña.\n\nRecuerda que si eres nuevo, tu contraseña es "Uv." seguido de tus 5 números (Ejemplo: ${passwordPorDefecto}).\nSi ya la cambiaste, asegúrate de escribirla correctamente.`);
                return; // Detiene la ejecución
            }

            // Si pasa todas las validaciones, procedemos con la simulación
            const btn = loginForm.querySelector(".btn-primary");
            const btnOriginalText = btn.innerHTML;
            
            btn.innerHTML = "Verificando credenciales...";
            btn.style.opacity = "0.7";
            btn.style.cursor = "wait";

            // Simula un tiempo de espera de conexión con el servidor (1.5 segundos)
            setTimeout(() => {
                // Mensaje dinámico dependiendo de si usó la contraseña por defecto o una personalizada
                if (password === passwordPorDefecto) {
                    alert(`¡Bienvenido al sistema ENLACE!\n\nIngresaste con la contraseña por defecto de la matrícula: ${matricula}`);
                } else {
                    alert(`¡Bienvenido al sistema ENLACE!\n\nIngresaste exitosamente con tu contraseña personalizada.`);
                }
                
                // Restaura el botón a su estado normal
                btn.innerHTML = btnOriginalText;
                btn.style.opacity = "1";
                btn.style.cursor = "pointer";
                
                // Redirección (descomentar cuando tengas la página de destino)
                // window.location.href = "dashboard.html"; 
                
            }, 1500); 
        });
    }

    // --- 2. LÓGICA PARA ILUMINAR EL BOTÓN ACTIVO EN EL MENÚ DE NAVEGACIÓN ---
    const currentLocation = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Identifica si estamos en la ruta actual o en la raíz (index)
        if (linkPath === currentLocation || (currentLocation === "" && linkPath === "index.html")) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});
document.addEventListener("DOMContentLoaded", function() {
    // para mostrar el nombre del usuario
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user && user.usuario && user.usuario.username) {
        // Asigna el nombre de usuario al campo con id 'nombre'
        document.getElementById('nombre').value = user.usuario.username;
        document.getElementById('email').value = user.usuario.email;
        document.getElementById('confirmar-email').value = user.usuario.email;
    } else {
        document.getElementById('nombre').value = "Usuario no encontrado";
    }
});
const form = document.querySelector('form');
const continuarBtn = document.getElementById("btn");
continuarBtn.addEventListener('click', function(event) {
    // Prevenir el comportamiento por defecto del botón (por ejemplo, submit de formulario)
    if (event) event.preventDefault();

    if (!form.checkValidity()) {
        // Si el formulario no es válido, mostrar los mensajes de validación
        form.reportValidity();
        return;
    }

    // Crear el modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)';
    modalContent.style.padding = '40px 60px';
    modalContent.style.borderRadius = '16px';
    modalContent.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';
    modalContent.style.position = 'relative';
    modalContent.style.minWidth = '320px';

    // Icono decorativo
    const icon = document.createElement('div');
    icon.innerHTML = '🎉';
    icon.style.fontSize = '48px';
    icon.style.marginBottom = '16px';
    modalContent.appendChild(icon);

    // Título
    const title = document.createElement('h2');
    title.textContent = '¡Felicidades!';
    title.style.margin = '0 0 10px 0';
    title.style.fontFamily = 'Segoe UI, sans-serif';
    title.style.color = '#1e293b';
    modalContent.appendChild(title);

    // Mensaje
    const message = document.createElement('p');
    message.textContent = 'Ahora sos socio del mejor club de Argentina, ¡disfrutá de todos los beneficios!';
    message.style.margin = '0 0 20px 0';
    message.style.fontSize = '18px';
    message.style.color = '#334155';
    message.style.fontFamily = 'Segoe UI, sans-serif';
    modalContent.appendChild(message);

    // Botón para cerrar el modal
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Cerrar';
    closeBtn.style.marginTop = '10px';
    closeBtn.style.padding = '10px 30px';
    closeBtn.style.background = 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '6px';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = 'background 0.2s';

    // El modal solo se cierra cuando se hace clic en el botón "Cerrar"
    closeBtn.onmouseover = function() {
        closeBtn.style.background = 'linear-gradient(90deg, #1e40af 0%, #0ea5e9 100%)';
    };
    closeBtn.onmouseout = function() {
        closeBtn.style.background = 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)';
    };
    closeBtn.onclick = function() {
        window.location.href="login.html";
        document.body.removeChild(modal);
        
    };

    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
});

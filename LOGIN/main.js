document.addEventListener("DOMContentLoaded", function() {
        // para mostrar el nombre del usuario
        const user = JSON.parse(localStorage.getItem("usuario"));
        console.log(user);
        if (user) {
            document.getElementById('nombre').textContent = user.usuario.username + "    -> Traido de la API"
            document.getElementById('email').textContent = user.usuario.email + "    -> Traido de la API"
        }else {
            document.getElementById('nombre').textContent = "Usuario y email no encontrado";
        }
    });
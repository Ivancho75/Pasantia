const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", ()=>{
    container.classList.add("active");
})

loginBtn.addEventListener("click", ()=>{
    container.classList.remove("active");
})


// Función genérica para mostrar un modal
function showModal({ 
    icon = "", 
    iconColor = "#000", 
    message = "", 
    messageColor = "#000", 
    buttonText = "Cerrar", 
    buttonColor = "#4BB543", 
    buttonHoverColor = "#388e2c", 
    borderColor = "#fff", 
    onClose = null 
}) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.4)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";

    const modalContent = document.createElement("div");
    modalContent.style.background = "#fff";
    modalContent.style.padding = "32px 40px";
    modalContent.style.borderRadius = "12px";
    modalContent.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)";
    modalContent.style.textAlign = "center";
    modalContent.style.maxWidth = "90vw";
    modalContent.style.fontFamily = "sans-serif";
    modalContent.style.border = `2px solid ${borderColor}`;

    if (icon) {
        const iconDiv = document.createElement("div");
        iconDiv.innerHTML = icon;
        iconDiv.style.fontSize = "48px";
        iconDiv.style.color = iconColor;
        iconDiv.style.marginBottom = "16px";
        modalContent.appendChild(iconDiv);
    }

    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.fontSize = "20px";
    messageDiv.style.marginBottom = "20px";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.color = messageColor;
    modalContent.appendChild(messageDiv);

    const btn = document.createElement("button");
    btn.textContent = buttonText;
    btn.style.background = buttonColor;
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "10px 28px";
    btn.style.borderRadius = "6px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.2s";
    btn.onmouseover = () => btn.style.background = buttonHoverColor;
    btn.onmouseout = () => btn.style.background = buttonColor;

    btn.onclick = () => {
        document.body.removeChild(modal);
        if (typeof onClose === "function") onClose();
    };

    modalContent.appendChild(btn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        if (data) {
            showModal({
                icon: "&#10003;",
                iconColor: "#4BB543",
                message: "¡Inicio de sesión exitoso!",
                buttonText: "Continuar",
                buttonColor: "#4BB543",
                buttonHoverColor: "#388e2c",
                borderColor: "#4BB543",
                onClose: () => {
                    localStorage.setItem("usuario", JSON.stringify(data));
                    window.location.href = "main.html";
                }
            });
        } else {
            showModal({
                icon: "&#10060;",
                iconColor: "#e74c3c",
                message: "Correo o contraseña inválidos. Por favor, intenta nuevamente.",
                messageColor: "#e74c3c",
                buttonText: "Cerrar",
                buttonColor: "#e74c3c",
                buttonHoverColor: "#c0392b",
                borderColor: "#e74c3c"
            });
        }
    } catch (error) {
        showModal({
            icon: "&#10060;",
            iconColor: "#e74c3c",
            message: "Correo o contraseña inválidos. Por favor, intenta nuevamente.",
            messageColor: "#e74c3c",
            buttonText: "Cerrar",
            buttonColor: "#e74c3c",
            buttonHoverColor: "#c0392b",
            borderColor: "#e74c3c"
        });
    }
});

//Crear un nuevo usuario, todavia no funciona
document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the values from the input fields
    const username = document.querySelector(".form-box.register .input-box input[type='text']").value;
    const email = document.querySelector(".form-box.register .input-box input[type='email']").value;
    const password = document.querySelector(".form-box.register .input-box input[type='password']").value;

    try {
        const response = await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();

        if (response.ok && data) {
            showModal({
                icon: "&#10003;",
                iconColor: "#4BB543",
                message: "¡Usuario creado exitosamente!",
                buttonText: "Continuar",
                buttonColor: "#4BB543",
                buttonHoverColor: "#388e2c",
                borderColor: "#4BB543",
                onClose: () => {
                    localStorage.setItem("usuario", JSON.stringify(data));
                    window.location.href = "main.html";
                }
            });
        } else {
            showModal({
                icon: "&#10060;",
                iconColor: "#e74c3c",
                message: data?.message || "No se pudo crear el usuario. Intenta nuevamente.",
                messageColor: "#e74c3c",
                buttonText: "Cerrar",
                buttonColor: "#e74c3c",
                buttonHoverColor: "#c0392b",
                borderColor: "#e74c3c"
            });
        }
    } catch (error) {
        showModal({
            icon: "&#10060;",
            iconColor: "#e74c3c",
            message: error?.message || "No se pudo crear el usuario por errores. Intenta nuevamente.",
            messageColor: "#e74c3c",
            buttonText: "Cerrar",
            buttonColor: "#e74c3c",
            buttonHoverColor: "#c0392b",
            borderColor: "#e74c3c"
        });
    }
});

//Codigo para olvide contraseña//
document.getElementById("forgot-link").addEventListener("click", async function() {
    // Solicitar el email del usuario
    const email = prompt("Por favor, ingresa tu correo electrónico para recuperar tu contraseña:");
    if (email && email.includes("@")) {
        try {
            await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            // Siempre mostrar el mismo mensaje para evitar revelar si el correo existe
            alert("Si el correo existe, recibirás instrucciones para restablecer tu contraseña.");
        } catch (error) {
            alert("Ocurrió un error. Intenta nuevamente más tarde.");
        }
    } else if (email !== null) {
        alert("Por favor, ingresa un correo electrónico válido.");
    }
    // Mostrar un mensaje o redirigir a la página de recuperación de contraseña
    //alert("Funcionalidad de recuperación de contraseña no implementada."); 
});





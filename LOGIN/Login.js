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

//Crear un nuevo usuario,  TODAVIA NO FUNCIONA
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
                //En este caso el mensaje viene desde la API, con data
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
            //El menssaje es de error
        });
    }
});

//Codigo para olvide contraseña//
document.getElementById("forgot-link").addEventListener("click", function(e) {
    e.preventDefault(); // <-- Esto evita que el modal se cierre inmediatamente

    // Crear modal personalizado para solicitar el email
    //No uso funcion ShowModal porque este requiere dos botones
    let modal = document.createElement("div");
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

    let modalContent = document.createElement("div");
    modalContent.style.background = "#fff";
    modalContent.style.padding = "32px 40px";
    modalContent.style.borderRadius = "12px";
    modalContent.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)";
    modalContent.style.textAlign = "center";
    modalContent.style.maxWidth = "90vw";
    modalContent.style.fontFamily = "sans-serif";
    modalContent.style.border = "2px solid #1976d2";

    let title = document.createElement("div");
    title.textContent = "Recuperar contraseña";
    title.style.fontSize = "22px";
    title.style.fontWeight = "bold";
    title.style.marginBottom = "16px";
    title.style.color = "#1976d2";
    modalContent.appendChild(title);

    let label = document.createElement("label");
    label.textContent = "Por favor, ingresa tu correo electrónico:";
    label.style.display = "block";
    label.style.marginBottom = "10px";
    label.style.fontSize = "16px";
    modalContent.appendChild(label);

    let input = document.createElement("input");
    input.type = "email";
    input.placeholder = "ejemplo@correo.com";
    input.style.width = "100%";
    input.style.padding = "10px";
    input.style.marginBottom = "18px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "6px";
    input.style.fontSize = "16px";
    modalContent.appendChild(input);

    let errorMsg = document.createElement("div");
    errorMsg.style.color = "#e74c3c";
    errorMsg.style.fontSize = "14px";
    errorMsg.style.marginBottom = "10px";
    errorMsg.style.display = "none";
    modalContent.appendChild(errorMsg);

    let btn = document.createElement("button");
    btn.textContent = "Enviar";
    btn.style.background = "#1976d2";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "10px 28px";
    btn.style.borderRadius = "6px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.2s";
    btn.onmouseover = () => btn.style.background = "#125ea2";
    btn.onmouseout = () => btn.style.background = "#1976d2";

    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancelar";
    cancelBtn.style.background = "#e0e0e0";
    cancelBtn.style.color = "#333";
    cancelBtn.style.border = "none";
    cancelBtn.style.padding = "10px 20px";
    cancelBtn.style.borderRadius = "6px";
    cancelBtn.style.fontSize = "16px";
    cancelBtn.style.cursor = "pointer";
    cancelBtn.style.marginLeft = "12px";
    cancelBtn.onmouseover = () => cancelBtn.style.background = "#bdbdbd";
    cancelBtn.onmouseout = () => cancelBtn.style.background = "#e0e0e0";

    btn.onclick = async () => {
        const email = input.value.trim();
        if (!email || !email.includes("@")) {
            errorMsg.textContent = "Por favor, ingresa un correo electrónico válido.";
            errorMsg.style.display = "block";
            return;
        }
        errorMsg.style.display = "none";
        btn.disabled = true;
        cancelBtn.disabled = true;
        try {
            await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            document.body.removeChild(modal);
            showModal({
                icon: "&#128231;",
                iconColor: "#1976d2",
                message: "Si el correo existe, recibirás instrucciones para restablecer tu contraseña.",
                buttonText: "Aceptar",
                buttonColor: "#1976d2",
                buttonHoverColor: "#125ea2",
                borderColor: "#1976d2"
            });
        } catch (error) {
            document.body.removeChild(modal);
            showModal({
                icon: "&#10060;",
                iconColor: "#e74c3c",
                message: "Ocurrió un error. Intenta nuevamente más tarde.",
                messageColor: "#e74c3c",
                buttonText: "Cerrar",
                buttonColor: "#e74c3c",
                buttonHoverColor: "#c0392b",
                borderColor: "#e74c3c"
            });
        }
    };

    cancelBtn.onclick = () => {
        document.body.removeChild(modal);
    };

    let btnContainer = document.createElement("div");
    btnContainer.appendChild(btn);
    btnContainer.appendChild(cancelBtn);
    modalContent.appendChild(btnContainer);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    input.focus();
});







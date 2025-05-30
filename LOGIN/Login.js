document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the values from the input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
            // credentials: "include" // Include cookies in the request
        });
        const data = await response.json();
        //console.log(data);// -> Para ver valor de data

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        if (data) {
            alert("Login successful!");
            localStorage.setItem("usuario", JSON.stringify(data));
            window.location.href = "main.html"; // Change this to your main page URL
        } else {
            alert("Invalid email or password. Please try again.");
        }
    } catch (error) {
        //alert("An error occurred. Please try again later.");
        alert("Invalid email or password. Please try again.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("register-link");
    const container = document.querySelector(".container-form");
    if (btn) {
        btn.addEventListener("click", function() {
            container.classList.toggle("active");        
        });
    }
});


export const fetchCredenciales = async ({ email, password }) => {
  const response = await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) throw new Error("Email o contraseña incorrecto");
  return response.json(); // token, user, etc.
};



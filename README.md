# DIPLOMATURA FULL STACK
## Módulo 4
### Sprint 6 – Trabajo Final – Front End
# Alumno: Gonzalo Romero

# Proyecto: Gonflix
## Tecnologías utilizadas

Vite

React

TailwindCSS

Flowbite

React Toastify

SweetAlert

React Hook Form

Yup

JSON Web Token (JWT)

Axios

Nodemailer

## Descripción del proyecto
Gonflix es una plataforma web de streaming desarrollada con tecnologías modernas del ecosistema JavaScript. Permite a los usuarios explorar un catálogo de películas, gestionar perfiles personalizados y crear su propia lista de favoritas.

El sistema cuenta con un proceso de registro que requiere una dirección de correo electrónico válida. Al registrarse, el usuario recibe un correo de verificación para activar su cuenta, utilizando Nodemailer y JWT para garantizar la autenticación segura.

Los usuarios no registrados solo pueden acceder a la página de inicio, donde se muestra un Top 5 de películas destacadas por ranking, novedades y popularidad.

Una vez que el usuario inicia sesión, debe seleccionar un perfil existente o crear uno nuevo para acceder al contenido completo de la plataforma.

## Roles de usuario
👤 Usuario general: puede navegar, ver películas y armar listas personales.

✏️ Editor: además de lo anterior, puede agregar y editar películas.

🔐 Administrador: posee todos los permisos anteriores y puede gestionar cuentas de usuarios.

## Perfiles
Cada cuenta puede contener múltiples perfiles. Estos se clasifican según la edad (mayores o menores de 18 años). Según esta información, se muestra o restringe el contenido para adultos.

Cada perfil mantiene su propia lista de películas favoritas de manera independiente.

## Funcionalidades adicionales
🌙 Modo oscuro

📄 Paginado en el listado de películas

## Deploy

gonflix.netlify.app

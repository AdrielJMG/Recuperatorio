// 1. Obtener referencia al formulario y al select de ciudades
const cityForm = document.getElementById('cityForm');
const ciudadSelect = document.getElementById('selectCity');
// 2. Definir función para cargar dinámicamente las opciones de ciudades desde datos.json usando fetch
function cargarOpcionesCiudades() {
    // Llamar al archivo usando fetch
    fetch('./datos.json')
    .then(response => response.json())
    .then(data => {
        // Almacenar los datos en localStorage para usarlos en clima.html
        localStorage.setItem('ciudades', JSON.stringify(data.ciudades));
        // Iterar sobre las ciudades obtenidas y agregar opciones al select
        data.ciudades.forEach(ciudad => {
            const option = document.createElement('option');
            option.value = ciudad.nombre;
            option.textContent = ciudad.nombre;
            ciudadSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar las opciones de ciudades desde datos.json:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        alert('Error al cargar las opciones de ciudades. Inténtelo de nuevo más tarde.');
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        });
}

// 3. Manejar evento de envío del formulario para redirigir a clima.html con la ciudad seleccionada
cityForm.addEventListener('submit', function(event) {
    // Prevenir el envío del formulario para manejarlo con JavaScript
    event.preventDefault();
    // Redirigir a clima.html con la ciudad seleccionada como parámetro GET
    const ciudadSeleccionada= ciudadSelect.value;
    if(ciudadSeleccionada){
    window.location.href = `clima.html?ciudad=${encodeURIComponent(ciudadSeleccionada)}`;
} else {
    alert('Por favor, seleccione una ciudad.');
}
});

// 4. Cargar las opciones de ciudades al cargar la página principal
document.addEventListener('DOMContentLoaded', cargarOpcionesCiudades);



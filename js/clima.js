// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)
const tablaClima = document.getElementById('weatherTable');
const historialConsultas = document.getElementById('historyList');
const btnVaciarHistorial = document.getElementById('clearHistoryBtn');
// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
    const url = new URLSearchParams(window.location.search);
    return url.get(nombreParametro);
}
// 3. Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(ciudad) {
    // Obtener los datos del clima almacenados en localStorage
    const datosClima=JSON.parse(localStorage.getItem('ciudades')) || [];
    console.log(datosClima);
    const ciudadEncontrada = datosClima.find(dato => dato.nombre === ciudad);
    // Buscar la ciudad en los datos obtenidos
    if (ciudadEncontrada) {
        // Mostrar la información del clima en la tabla
        mostrarClimaEnTabla(ciudadEncontrada);
        // Agregar la ciudad al historial en localStorage
        agregarCiudadAHistorial(ciudad);


    } else {
        console.error(`No se encontró información para la ciudad ${ciudad}`);
        // Manejar el caso donde no se encuentra la ciudad en los datos
    }
}

// 4. Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudadEncontrada) {
    tablaClima.innerHTML = `
        <tr>
            <td>${ciudadEncontrada.nombre}</td>
            <td>${ciudadEncontrada.temperatura}</td>
            <td>${ciudadEncontrada.condicion}</td>
        </tr>
    `;
}

// 5. Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
    // Evitar duplicados en el historial
    let historial = JSON.parse(localStorage.getItem('historyList')) || [];
    if (!historial.includes(ciudad.toLowerCase())) {
        historial.push(ciudad.toLowerCase());
        localStorage.setItem('historyList', JSON.stringify(historial));
    // Actualizar la lista en el DOM
        actualizarHistorialEnDOM();
    }
}

// 6. Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
    // Vaciar historial en localStorage
  historialConsultas.innerHTML = '';
  const historial = JSON.parse(localStorage.getItem('historyList')) || [];
  // Vaciar la lista de historial en el DOM
  // Recorrer el historial y cargar en el dom
  historial.forEach(ciudad => {
      const li = document.createElement('li');
      li.textContent = ciudad;
      historialConsultas.appendChild(li);
  });
}

// 7. Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
    localStorage.removeItem('historyList');
    historialConsultas.innerHTML = '';
}
// 8. Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // obtener parámetros GET de la URL (ciudad seleccionada)
    const ciudadSeleccionada=obtenerParametroGET('ciudad');
    // obtener información de clima de una ciudad desde localStorage
    if(ciudadSeleccionada){
        obtenerInfoClima(ciudadSeleccionada);
    }
    // actualizar el historial en el DOM desde localStorage
    actualizarHistorialEnDOM();
});

// 9. Manejar evento de clic en el botón de vaciar historial para eliminar todas las consultas anteriores
btnVaciarHistorial.addEventListener('click', vaciarHistorial);










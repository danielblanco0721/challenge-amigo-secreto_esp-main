// Arreglo para almacenar los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    // Validar que el nombre no esté vacío
    if (nombre === '') {
        alert('Por favor, ingresa un nombre.');
        return;
    }

    // Validar que el nombre no esté duplicado (sin importar mayúsculas)
    if (amigos.some(amigo => amigo.toLowerCase() === nombre.toLowerCase())) {
        alert('Este nombre ya fue agregado.');
        return;
    }

    // Agregar el nombre al arreglo
    amigos.push(nombre);

    // Limpiar el input
    input.value = '';

    // Actualizar la lista en pantalla
    mostrarLista();
}

// Función para mostrar la lista de amigos agregados
function mostrarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiar lista actual

    amigos.forEach(nombre => {
        const li = document.createElement('li');
        li.className = 'name-item';
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para sortear los amigos secretos
function sortearAmigo() {
    const resultado = document.getElementById('resultado');

    // Validar que haya al menos 2 amigos
    if (amigos.length < 2) {
        alert('Agrega al menos 2 amigos para hacer el sorteo.');
        return;
    }

    // Limpiar resultados anteriores
    resultado.innerHTML = '';

    // Crear una copia mezclada de los amigos
    let shuffled = [...amigos];
    let maxIntentos = 1000; // Evitar bucle infinito
    let intentos = 0;
    let valido = false;

    // Re-mezclar hasta que nadie se asigne a sí mismo
    while (!valido && intentos < maxIntentos) {
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Verificar que nadie se asigne a sí mismo
        valido = amigos.every((amigo, index) => amigo !== shuffled[index]);

        intentos++;
    }

    // Si no se encontró una combinación válida (muy raro con 3+ personas)
    if (!valido) {
        alert('No se pudo generar una asignación válida. Inténtalo de nuevo.');
        return;
    }

    // Mostrar resultados
    const asignaciones = [];
    for (let i = 0; i < amigos.length; i++) {
        asignaciones.push({ quien: amigos[i], recibe: shuffled[i] });
    }

    asignaciones.forEach(asignacion => {
        const li = document.createElement('li');
        li.className = 'result-item';
        li.innerHTML = `<strong>${asignacion.quien}</strong> le regala a <strong>${asignacion.recibe}</strong>`;
        resultado.appendChild(li);
    });
}
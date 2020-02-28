var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp) => renderizarUsuarios(resp));
});

// escuchar
socket.on('disconnect', () => console.log('Perdimos conexión con el servidor'));


// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
socket.on('listaPersona', (personas) => renderizarUsuarios(personas));

//Mensaje privado
socket.on('mensajePrivado', (mensaje) => console.log(mensaje));
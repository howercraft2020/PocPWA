// 1. Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

// 2. Función Cerrar Ticket (GPS + Offline)
function cerrarTicket() {
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = "Obteniendo ubicación...";

    if (!navigator.geolocation) {
        alert("Tu navegador no soporta GPS");
        return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
        const data = {
            ticketId: 6001,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            fecha: new Date().toISOString()
        };

        // Guardar en almacenamiento local (Offline)
        localStorage.setItem('ultimo_ticket_cerrado', JSON.stringify(data));
        
        document.getElementById('ticket-state').innerText = "CERRADO EXITOSAMENTE";
        statusDiv.innerHTML = `<strong>Guardado Offline:</strong><br>Lat: ${data.lat}<br>Lon: ${data.lon}`;
        
        alert("Ticket cerrado localmente. Se sincronizará al detectar internet.");
    }, (err) => {
        alert("Error al obtener GPS: " + err.message);
    });
}

// 3. Simular Notificación Push
function simularNotificacion() {
    // Pedir permiso
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            document.getElementById('status').innerText = "Esperando asignación (5 seg)...";
            
            setTimeout(() => {
                new Notification("Nueva Asignación", {
                    body: "Ticket #6002: Reparación de aire acondicionado - Providencia",
                    icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                });
            }, 5000);
        }
    });
}

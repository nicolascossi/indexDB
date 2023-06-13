// Empezamos asi el codigo para que no se mezcle con otros archivos de JS
(function() {

    // Variable para guardar valor, si la base de datos se crea correctamente se a asignar al valor de DB
    let DB;

    // Registra que cargo toda la pagina para ejecutar la funcion crearDB
    document.addEventListener('DOMContentLoaded', () => {
        crearDB()
    })

    // Funcion para crear la indexDB
    function crearDB () {
        // Crea la base de datos
        const crearDB = window.indexedDB.open('crm', 1)

        // Ejecuta un mesanje en la consolo si no se pudo crear, por ejemplo el navegador no soporta IndexDB
        crearDB.onerror = function() {
            console.log('Hubo un error al crear la base de datos')
        }

        // Si se crea la base de datos, asigna la misma al valor DB
        crearDB.onsuccess = function() {
            DB = crearDB.result
        }

        // Cuando se crear nuestra base de datos va a registrar todas nuestras columnas corre una sola vez
        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;
            
            // Creamos nuestro object store que es donde se guardan los datos
            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });
            
            // Creamos las columnas para organizar los datos
            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: false });

            console.log('Base de datos y columnas creadas correctamente');
        };
    }
})();


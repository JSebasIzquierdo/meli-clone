# Proyecto de Búsqueda en MercadoLibre

Este proyecto es una aplicación web desarrollada en React que permite realizar búsquedas de productos en MercadoLibre y ver los detalles de cada producto.

## Instalación

1. Clona el repositorio del proyecto en tu máquina local.

git clone https://github.com/jsebasizquierdo/meli-clone.git

2. Instala las dependencias del proyecto.

npm install

3. Inicia el servidor.

Abre una terminal y navega hasta el archivo que contiene el servidor, así:

cd Server

Luego, una vez dentro de la carpeta Server, ejecuta el siguiente comando:

node server.js

Luego, el servidor se ejecutará y se mostrará en un consola un aviso con "Servidor en funcionamiento en el puerto 3001".

4. Inicia la aplicación.

Abre otra terminal y utiliza el siguiente comando:

npm start

La aplicación se abrirá en tu navegador predeterminado en `http://localhost:3000`.

## Uso

La aplicación consta de una barra de búsqueda en la parte superior donde puedes ingresar palabras clave para buscar productos en MercadoLibre. Al presionar Enter o hacer clic en el botón de búsqueda, se mostrarán los resultados de la búsqueda.

Puedes hacer clic en un producto para ver más detalles, como la imagen, el precio, la descripción, etc.

## Componentes

### Searchbar

El componente `Searchbar` representa la barra de búsqueda en la parte superior de la aplicación. Permite ingresar el término de búsqueda y realizar la búsqueda al presionar Enter o hacer clic en el botón de búsqueda.

### SearchResultRequest

El componente `SearchResultRequest` se encarga de obtener y mostrar los resultados de búsqueda en función del término de búsqueda ingresado. Realiza una solicitud al backend para obtener los resultados de búsqueda y los muestra en el componente `Searchresult`.

### Searchresult

El componente `Searchresult` muestra los resultados de búsqueda obtenidos del backend. Muestra una lista de productos con su imagen, precio, nombre, etc. Al hacer clic en un producto, se redirige al usuario a la página de detalles del producto.

### ProductDetails

El componente `ProductDetails` muestra los detalles de un producto específico. Muestra la imagen, el título, el precio, la descripción, etc., del producto seleccionado.

## Backend

El proyecto también incluye un backend desarrollado en Express que actúa como intermediario entre la aplicación de React y la API de MercadoLibre. El backend se encarga de realizar las solicitudes a la API de MercadoLibre y formatear los datos de respuesta antes de enviarlos al frontend.

El backend expone dos rutas:

- `/api/items`: Realiza una solicitud a la API de MercadoLibre para obtener los resultados de búsqueda en función del término ingresado. Formatea los datos y los devuelve al frontend.

- `/api/items/:id`: Realiza una solicitud a la API de MercadoLibre para obtener los detalles de un producto específico en función del ID proporcionado. Formatea los datos y los devuelve al frontend.

El backend está configurado para permitir solicitudes CORS desde cualquier origen para facilitar el desarrollo en entorno local.

## Tecnologías utilizadas

- React: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- React Router: Biblioteca para el enrutamiento de la aplicación.
- Axios: Biblioteca para realizar solicitudes HTTP desde el frontend.
- Express: Framework de Node.js para construir aplicaciones web.
- MercadoLibre API: API de MercadoLibre utilizada para realizar las búsquedas y obtener los detalles de los productos.

## Contribución

Si deseas contribuir a este proyecto, puedes hacerlo siguiendo estos pasos:

1. Haz un fork

del repositorio en GitHub. 2. Crea una rama nueva para tu funcionalidad o corrección de errores. 3. Realiza los cambios necesarios en tu rama. 4. Haz commit de tus cambios y realiza un push a tu repositorio fork. 5. Abre una solicitud de extracción en el repositorio original para que revisemos tus cambios.

## Autor

Este proyecto fue desarrollado por Juan Sebastián Izquierdo y se encuentra disponible en https://github.com/jsebasizquierdo/meli-clone.

## Licencia

Este proyecto se distribuye bajo la [Licencia MIT](https://opensource.org/licenses/MIT).

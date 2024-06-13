# API de K-Beauty 💁‍♀🇰🇷 Evaluación final del módulo 4 de Adalab

Esta API incluye algunos productos de cosmética coreana de la marca Beauty of Joseon. El objetivo es ampliarla para incluir más productos de la marca y usarla en el proyecto personal Skin & Co.

## ​ **Clonar el repositorio** 

Puedes clonar el repositorio con este link: [(https://github.com/Adalab/modulo-4-evaluacion-final-bpw-valenovalles.git)]

## 📁 **/products -- Consultar toda la base de datos de productos**

Con este endpoint puedes consultar todos los productos de la base de datos con la siguiente información: id, nombre, categoría, descripción, ingredientes y tipo de piel.

## ➕​**/products/new -- Agregar un producto nuevo a la base de datos**

Con este Endpoint puedes agregar nuevos productos a la base de datos. 
Se deben incluir los siguientes campos: id, nombre, categoría, descripción, ingredientes y tipo de piel. (Sólo la descripción es opcional. El resto de la información es obligatoria)

## 🫶​**/products/skinType -- -- Filtrar productos por tipo de piel**

Con este Endpoint puedes filtrar los productos por tipos de piel. Skin & Co necesita recomendar al usuario los mejores productos para su tipo de piel y por ello el filtro se ha hecho con esa columna de la base de datos.
Puedes filtrar or estos tipos de piel: Todos, Seca, Normal, Mixta y Grasa.
Ejemplo de la url: /products/todos

## ​✍️​**/products/id -- Actualizar un producto por su id**

A través de este Endpoint se puede actualizar la información de cualquier propiedad de la base de datos. 
El sistema arrojara el mensaje "Producto actualizado con éxito" si fue ejecutado correctamente y se enviará un mensaje de error en caso de que algo fallara. 


## ​📂❌**/products/id -- Borrar un producto por su id**
A través de este endpoint se puede borrar un producto indicando su id. 

## ✅**Tecnologías utilizadas**

Node
Express

Valentina Ovalles Rodríguez.

# CSS Grid Layout
## Ejercicio para curso de CSS Grid Layout

CSS Grid layout contiente funciones de diseño dirigidas a los desarrolladores de aplicaciones web. El CSS grid se puede utilizar para lograr muchos diseños diferentes. Destaca por dividir una página en regiones principales, o definir la relación en términos de tamaño, posición y capas entre partes de un control construido a partir de primitivas HTML.

Al igual que las tablas, el grid layout permite a un autor alinear elementos en columnas y filas. Sin embargo, son posibles más diseños o más sencillos con CSS grid que como lo eran con las tablas. Por ejemplo, los elementos secundarios de un contenedor de cuadrícula podrían posicionarse de manera que se solapen y se superpongan, similar a los elementos posicionados en CSS.

### Herramientas utilizadas
* HTML5
* CSS3
* JS
* Foundation
* Foundation Icons
* Font Awesome
* **Gulp** (Automatización de tareas)
	- browser-sync: sirve como base para el servidor de desarrollo, y sincroniza nuestro navegador con los cambios que hacemos.
	- css-mqpacker: para unificar las media-queries de nuestro proyecto, lo cual es muy útil para no tener código repetido en nuestro fichero css final.
	- rucksack-css: crea una tipografía fluida automática con una nueva propiedad responsive en font-size.
	- gulp-file-include: podemos crear archivos parciales de HTML en nuestro proyecto, lo cual permite reutilizar código y agilizar el trabajo.

* **Postcss** (gulp-postcss para procesamiento de CSS)
	- postcss-mixins: para reutilizar estilos de CSS.
	- postcss-import: para importar archivos CSS dentro de otros archivos CSS. Debemos tener cuidado de no hacer “require” usando la palabra reservada “import” (la cual es usada por JS), para este caso usamos: atImport.
	- postcss-nested: extienden la sintaxis de CSS; similar a SASS y Stylus, cómo por ejemplo, la posibilidad de anidar clases.
	- postcss-cssnext: es un complemento que ayuda a utilizar la última sintaxis de CSS en la actualidad. Transforma las nuevas especificaciones de CSS en CSS más compatibles para que no tenga que esperar al soporte del navegador. 
	- csswring: Es un minificador de CSS para PostCSS. Es importante que vaya al último para que no tenga conflictos.   

### Equipo
* [Enrique J. Valerio G. (Diseñador Frontend)](https://github.com/Caballero73 "Enrique Valerio - Diseñador Frontend")
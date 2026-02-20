# Documentación 

## 1. Propósito de la estructura utilizada

La estructura del proyecto se organizó separando los archivos según su función:

- El archivo principal **`index.html`** contiene la estructura del sitio.
- La carpeta **`css/`** almacena los estilos.
- La carpeta **`js/`** contiene la lógica en JavaScript.
- La carpeta **`assets/`** guarda recursos como imágenes y otros archivos multimedia.

Esta organización tiene como finalidad mantener un orden claro dentro del proyecto y facilitar su desarrollo en equipo.

### Ventajas de esta estructura

- **Organización:** cada archivo cumple una función específica y está ubicado en la carpeta correspondiente.  
- **Facilidad de mantenimiento:** si se requiere modificar el diseño, se trabaja en los archivos CSS; si se necesita ajustar el comportamiento, se revisa JavaScript.  
- **Mejor trabajo en equipo:** los integrantes pueden desarrollar distintas partes del proyecto sin generar conflictos constantes en un mismo archivo.  
- **Mayor claridad del código:** al estar dividido por responsabilidades, el proyecto resulta más comprensible y estructurado.  

---

## 2. Importancia de la separación entre Cliente y Servidor

En este ejercicio se trabajó principalmente la parte del **cliente (frontend)**, que corresponde a lo que el usuario visualiza e interactúa en el navegador.

En una aplicación web completa también existe el **servidor (backend)**, que se encarga de:

- Procesar la información.  
- Almacenar datos.  
- Manejar funciones internas como autenticación, inventario o pagos.  

### Importancia de esta separación

- **Protege la información sensible:** los datos importantes no deben gestionarse únicamente desde el navegador.  
- **Distribuye responsabilidades:** el cliente muestra la información y el servidor la procesa y administra.  
- **Permite mejoras futuras:** se pueden añadir nuevas funcionalidades sin modificar completamente la parte visual.  
- **Facilita el mantenimiento:** los cambios en la lógica interna no afectan directamente la interfaz del usuario.  
---
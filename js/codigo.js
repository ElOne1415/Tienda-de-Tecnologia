/* js/codigo.js
   Navegación responsiva, marcado de enlace activo, scroll suave y manejo de formulario.
   Código consolidado: un solo DOMContentLoaded, sin duplicados.
*/

(function () {
  'use strict';

  // throttle simple para optimizar scroll handlers
  function throttle(fn, wait) {
    let time = Date.now();
    return function () {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  // Añade/quita clases de estado en el elemento de respuesta del formulario
  function showFormResponse(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('hidden', 'success', 'error');
    if (type === 'success') el.classList.add('success');
    else if (type === 'error') el.classList.add('error');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');

    // Toggle menú móvil
    if (toggle && nav) {
      toggle.addEventListener('click', () => nav.classList.toggle('show'));
    }

    // Marcar enlace activo en la cabecera (soporta file:// y servidor)
    function setActiveNavByPage() {
      const links = Array.from(document.querySelectorAll('.main-nav .nav-link'));
      if (!links.length) return;
      const page = window.location.pathname.split('/').pop() || 'index.html';

      links.forEach(a => {
        const href = a.getAttribute('href') || '';
        // Si el href es ancla local, lo dejamos para la lógica de scroll
        if (href.startsWith('#')) {
          a.classList.remove('active');
          return;
        }
        const hrefFile = href.split('/').pop() || '';
        if (hrefFile === page || (page === '' && hrefFile === 'index.html')) a.classList.add('active');
        else a.classList.remove('active');
      });
    }
    setActiveNavByPage();

    // Smooth scroll para enlaces internos (si existe el target en la misma página)
    Array.from(document.querySelectorAll('a[href^="#"]')).forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const sel = this.getAttribute('href');
        const target = document.querySelector(sel);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Cierra el menú móvil si estaba abierto
          if (nav && nav.classList.contains('show')) nav.classList.remove('show');
          // Si hay enlaces de cabecera a anclas, marcar el link (temporal)
          const headerLink = document.querySelector(`.main-nav .nav-link[href="${sel}"]`);
          if (headerLink) {
            document.querySelectorAll('.main-nav .nav-link').forEach(l => l.classList.remove('active'));
            headerLink.classList.add('active');
          }
        }
      });
    });

    // Si la página tiene sections con id, activar link según scroll (solo para vínculos internos)
    const pageSections = Array.from(document.querySelectorAll('section[id]'));
    const navAnchors = Array.from(document.querySelectorAll('.main-nav .nav-link[href^="#"]'));

    if (pageSections.length && navAnchors.length) {
      function setActiveOnScroll() {
        const offset = window.innerHeight * 0.35;
        let found = false;
        for (let sec of pageSections) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= 100) {
            // quitar active de todos los anchors internos y poner en el correspondiente
            navAnchors.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.main-nav .nav-link[href="#${sec.id}"]`);
            if (link) link.classList.add('active');
            found = true;
            break;
          }
        }
        if (!found) navAnchors.forEach(l => l.classList.remove('active'));
      }
      // Ejecutar una vez y luego con throttle
      setActiveOnScroll();
      window.addEventListener('scroll', throttle(setActiveOnScroll, 150));
    }

    // Manejo del formulario de contacto (único lugar: validación y respuesta visual)
    const form = document.getElementById('contact-form');
    const resp = document.getElementById('form-resp');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Tomamos los campos por id (mantener los ids en el HTML)
        const nombreEl = document.getElementById('nombre');
        const emailEl = document.getElementById('email');
        const mensajeEl = document.getElementById('mensaje');

        const nombre = nombreEl ? nombreEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const mensaje = mensajeEl ? mensajeEl.value.trim() : '';

        // Validación mínima
        if (!nombre || !mensaje || (emailEl && !email)) {
          showFormResponse(resp, 'Por favor completa todos los campos.', 'error');
          return;
        }

        // Simulación de envío (aquí podrías integrar fetch a un backend real)
        showFormResponse(resp, 'Mensaje enviado. ¡Gracias! Nos pondremos en contacto.', 'success');
        form.reset();
      });
    }
  });

})();
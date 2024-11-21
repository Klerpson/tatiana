---
layout: default
lang: en
ref: blog
title: "Este es blog de páginas web de Juli. ¡Léelo!"
description: "Este es mi blog personal. Te muestro cómo me gusta trabajar y la manera crear y mejorar páginas web que no vendían nada. Y cómo hacerlo para ti."
h1: "Bienvenido a mi blog personal donde te hablo de páginas web y SEO"
hero: "img/juli-desarrollador-web.webp"
alt: "Logo de Juli, desarrollador de páginas web y SEO"
---
## Estos son mis aprendizajes haciendo páginas web que sí producen resultados

Aquí te comparto investigaciones, experiencias, consejos, y más cositas que me encuentro en el camino de mi profesión como consultor SEO y desarrollador web:

<main>
  <div class="home_gallery">
    {% for principal in site.posts[en] %}
    <article class="flow">
      <img src="{{principal.hero}}" alt="{{principal.alt}}">
      <h3>{{principal.h1}}</h3>
      <p>{{principal.excerpt | truncate: 144}}</p>
      <p>👉 <a href="{{principal.url|relative_url}}">Leer más</a></p>
    </article>
    {% endfor %}
  </div>
  <br>
</main>
  
### PD. Abajo te invito a mi newsletter

Te comparto toda las experiencias y lecturas que me ayudan a avanzar y lograr grandes cosas haciendo SEO y páginas web a código.

[☕ Suscríbete a mi newsletter](#cta){:class="boton"}

  {% include cta.html %}
  {% include footer.html %}

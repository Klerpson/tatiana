---
layout: default
lang: es
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
    {% assign current_lang = page.lang | default: site.default_lang %}
    {% assign posts = site.posts | where: "lang", current_lang %}
    {% for post in posts limit:6 %}
    <article class="flow">
      <img src="{{ post.hero | relative_url }}" alt="{{ post.alt }}">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt | truncate: 144 }}</p>
      <p>👉 <a href="{{ post.url | relative_url }}">
        {% if current_lang == "en" %}Read more{% else %}Leer más{% endif %}
      </a></p>
    </article>
    {% endfor %}
  </div>
  <br>
</main>
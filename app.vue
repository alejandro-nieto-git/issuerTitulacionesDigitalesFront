<template>
  <head>
      <title>Emisor de Titulaciones Digitales</title>
  </head>

  <ul class="bg-blue-950 mb-2">
      <li class="text-6xl font-extrabold tracking-tight text-white text-pretty text-center mb-2"><a
              href="">Emisor de Titulaciones Digitales</a></li>

      <div class="flex flex-row justify-center items-center">
          <ULink to="/" active-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100" inactive-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100">
              Home 
          </ULink>
          <ULink to="/news" active-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100" inactive-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100">
              Noticias
          </ULink>
          <ULink to="mailto:alejandro.nieto.gallego0@gmail.com" active-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100" inactive-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100">
              Contacto
          </ULink>
          <ULink to="/about" active-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100" inactive-class="text-primary inline mr-10 font-bold mb-2 hover:text-primary-100">
              Sobre nosotros 
          </ULink>
      </div>
  </ul>

  <div>
    <NuxtPage />
  </div>
</template>

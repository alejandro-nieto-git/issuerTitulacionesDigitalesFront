<script setup lang="ts">
  const titulacionEmitida = JSON.parse(localStorage.getItem('titulacionEmitida')!)

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <p class="text-4xl mt-10 mb-10">Tu titulacion ha sido emitida con exito:</p>
        <p><pre>{{ JSON.stringify(titulacionEmitida, null, 2) }}</pre></p>


    </div>
</template>


<style scoped>
/* Your component's styles go here */
</style>
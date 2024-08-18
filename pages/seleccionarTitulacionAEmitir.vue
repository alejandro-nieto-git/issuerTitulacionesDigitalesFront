<script setup lang = ts>
import { ref } from 'vue'

//TODO: Aqui se debe llamar al backend para que consulte al endpoint de la UVa para obtener las titulaciones finalizadas del estudiante
const listaTitulacionesTerminadas = ref(
  [
    {
      'nombreTitulacion': 'Ingenieria Industrial',
      'tipo': 'Grado',
      'codigoTitulacion': '81639',
      'notaMedia': '6',
      'fechaHora': '1709153385',
      'decretoLey': 'a',
      'descripcionRegistroFisico': 'b',
    },
    {
      'nombreTitulacion': 'Filosofia',
      'tipo': 'Grado',
      'codigoTitulacion': '82639',
      'notaMedia': '5.9',
      'fechaHora': '1709153385',
      'decretoLey': 'a',
      'descripcionRegistroFisico': 'b',
    },
    {
      'nombreTitulacion': 'Ingenieria Informatica',
      'tipo': 'Grado',
      'codigoTitulacion': '83639',
      'notaMedia': '8.6',
      'fechaHora': '1709153385',
      'decretoLey': 'a',
      'descripcionRegistroFisico': 'b',
    },
  ]
)

/**
 * Stores the selected titulacion in the local storage.
 * 
 * @param {any} titulacion - The titulacion.
 */
function storeTitulacionAEmitir(titulacion: any) {
  localStorage.setItem('titulacionAEmitir', JSON.stringify(titulacion));
  console.log('Titulacion almacenada en localStorage');
  console.log(titulacion);
}

</script>

<template>
  <div class="flex flex-col justify-center items-center mt-10">
    <template v-for="titulacion in listaTitulacionesTerminadas" :key="titulacion.codigoTitulacion">
      <div class="flex flex-col mb-10 mt-10 size-auto">
        <UCard :ui="{
          base: '',
          background: 'bg-cyan-200',
          divide: 'divide-y divide-gray-300 dark:divide-gray-800',
          ring: 'ring-1 ring-gray-300 dark:ring-gray-800',
          rounded: 'rounded-2xl',
          shadow: 'shadow-lg',
          body: {
            base: '',
            background: '',
            padding: 'px-4 py-5 sm:p-6',
          },
          header: {
            base: '',
            background: '',
            padding: 'px-4 py-5 sm:px-6',
          },
          footer: {
            base: '',
            background: '',
            padding: 'px-4 py-4 sm:px-6',
          },
        }">
          <template #header>
            <div class="text-black text-xl font-bold">
              {{ titulacion.nombreTitulacion }}
            </div>
          </template>

          <div class="flex flex-row">
            Tipo: {{ titulacion.tipo }} <br>
            Codigo titulacion: {{ titulacion.codigoTitulacion }} <br>
            Nota media: {{ titulacion.notaMedia }} <br>
            <UButton class="mt-4 ml-96 self-center" icon="i-heroicons-academic-cap-20-solid" size="xl"
              to="/emitirTitulacion" @click="storeTitulacionAEmitir(titulacion)">Solicitar emision</UButton>


          </div>
        </UCard>
      </div>
    </template>

  </div>
</template>
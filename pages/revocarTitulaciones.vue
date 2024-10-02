<template>
  <div class="issued-titulaciones-manager">
    <UTable :rows="preProcessedTitulacionCredentials" :columns="fields">
      <template #credentialSubject.hasTitulacion.revocada-data="{ row }">
        <div v-if="row.credentialSubject.hasTitulacion.revocada">
          <span>Revocada</span>
        </div>
        <div v-else>
          <UToggle
            :modelValue="row.credentialSubject.hasTitulacion.revoking"
            @update:modelValue="() => toggleRevocation(row)" 
          />
        </div>
      </template>
      <template #actions-data="{ row }">
        <UButton 
          @click="() => confirmRevoke(row)" 
          color="red" 
          :disabled="!row.credentialSubject.hasTitulacion.revoking"
        >
          Revocar
        </UButton>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TitulacionCredential } from "../titulacion-digital-model/src/model/titulacion";
import axios from 'axios';



const titulacionCredentials = ref<TitulacionCredential[]>([]);
let preProcessedTitulacionCredentials = ref<any[]>([]);

const fields = [
  { key: 'credentialSubject.hasTitulacion.codigoTitulacion', label: 'Código titulacion', sortable: false },
  { key: 'credentialSubject.nombre', label: 'Nombre' },
  { key: 'credentialSubject.apellido1', label: 'Primer Apellido' },
  { key: 'credentialSubject.apellido2', label: 'Segundo Apellido' },
  { key: 'issuanceDate', label: 'Fecha de Emisión' },
  { key: 'credentialSubject.hasTitulacion.revocada', label: 'Revocada'},
  { key: 'actions', label: 'Acciones', sortable: false },
];

async function fetchTitulacionCredentials() {
  titulacionCredentials.value = (await axios.get(import.meta.env.VITE_ISSUER_URI + "/titulaciones")).data;
  preProcessedTitulacionCredentials.value = preprocessTitulacionCredentials(titulacionCredentials.value);
  console.log("Fetch titulaciones", titulacionCredentials.value);
}

function toggleRevocation(titulacion: any) {
  titulacion.credentialSubject.hasTitulacion.revoking = !titulacion.credentialSubject.hasTitulacion.revoking;
  console.log("Revoking switched to", titulacion.credentialSubject.hasTitulacion.revoking);
}

async function saveTitulacionCredential(titulacion: TitulacionCredential) {
  let titulacionId = titulacion._id;
  delete titulacion._id;
  await axios.put(import.meta.env.VITE_ISSUER_URI + "/titulaciones/" + titulacionId, titulacion);
  console.log("Titulacion saved", titulacion);
}


async function revokeTitulacionCredential(titulacion: TitulacionCredential) {
  let titulacionId = titulacion._id;
  delete titulacion._id;
  await axios.put(import.meta.env.VITE_ISSUER_URI + "/titulaciones/" + titulacionId, titulacion);
  console.log("Titulacion saved", titulacion);
}


async function confirmRevoke(titulacion: any) {
  const nombre = titulacion.credentialSubject.nombre;
  const apellido1 = titulacion.credentialSubject.apellido1;
  if (confirm(`¿Está seguro que desea revocar la titulación para ${nombre} ${apellido1}?`)) {
    let revokedTitulacion = (await axios.get(import.meta.env.VITE_ISSUER_URI + "/titulaciones/" + titulacion._id)).data;
    console.log("Revoking", revokedTitulacion);
    revokedTitulacion.credentialSubject.hasTitulacion.display[0].revocada = true;
    console.log("Revoke confirmed", revokedTitulacion);
    saveTitulacionCredential(revokedTitulacion);
    axios.delete(import.meta.env.VITE_ISSUER_URI + "/titulaciones/" + titulacion._id);
  }
}

function preprocessTitulacionCredentials(credentials: TitulacionCredential[]) {
  return credentials.map(credential => ({
    ...credential,
    credentialSubject: {
      ...credential.credentialSubject,
      nif: credential.credentialSubject.nif.display[0].nif,
      nombre: credential.credentialSubject.nombre.display[0].nombre,
      apellido1: credential.credentialSubject.apellido1.display[0].apellido1,
      apellido2: credential.credentialSubject.apellido2.display[0].apellido2,
      fechaNacimiento: credential.credentialSubject.fechaNacimiento.display[0].fechaNacimiento,
      hasTitulacion: {
        ...credential.credentialSubject.hasTitulacion.display[0],
      },
    },
  }));
}


onMounted(fetchTitulacionCredentials);
</script>

<style scoped>
.issued-titulaciones-manager {
  padding: 20px;
}
</style>

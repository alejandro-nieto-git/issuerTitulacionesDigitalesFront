<template>
  <div class="issued-titulaciones-manager">
    <h1>Administrar titulaciones emitidas</h1>
    <nuxt-table :items="issuedTitulaciones" :fields="fields">
      <template #cell(revocada)="props">
        <nuxt-switch v-model="props.item.credential.credentialSubject.hasTitulacion.display[0].revocada" @update:modelValue="toggleRevocation(props.item)" />
      </template>
      <template #cell(actions)="props">
        <nuxt-button @click="confirmRevoke(props.item)" color="red">Revocar</nuxt-button>
      </template>
    </nuxt-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from '@nuxtjs/composition-api';
import { useFetch } from '@nuxt/ui';

// State
const issuedTitulaciones = ref([]);

// Table fields
const fields = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellido1', label: 'Primer Apellido' },
  { key: 'apellido2', label: 'Segundo Apellido' },
  { key: 'issuanceDate', label: 'Fecha de Emisión' },
  { key: 'revocada', label: 'Revocada', sortable: true },
  { key: 'actions', label: 'Acciones', sortable: false },
];

async function fetchIssuedTitulaciones() {
//TODO: get issued titulaciones from the database by calling an issuer endpoint


  issuedTitulaciones.value = [
  // Mock issued titulaciones data as Verifiable Credentials
  {
    credential: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["TitulacionDigital"],
      "issuer": "did:ethr:89bd0B47C4302435aA1bb2f621a447c34420B195",
      "issuanceDate": "2024-08-17T22:01:26.996Z",
      "credentialSubject": {
        "nif": { "display": [{ "nif": "12345678A" }] },
        "nombre": { "display": [{ "nombre": "Juan" }] },
        "apellido1": { "display": [{ "apellido1": "Perez" }] },
        "apellido2": { "display": [{ "apellido2": "Gomez" }] },
        "fechaNacimiento": { "display": [{ "fechaNacimiento": "1990-01-01" }] },
        "hasTitulacion": {
          "display": [{
            "codigoTitulacion": "83639",
            "nombreTitulacion": "Ingeniería Informática",
            "tipo": "Grado",
            "promocion": "2017",
            "notaMedia": "8.6",
            "fechaHoraEmision": "2021-07-12T12:00:00Z",
            "revocada": false,
            "decretoLey": "Real Decreto 123/2017",
            "descripcionRegistroFisico": "Registro Físico"
          }]
        },
        "id": "did:ethr:DE19d461d3E3Fc360D392B512fa09aBcB6A3cba3"
      }
    }
  }
];
}


function toggleRevocation(titulacion) {

}

async function saveIssuedTitulacion(titulacion) {
    //TODO: save the updated titulacion to the database by calling an issuer endpoint
}

function confirmRevoke(titulacion) {
  const nombre = titulacion.credential.credentialSubject.nombre.display[0].nombre;
  const apellido1 = titulacion.credential.credentialSubject.apellido1.display[0].apellido1;
  if (confirm(`¿Está seguro que desea revocar la titulación para ${nombre} ${apellido1}?`)) {
    titulacion.credential.credentialSubject.hasTitulacion.display[0].revocada = true;
    saveIssuedTitulacion(titulacion);
  }
}

onMounted(fetchIssuedTitulaciones);
</script>

<style scoped>
.issued-titulaciones-manager {
  padding: 20px;
}
</style>

<template>
  <div class="issued-titulaciones-manager">
    <UTable :rows="titulacionCredentials" :columns="fields">
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

interface HasTitulacion {
  codigoTitulacion: string;
  nombreTitulacion: string;
  tipo: string;
  promocion: string;
  notaMedia: string;
  fechaHoraEmision: string;
  revocada: boolean;
  revoking?: boolean;
  decretoLey: string;
  descripcionRegistroFisico: string;
}

interface CredentialSubject {
  id: string;
  nif: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string;
  hasTitulacion: HasTitulacion;
}

interface TitulacionCredential {
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: CredentialSubject;
}

const titulacionCredentials = ref<TitulacionCredential[]>([]);

const fields = [
  { key: 'credentialSubject.nombre', label: 'Nombre' },
  { key: 'credentialSubject.apellido1', label: 'Primer Apellido' },
  { key: 'credentialSubject.apellido2', label: 'Segundo Apellido' },
  { key: 'issuanceDate', label: 'Fecha de Emisión' },
  { key: 'credentialSubject.hasTitulacion.revocada', label: 'Revocada'},
  { key: 'actions', label: 'Acciones', sortable: false },
];

async function fetchTitulacionCredentials() {
  //TODO: get issued titulaciones from the database by calling an issuer endpoint
  const rawData = [
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

  titulacionCredentials.value = rawData.map(item => ({
      type: item.credential.type,
      issuer: item.credential.issuer,
      issuanceDate: item.credential.issuanceDate,
      credentialSubject: {
        id: item.credential.credentialSubject.id,
        nif: item.credential.credentialSubject.nif.display[0].nif,
        nombre: item.credential.credentialSubject.nombre.display[0].nombre,
        apellido1: item.credential.credentialSubject.apellido1.display[0].apellido1,
        apellido2: item.credential.credentialSubject.apellido2.display[0].apellido2,
        fechaNacimiento: item.credential.credentialSubject.fechaNacimiento.display[0].fechaNacimiento,
        hasTitulacion: {
          codigoTitulacion: item.credential.credentialSubject.hasTitulacion.display[0].codigoTitulacion,
          nombreTitulacion: item.credential.credentialSubject.hasTitulacion.display[0].nombreTitulacion,
          tipo: item.credential.credentialSubject.hasTitulacion.display[0].tipo,
          promocion: item.credential.credentialSubject.hasTitulacion.display[0].promocion,
          notaMedia: item.credential.credentialSubject.hasTitulacion.display[0].notaMedia,
          fechaHoraEmision: item.credential.credentialSubject.hasTitulacion.display[0].fechaHoraEmision,
          revocada: item.credential.credentialSubject.hasTitulacion.display[0].revocada,
          decretoLey: item.credential.credentialSubject.hasTitulacion.display[0].decretoLey,
          descripcionRegistroFisico: item.credential.credentialSubject.hasTitulacion.display[0].descripcionRegistroFisico,
        }
      }
  }));
  console.log("Fetch titulaciones", titulacionCredentials.value);
}

function toggleRevocation(titulacion: TitulacionCredential) {
  titulacion.credentialSubject.hasTitulacion.revoking = !titulacion.credentialSubject.hasTitulacion.revoking;
  console.log("Revoking switched to", titulacion.credentialSubject.hasTitulacion.revoking);
}

async function saveTitulacionCredential(titulacion: TitulacionCredential) {
  // TODO: Save the updated titulacion to the database by calling an issuer endpoint
  console.log("Titulacion saved", titulacion);
}

function confirmRevoke(titulacion: TitulacionCredential) {
  const nombre = titulacion.credentialSubject.nombre;
  const apellido1 = titulacion.credentialSubject.apellido1;
  if (confirm(`¿Está seguro que desea revocar la titulación para ${nombre} ${apellido1}?`)) {
    titulacion.credentialSubject.hasTitulacion.revocada = true;
    console.log("Revoke confirmed", titulacion);
    delete titulacion.credentialSubject.hasTitulacion.revoking;
    saveTitulacionCredential(titulacion);
  }
}

onMounted(fetchTitulacionCredentials);
</script>

<style scoped>
.issued-titulaciones-manager {
  padding: 20px;
}
</style>

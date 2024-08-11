<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import QRCode from 'qrcode';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

const router = useRouter();

  const titulacionAEmitir = JSON.parse(localStorage.getItem('titulacionAEmitir')!)

  let qrCodeUrl = ref<string>('');
  let uri = '';
  let pin = '';
  const isDataReady = ref<boolean>(false);

  // Function to make the POST request and generate the QR code
  const generateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:9000/credentialOfferTitulacionDigital', {
        preAuthorizedCode: '1234',
        idTitulacionAEmitir: '83639'
      });

      uri = response.data.uri;
      pin = response.data.pin;
      qrCodeUrl.value = await QRCode.toDataURL(uri);
      isDataReady.value = true;
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const emitirTitulacion = async () => {
    try {
      await axios.post('http://localhost:8082/initiateIssuance', {
        oidcURI: uri
      });

      await axios.post('http://localhost:8082/tokenRequest', {
        pin: pin
      });

      let issuanceResponse = await axios.post('http://localhost:8082/credentialRequest');

      console.log('Titulacion emitted successfully');

      let titulacion = issuanceResponse.data.credential;
      localStorage.setItem('titulacionEmitida', JSON.stringify(titulacion));
      console.log('Titulacion emitida almacenada en localStorage');
      console.log(titulacion);
      router.push('/emisionFinalizada');

    } catch (error) {
      console.error('Error emitting titulacion:', error);
    }
  };

  onMounted(generateQRCode);
</script>

<template>
  <!-- Only render if titulacionAEmitir is defined -->
  <div v-if="titulacionAEmitir" class="flex flex-col justify-center items-center text-lg light:text-black text-xl">
    <p class="text-4xl mt-10">Se va a emitir tu titulacion "{{ titulacionAEmitir.tipo }} en {{ titulacionAEmitir.nombreTitulacion }}"</p>

    <UButton class="mb-16 mt-28" icon="i-fa6-regular-address-card" size="xl" :disabled="!isDataReady" @click="emitirTitulacion()">Emitir</UButton>

    o escanea con tu wallet

    <img :src="qrCodeUrl" alt="QR Login EUDI Wallet" class="w-36 h-34 mb-24 mt-16">
  </div>

  <!-- Fallback content if titulacionAEmitir is not found -->
  <div v-else class="flex justify-center items-center text-lg light:text-black text-xl">
    <p class="text-4xl mt-10">No se encontró la titulación para emitir. Por favor, regresa y selecciona una titulación.</p>
  </div>
</template>
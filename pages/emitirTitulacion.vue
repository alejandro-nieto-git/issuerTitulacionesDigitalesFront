<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import QRCode from 'qrcode';
  import axios from 'axios';

  const titulacionAEmitir = JSON.parse(localStorage.getItem('titulacionAEmitir')!)

  let qrCodeUrl = '';
  let uri = '';
  let pin = '';

  // Function to make the POST request and generate the QR code
  const generateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:9000/credentialOfferTitulacionDigital', {
        preAuthorizedCode: '1234',
        idTitulacionAEmitir: '83639'
      });

      uri = response.data.uri;
      pin = response.data.pin;
      qrCodeUrl = await QRCode.toDataURL(uri);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const emitirTitulacion = async () => {
    try {
      await axios.post('https://localhost:8082/initiateIssuance', {
        oidcURI: uri
      });

      await axios.post('https://localhost:8082/tokenRequest', {
        pin: pin
      });

      await axios.post('https://localhost:8082/credentialRequest');

      console.log('Titulacion emitted successfully');
    } catch (error) {
      console.error('Error emitting titulacion:', error);
    }
  };

  onMounted(generateQRCode);
</script>

<template>
        <div class="flex flex-col justify-center items-center text-lg light:text-black text-xl">
            <p class="text-4xl mt-10">Se va a emitir tu titulacion "{{ titulacionAEmitir.tipo }} en {{ titulacionAEmitir.nombreTitulacion }}"</p>

            <UButton class="mb-16 mt-28" icon="i-fa6-regular-address-card" size="xl" @click="emitirTitulacion()">Emitir </UButton>

            o escanea con tu wallet

            <img :src="qrCodeUrl" alt="QR Login EUDI Wallet" class="w-36 h-34 mb-24 mt-16">
        </div>
</template>
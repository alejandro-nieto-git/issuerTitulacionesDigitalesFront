<script setup lang="ts">
  const titulacionAEmitir = JSON.parse(localStorage.getItem('titulacionAEmitir')!)
</script>

<template>
        <div class="flex flex-row justify-center items-center">
        <div class="flex flex-col justify-center items-center text-lg light:text-black text-xl">
            <p>Se va a emitir tu titulacion {{ titulacionAEmitir.tipo }} en {{ titulacionAEmitir.nombreTitulacion }}</p>

            <UButton class="mb-10" icon="i-fa6-regular-address-card" size="xl" @click="selectUserType = true">Emitir </UButton>

            <UModal v-model="selectUserType">
                <div class="flex flex-col p-4 justify-center items-center">
                    <UButton class="mt-4 mb-10 mt-10" icon="i-heroicons-academic-cap-20-solid" size="xl" to="/seleccionarTitulacionAEmitir">Estudiante</UButton>
                    <UButton class="mb-10" icon="i-pajamas-admin" size="xl" to="/revocarTitulaciones">Encargado</UButton>
                </div>
            </UModal>

            o escanea con tu wallet

            <img src="/QRLoginEUDIWallet.png" alt="QR Login EUDI Wallet" class="w-36 h-34 mb-24 mt-10">
        </div>
        </div>
</template>
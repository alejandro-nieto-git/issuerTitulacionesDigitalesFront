<script setup lang="ts">
    const selectUserType = ref(false)
</script>

<template>

    <div class="bg-blue-940">
        <div class="flex flex-col justify-center items-center text-lg light:text-black text-xl">
            <img src="/escudouva.png" alt="Logo Universidad de Valladolid" class="w-96 h-94 mb-20 mt-20">

            <UButton class="mb-10" icon="i-fa6-regular-address-card" size="xl" @click="selectUserType = true">Login con EUDIWallet</UButton>

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

<script>
</script>
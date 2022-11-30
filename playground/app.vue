<script setup lang="ts">
import { useCookie } from '#app'

useCookie('XSRF-TOKEN').value = 'test'
$fetch('/api/auth/login', { method: 'POST' })

</script>

<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<template>
  <div class="w-full max-w-screen-sm" v-if="history.length">
    <div
      class="w-4/5 bg-gray-100 rounded-md shadow-md mt-6 p-4 ml-auto mr-auto block"
      v-for="(message, index) in history" :key="index"
    >
      {{ message }}
    </div>
    <div class="h-2/4 mt-40 w-full max-w-screen-sm bg-teal-500">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'MessagesComponent',
  props: {
    history: Array
  }
}
</script>
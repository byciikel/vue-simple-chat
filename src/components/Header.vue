<template>
  <div class="w-full max-w-screen-sm bg-teal-500">
    <div class="pt-6">
      <h1 class="text-2xl text-center text-white">Simple Message App</h1>
    </div>
    <div class="text-center pt-2 pb-6">
      <div
        class="p-2 bg-teal-800 items-center text-indigo-100 leading-none rounded-full flex inline-flex cursor-pointer"
        role="alert"
        @click="$emit('load-history')"
      >
        <span class="flex rounded-full bg-teal-500 uppercase px-2 py-1 text-xs font-bold mr-3">History</span>
        <span class="font-semibold mr-2 text-left flex-auto">Load previous message</span>
        <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>
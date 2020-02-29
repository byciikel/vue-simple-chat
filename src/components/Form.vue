<template>
  <form 
    @submit.prevent="onSendClicked"
    class="w-full max-w-screen-sm fixed bottom-0 p-6 bg-white"
  >
    <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Type a message..."
        aria-label="message"
        v-model="message"
      />
      <button
        class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        @click="onSendClicked"
      >
        Send
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormComponent',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    onSendClicked() {
      this.$emit('send-message', this.message)
      this.message = ''
    }
  },
}
</script>
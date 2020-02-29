<template>
  <div class="flex justify-center flex-wrap content-center">
    <div class="w-full max-w-screen-sm bg-teal-500">
      <div class="pt-6 justify-center content-center">
        <h1 class="text-2xl text-center text-white">Simple Message App</h1>
      </div>
      <div class="text-center pt-2 pb-6">
        <div
          class="p-2 bg-teal-800 items-center text-indigo-100 leading-none rounded-full flex inline-flex cursor-pointer"
          role="alert"
          @click="loadHistory"
        >
          <span class="flex rounded-full bg-teal-500 uppercase px-2 py-1 text-xs font-bold mr-3">History</span>
          <span class="font-semibold mr-2 text-left flex-auto">Load previous message</span>
          <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
        </div>
      </div>
    </div>

    <div
      class="w-3/5 bg-gray-100 rounded-md shadow-md mt-6 p-4"
      v-for="(message, index) in history" :key="index"
    >
      {{ message }}
    </div>

    <div class="h-2/4 mt-40 w-full max-w-screen-sm bg-teal-500">&nbsp;</div>

    <form class="w-full max-w-screen-sm fixed bottom-0 p-6 bg-white">
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
          @click="sendMessage"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      history: []
    }
  },
  channels: {
    ChatChannel: {
      connected() {
        console.log('Socket connected.');
      },
      received(data) {
        console.log(data)
        if (data.type === 'history') {
          this.history = data.message
        } else if (data.type === 'create') {
          this.history.push(data.message.message)
        }
      },
    }
  },
  mounted() {
    this.$cable.subscribe({
      channel: 'ChatChannel',
    })
  },
  methods: {
    sendMessage() {
      this.$cable.perform({
        channel: 'ChatChannel',
        action: 'create',
        data: {
          message: this.message
        }
      })
      this.message = ''
    },
    loadHistory() {
      this.$cable.perform({
        channel: 'ChatChannel',
        action: 'history'
      })
    }
  },
}
</script>
<template>
  <div class="flex justify-center flex-wrap content-center">
    <Header @load-history="loadHistory" />
    <Messages :history="history" />

    <form 
      @submit.prevent="sendMessage"
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
          @click="sendMessage"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Messages from './components/Messages.vue'

export default {
  name: 'Chat',
  components: {
    Header,
    Messages
  },
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
      if (this.message)
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
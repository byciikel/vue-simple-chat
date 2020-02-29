<template>
  <div id="container">
    <h1>Chat Room</h1>
    <div id="chat-logs"></div>
    <input type="text" placeholder="type something..." v-model="message" />
    <button @click="sendMessage">Send</button>
    <button @click="loadHistory">Load</button>
    <div>{{ history }}</div>
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
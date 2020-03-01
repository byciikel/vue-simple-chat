<template>
  <div class="flex justify-center flex-wrap content-center">
    <Header @load-history="loadHistory" />
    <Messages :history="history" />
    <Form @send-message="sendMessage($event)" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Messages from './components/Messages.vue'
import Form from './components/Form.vue'

export default {
  name: 'Chat',
  components: {
    Header,
    Messages,
    Form
  },
  data() {
    return {
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
  created() {
    document.title = 'Simple Message App'
  },
  methods: {
    sendMessage(content) {
      if (content)
      this.$cable.perform({
        channel: 'ChatChannel',
        action: 'create',
        data: {
          message: content
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
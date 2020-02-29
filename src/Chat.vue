<template>
  <div id="container">
    <h1>Chat Room</h1>
    <div id="chat-logs"></div>
    <input type="text" placeholder="type something..." />
    <button>Send</button>
  </div>
</template>

<script>
import Cable from 'actioncable'

let cable = Cable.createConsumer('http://api-rails-chat.herokuapp.com/cable');
let createSocket = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      initialize: function() {},
      connected: function() {},
      received: (data) => {
        console.log(data)
      },
      create: function(chatContent) {
        this.perform('create', {
          message: chatContent
        });
      },
      history: function() {
        return this.perform('history')
      }
    });
  
export default {
  created() {
  },
}
</script>
<template>
  <div>
    <p>Check socket status in Vue devtools...</p>
    <p>
      {{ message }}
    </p>
    <input v-model="text" />
    <button @click="send">SEND</button>
  </div>
</template>

<script setup>

import io from "socket.io-client";
 const { $socket } = useNuxtApp();
const message = ref("");
const text = ref("");
let socket;
function send() {
  console.log(text.value);
  socket.emit("message", text.value);
}



onMounted(() => {
  socket = io("http://localhost:3000/");

  socket.on("message", (data) => {
    console.log(data.nickname+ "<<<<");
    message.value = data;
  });

  //level 1
  socket.on('user connected', (data) => {
    console.log(data.message);
  });
  socket.on('user disconnected', (data) => {
    console.log(data.message);
  });

  //level2
  socket.on('new message', (data) => {
    console.log(`${data.nickname}: ${data.message}`);
  });

  const nickname = prompt('Choose a nickname:');
  socket.emit('set nickname', nickname);
  
});

//level 4

</script>

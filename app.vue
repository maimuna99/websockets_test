<template>
  <div>
    <p>Check socket status in Vue devtools...</p>
    <p>
      
    </p>
    <input v-model="text" @focus="typing" />
    <button @click="send" >SEND</button>
  </div>
  <div>
  <p>
    massage:{{ txt }}
  </p>
  </div>
</template>

<script setup>

import io from "socket.io-client";

const message = ref("");
const txt = ref("...");
const text = ref("");
const flag = ref(true)
const nickname = prompt('Choose a nickname:');

let socket;
function send() {
  //console.log(text.value);
  socket.emit("message", (nickname + text.value));
}
function typing(){
  
  socket.emit("message", (nickname + ": typing..."));
}
function stoptyping(){
  socket.emit("message", "I am typing...");
  flag =false;
}

onMounted(() => {
  socket = io("ws://localhost:3000/");
  socket.nickname= nickname;
  socket.on("Welcome",(data)=>{ 
    console.log(data)
  })
   socket.on("message", (data) => {
    console.log(data)
     txt.value +=  data;
     
   });

  // //level 1
  // socket.on('user connected', (data) => {
  //   console.log(data.message);
  // });
  // socket.on('user disconnected', (data) => {
  //   console.log(data.message);
  // });

  // //level2
  // socket.on('new message', (data) => {
  //   txt.value += data.message; 
  //   console.log('${data.nickname}: ${data.message}');
  // });



   
  
});

//level 4

</script>

<script setup>
import {ref} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  subscribed: {
    type: Number,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
});

const htmlContent = ref(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Embedded Content</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        background-color: #2b2a2a;
        height: 100vh;
        width: 100vw;
      }
      ${props.css}
    </style>
  </head>
  <body>
    <div>
      ${props.html}
    </div>
  </body>
  </html>
`);
</script>

<template>
  <div class="card-container">
    <iframe class="card" :srcdoc="htmlContent">

    </iframe>
    <div class="card-title">
      <div class="card-name">
        {{name}}
      </div>
      <div class="card-subs">
        subs: {{ subscribed }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  height: 15rem;
  width: 18rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.card {
  border-radius: 1.2rem;
  border: none;
  flex-grow: 1;
}

.card-title {
  padding: 0.4rem 0.8rem 0 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card-name {
  color: white;
  font-size: 0.9rem;
}

.card-subs {
  color: white;
  font-size: 0.8rem;
}
</style>
<script setup>
import NavBar from "@/components/NavigationBar.vue"
import CodeDisplay from "@/components/CodeDisplay.vue";
import {cssCategories} from "@/constants.js";
import {ref} from "vue";

const name = ref(null);
const type = ref(null);

const html = ref('');
const css = ref('');

function submit() {
  fetch('/api/css', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: 0,
      password_hashed: Array(64).fill('0').join(''),
      name: name.value.value,
      category: type.value.value,
      html: html.value,
      css: css.value,
    })
  }).then(res => console.log(res));
}
</script>

<template>
  <NavBar />
  <div class="main">
    <div class="float">
      <div>
        <label>Name</label>
        <input class="input" ref="name"/>
      </div>
      <div class="submit-btn" @click="submit()">submit</div>
      <div>
        <label>Type</label>
        <select class="input" ref="type">
          <option v-for="cate in cssCategories">{{cate}}</option>
        </select>
      </div>
    </div>
    <CodeDisplay style="height: 80vh; margin: 2.5rem auto 0 auto; max-width: 2000px;" :html="html" :css="css"/>
  </div>
</template>

<style scoped>
.main {
  padding: 0 2rem;
}

.float {
  background-color: #2b2a28;
  display: flex;
  flex-direction: row;
  padding: 0 5rem;
  border-radius: 2rem;
  height: 5rem;
  max-width: 2000px;
  margin: 2rem auto;
  align-items: center;
  justify-content: space-between;
}

.float>div>label {
  font-size: 1.2rem;
  color: white;
  margin: 0 2rem 0 0;
  font-weight: bold;
}
.float>div>input, .float>div>select {
  height: 3rem;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  padding: 0.5rem 1.3rem;
}

.submit-btn {
  font-size: 1.2rem;
  background-color: #1ac8db;
  padding: 1rem;
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
}
</style>
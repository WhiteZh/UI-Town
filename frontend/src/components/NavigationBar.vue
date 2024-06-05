<script setup>
import Login from "@/components/Login.vue"
import {ref} from "vue";

let openLogin = ref(false)

</script>

<template>
  <div class="outer-login" v-if="openLogin" @click="openLogin = !openLogin"></div>
  <Login v-if="openLogin" style="z-index: 1"/>
  <div class="navbar" id="navbar">
    <a class="home-title no-link-style" href="/">UITOWN</a>
    <a href="#" class="no-link-style navbar-element">Information</a>
    <a href="#" class="no-link-style navbar-element">Recommendation</a>
    <span style="flex-grow: 1"></span>
    <a href="#" class="no-link-style navbar-option" style="background-color: #1ac8db" @click="openLogin = !openLogin">Join in the Town</a>
    <a href="#" class="no-link-style navbar-option" style="background-color: #99dfec">Create</a>
  </div>

</template>

<style scoped>
.outer-login {
  z-index: 1;
  position: absolute;
  height: 100vh;
  width: 100vw;
  opacity: 0.3;
  background-color: black;
}

.navbar {
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.home-title {
  font-size: 2.5rem;
  color: white;
  margin-right: 2rem;
  font-family: "Zhi Mang Xing",serif;
}
.home-title:hover {
  color: whitesmoke;
}

.navbar-element {
  color: white;
  font-size: 0.8rem;
  font-family: "Cooljazz",serif;
  font-style: italic;
  padding-bottom: 0.3rem;
  margin-right: 1.8rem;
}
.navbar-element:hover {
  color: whitesmoke;
}

.navbar-option {
  font-size: 0.8rem;
  align-self: center;
  margin: 0 0.5rem 0 0.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: 1rem;
  color: black;
  font-weight: bold;
}
</style>
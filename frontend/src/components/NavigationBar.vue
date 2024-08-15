<script setup lang="ts">
import Login from "@/components/Login.vue"
import {computed, inject, Ref, ref} from "vue";
import { RouterLink } from "vue-router";
import {User} from "@/constants";
import {user} from "@/globs";

let openLogin = ref(false);
</script>

<template>
  <div class="outer-login" v-if="openLogin" @click="openLogin = !openLogin"></div>
  <Teleport to="#app">
    <Login v-if="openLogin" style="z-index: 1" v-on:login="(v) => openLogin = v ? false : openLogin"/>
  </Teleport>
  <div class="navbar" id="navbar">
    <RouterLink class="home-title no-link-style" to="/"><img src="@/assets/logo.png" alt="UITOWN"/></RouterLink>
    <a href="#" class="no-link-style navbar-element">Information</a>
    <a href="#" class="no-link-style navbar-element">Recommendation</a>
    <span style="flex-grow: 1"></span>
    <a href='#' class="no-link-style navbar-option" style="background-color: #1ac8db" @click.prevent="openLogin = !openLogin" v-if="!user">Join in the Town</a>
    <div v-if="user" style="background-color: whitesmoke; align-self: center; height: 2.2rem; width: 2.2rem; position: relative; border-radius: 1.1rem; margin: 0 0.5rem;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); cursor: pointer;" @click="() => $router.push({name: 'user'})">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg>
    </div>
    <RouterLink :to="{name: 'create'}" class="no-link-style navbar-option" style="background-color: #99dfec">Create</RouterLink>
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

.home-title>img {
  height: 3rem;
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
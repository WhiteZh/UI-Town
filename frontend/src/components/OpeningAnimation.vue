<script setup>
import {onMounted, ref} from "vue";

let openingVisible = ref(false);
let bodyVisible = ref(false);
let openingExist = ref(true);

onMounted(() => {
  setTimeout(() => openingVisible.value = true, 1);
  setTimeout(() => { openingVisible.value = false; bodyVisible.value = true }, 1200);
  setTimeout(() => openingExist.value = false, 2100);
});
</script>

<template>
  <div class="container" v-if="openingExist" :style="{ opacity: bodyVisible ? '0' : '1' }">
    <div :style="{ opacity: openingVisible ? '1' : '0' }" class="openingElement" style="top: 25vh; font-size: 30vh;">
      New design
    </div>
    <div :style="{ opacity: openingVisible ? '1' : '0' }" class="openingElement" style="bottom: 25vh; transition-delay: 0.1s; transition-duration: 0.5s; font-size: 8vh;">
      From UI Town
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  transition-property: opacity;
  transition-duration: 0.4s;
  transition-delay: 0.6s;
  transition-timing-function: linear;
  background: linear-gradient(135deg, black, #737373);
}

.openingElement {
  z-index: 1000;
  position: absolute;
  text-align: center;
  transition-property: opacity;
  transition-duration: 0.6s;
  transition-timing-function: linear;
  color: white;
  width: 100%;
  font-family: Amsterdam, serif;
}
</style>
<script setup lang="ts">

import NavigationBar from "@/components/NavigationBar.vue";
import OpeningAnimation from "@/components/browse/OpeningAnimation.vue";
import {playedOA} from "@/globs";


let displayOA = !playedOA.value;
playedOA.value = true;
</script>

<template>
  <OpeningAnimation v-if="displayOA"/>
  <NavigationBar/>
  <div class="container">
    <div class="house-of-ui-img"></div>
    <div class="uihouse-side">
      <h5>HI I'M UI-TOWN</h5>
      <h1>A town of UI which brings your design to life.</h1>
      <h4>"At UI-town, we offer a vast array of CSS and JS animations to elevate your web projects. Our dynamic animations and interactive effects make your user interfaces not just functional but truly captivating."</h4>
      <RouterLink :to="{name: 'browse'}" class="no-link-style router-link">Enter</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 8rem auto 0 auto;
  max-width: 1550px;
  min-width: 945px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  color: white;
}

.house-of-ui-img {
  height: 45rem;
  background: url("@/assets/house_of_ui.png") no-repeat;
  background-size: auto 100%;
  background-position-x: center;
  border-radius: 15px;
  flex-grow: 1;
  min-width: 490px;
}

.uihouse-side {
  max-width: 48rem;
  padding: 0 2.5rem 0 2.5rem;
}
.uihouse-side>h5 {
  font-weight: lighter;
  letter-spacing: 0.1rem;
  margin-top: 3rem;
}
.uihouse-side>h1 {
  font-weight: lighter;
  font-size: 4.5rem;
  text-align: left;
  color: #D0C3F1;
}
.uihouse-side>h4 {
  font-weight: lighter;
  letter-spacing: 0.1rem;
  line-height: 2.2rem;
  font-size: 1.2rem;
  max-width: 30rem;
  padding-left: 5px;
  font-family: "Cooljazz", serif;
}
.uihouse-side>.router-link {
  width: 10rem;
  margin-top: 0.5rem;
  padding: 1rem 0;
  text-align: center;
  border-radius: 2rem;
  display: inline-block;
  background-color: #D0C3F1;
}
.uihouse-side>.router-link:hover {
  color: white;
}
</style>
<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
import DropDown from "@/components/browse/DropDown.vue";
import DisplayMenu from "@/components/browse/DisplayMenu.vue";
import OpeningAnimation from "@/components/browse/OpeningAnimation.vue";
import {playedOA} from "@/globs";

let CSS_attribute = ref([
  {name: 'Buttons', url: '/', colors: ['#8c52ff', '#ff914d']},
  {name: 'Checkboxes', url: '/', colors: ['#ff5757', '#8c52ff']},
  {name: 'Toggle Switches', url: '/', colors: ['#8c52ff', '#5ce1e6']},
  {name: 'Loads', url: '/', colors: ['#8c52ff', '#00bf63']},
  {name: 'Cards', url: '/', colors: ['#5170ff', '#ff66c4']},
  {name: 'Inputs', url: '/', colors: ['#5de0e6', '#004aad']},
  {name: 'Transitions', url:'/', colors: ['#004add', '#cb6ce6']},
  {name: 'Special Effects', url: '/', colors: ['#0097b2', '#7ed957']}
]);
let JS_attribute = ref([
  {name: 'Mouse Effect', url: '/', colors: ['#8c52ff', '#ff914d']},
  {name: 'Background', url: '/', colors: ['#ff5757', '#8c52ff']},
  {name: 'Menu', url: '/', colors: ['#8c52ff', '#5ce1e6']},
  {name: 'Visible Chart', url: '/', colors: ['#8c52ff', '#00bf63']},
]);


let displayOA = !playedOA.value;
playedOA.value = true;
</script>

<template>
  <NavigationBar/>
  <OpeningAnimation v-if="displayOA"/>
  <div class="header">
    <h3>To Select</h3>
    <h6>Choose the code of your choice</h6>
  </div>
  <div class="main">
    <div class="left-nav">
      <DropDown>All</DropDown>
      <DropDown :list="CSS_attribute">CSS</DropDown>
      <DropDown :list="JS_attribute">JavaScript</DropDown>
    </div>
    <DisplayMenu/>
  </div>

</template>

<style scoped>

.main {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.header {
  padding: 0 14.6rem;
}

.header>h3 {
  font-size: 1.5rem;
  color: #D0C3F1;
  margin: 1.5rem 0 1rem 0;
}

.header>h6 {
  color: #D0C3F1;
  letter-spacing: 0.2rem;
  font-family: Cooljazz, sans-serif;
  font-weight: lighter;
  font-style: italic;
  text-indent: 2rem;
  margin: 1rem 0;
  font-size: 0.7rem;
}

.left-nav {
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  align-items: start;
}


</style>

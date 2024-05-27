<script setup>
import {onMounted, ref} from "vue";
  import NavigationBar from "@/components/NavigationBar.vue";
  import DropDown from "@/components/DropDown.vue";
  import DisplayMenu from "@/components/DisplayMenu.vue";

  let CSS_attribute = ref([
    {name: 'Buttons', url: '/', colors: ['#8c52ff', '#ff914d']},
    {name: 'Checkboxes', url: '/', colors: ['#ff5757', '#8c52ff']},
    {name: 'Toggle Switches', url: '/', colors: ['#8c52ff', '#5ce1e6']},
    {name: 'Loads', url: '/', colors: ['#8c52ff', '#00bf63']},
    {name: 'Transitions', url:'/', colors: ['#004add', '#cb6ce6']},
    {name: 'Special Effects', url: '/', colors: ['#0097b2', '#7ed957']}
  ]);
  let JS_attribute = ref([
    {name: 'Mouse Effect', url: '/', colors: ['#8c52ff', '#ff914d']},
    {name: 'Background', url: '/', colors: ['#ff5757', '#8c52ff']},
    {name: 'Menu', url: '/', colors: ['#8c52ff', '#5ce1e6']},
    {name: 'Visible Chart', url: '/', colors: ['#8c52ff', '#00bf63']},
  ]);

  let openingVisible = ref(false);
  let bodyVisible = ref(false);
  let openingExist = ref(true);

  onMounted(() => {
    setTimeout(() => openingVisible.value = true, 1);
    setTimeout(() => { openingVisible.value = false; bodyVisible.value = true }, 1200);
    setTimeout(() => openingExist.value = false, 2400);
  });
</script>

<template>
  <div :style="{ opacity: openingVisible ? '1' : '0', display: openingExist ? 'block' : 'none' }" class="openingElement" style="top: 25vh; font-size: 30vh;">
    New design
  </div>
  <div :style="{ opacity: openingVisible ? '1' : '0', display: openingExist ? 'block' : 'none' }" class="openingElement" style="bottom: 25vh; transition-delay: 0.1s; transition-duration: 0.5s; font-size: 8vh;">
    From UI Town
  </div>
  <div :style="{ opacity: bodyVisible ? '1' : '0' }" class="body">
    <NavigationBar/>
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
      <DisplayMenu content-type="" category=""/>
  </div>

  </div>

</template>

<style scoped>
.body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition-property: opacity;
  transition-duration: 0.4s;
  transition-delay: 0.6s;
  transition-timing-function: linear;
}

.openingElement {
  position: absolute;
  text-align: center;
  transition-property: opacity;
  transition-duration: 0.6s;
  transition-timing-function: linear;
  color: white;
  width: 100%;
  font-family: Amsterdam, serif;
}

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
  font-size: 0.5rem;
}

.left-nav {
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  align-items: start;
}


</style>

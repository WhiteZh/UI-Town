<script setup>
  import {ref} from "vue";
  import NavigationBar from "@/components/NavigationBar.vue";
  import DropDown from "@/components/DropDown.vue";
  import DisplayMenu from "@/components/DisplayMenu.vue";

  let CSS_attribute = ref([
    {name: 'Buttons', url: '/'},
    {name: 'Checkboxes', url: '/'},
    {name: 'Toggle Switches', url: '/'},
    {name: 'Loads', url: '/'},
    {name: 'Transitions', url:'/'},
    {name: 'Special Effects', url: '/'}
  ]);
  let JS_attribute = ref([
    {name: 'Mouse Effect', url: '/'},
    {name: 'Background', url: '/'},
    {name: 'Menu', url: '/'},
    {name: 'Visible Chart', url: '/'}
  ]);
</script>

<template>
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

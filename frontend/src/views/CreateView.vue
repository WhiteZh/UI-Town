<script setup>
import NavBar from "@/components/NavigationBar.vue"
import CodeDisplay from "@/components/CodeDisplay.vue";
</script>

<template>
  <NavBar />
  <div class="main">
    <CodeDisplay style="height: 100%; margin: auto; max-width: 2000px"/>
  </div>
</template>

<style scoped>
.main {
  padding: 5rem 2rem 0 2rem;
  height: 80vh;
}
</style>
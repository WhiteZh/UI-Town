<script setup>
import NavBar from "@/components/NavigationBar.vue"
</script>

<template>
  <div class="container">
    <NavBar />
    <div class="main">
      <div class="iframe">
        <iframe>

        </iframe>
      <div class="code_display">
        <div class="header">

        </div>
        <div class="code">

        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}

.main {
  width: 70vw;
  height: 70vh;
}

.iframe {
  width: 50%;
  height:100%;
  background-color: red;
}

.code_display{
  width: 50%;
  height:100%;
  background-color: green;
}

.header {
  background-color: #545454;
}
.code {
  background-color: #272727;
  display: flex;
  flex-wrap: wrap;
}
</style>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import { cssCategories, iframeContent } from "@/constants.js";
</script>

<template>
  <NavigationBar />
  <div class="container">
    <h1 style="color:#ef94ca">Create your work</h1>

    <div class="information">
      <div class="element">
        <label>Type</label>
        <select class="input_box input">
          <option v-for="each in cssCategories">{{each}}</option>
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
      </div>

      <div class="element">
        <label>Name</label>
        <input class="input_box input">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"  viewBox="0 0 16 16">
          <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
        </svg>
      </div>
    </div>

    <div class="main">
      <div class="code-container">
        <h4>Code field</h4>

        <div style="display:flex; flex-direction:row">
          <div class="code">
            <textarea class="input" id="codeArea"></textarea>
          </div>
          <div class="code-display">
          </div>
        </div>
      </div>

      <iframe style="width: 24rem; border-radius: 2rem; border: none" :srcdoc="iframeContent('', '')">

      </iframe>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.information {
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: #2b2a28;
  border-radius: 2rem;
  width: 56rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
}


.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 56rem;
}

.element {
  padding: 0 5rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 4rem;
}

.element>label {
  margin: auto 0;
  font-weight: bold;
  font-size: 1.3rem;
}

.element>svg {
  margin: auto 0;
}

.input_box {
  box-sizing: border-box;
  height: 2.3rem;
  margin: auto 0.6rem;
  border-radius: 1.3rem;
  padding: 0 1rem;
  font-size: 1rem;
  width:10rem
}

.code-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 30rem;
  background-color: #2b2a28;
  border-radius: 2rem;
  height: 33rem;
}

.code-container>h4 {
  color: white;
  padding-left: 2rem;
  padding-bottom: 0.5rem;
  margin: 0;
}

.code{
  flex: 2;
  box-sizing: border-box;
  background-color: #272030;
  height: 29rem;
  border-radius: 2rem;
  padding: 2rem;
}

.code>textarea {
  resize: none;
  height: 100%;
  width: 100%;
  background-color: transparent;
  color: white;
  white-space: pre;
  font-family: 'Mono', monospace;
}
</style>
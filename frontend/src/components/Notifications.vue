<script setup lang="ts">
import {inject, ref} from "vue";
import {Notification} from "@/constants";

const notifications: Notification[] = inject('notifications')!;
</script>

<template>
  <div class="root">
    <div v-for="each in notifications" :style="{backgroundColor: each.color || 'lightblue'}">
      {{each.message}}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style="position: absolute; right: 0; height: 100%; top: 0; margin-right: 0.5rem;" @click="notifications.splice(notifications.indexOf(each), 1)">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.root {
  position: absolute;
  z-index: 1000;
  width: 100%;
}

.root>div {
  text-align: center;
  padding: 0.5rem 0;
  font-size: 1rem;
  opacity: 0.8;
  position: relative;
}

.root>div>svg:hover {
  color: #333;
  cursor: pointer;
}
</style>
<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {notifications, user, playedOA} from "@/globs";

let router = useRouter();

onMounted(() => {
  if (user.value === undefined) {
    playedOA.value = true;
    notifications.push({message: "Please login first", color: 'red'});
    router.push('/');
  }
});
</script>

<template>
  <div style="position: absolute; top: 0; width: 100%;">
    <NavigationBar/>
  </div>
  <div class="container">
    <div class="basic">
      <!--TODO you need to implement the actual profile picture-->
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" fill="currentColor" class="bi bi-person-fill picon" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg>

      <div class="info">
        <h1>Name</h1>
        <p>
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How razorback-jumping frogs can level six piqued gymnasts! Grumpy wizards make toxic brew for the evil queen and jack. Jived fox nymph grabs quick waltz. Cozy lummox gives smart squid who asks for job pen.
        </p>
      </div>

      <div class="lvl">
        <span>1</span>级
      </div>
    </div>
    <div class="exhibition">
      <h1>Exhibition</h1>
      <div class="display">

      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  background: linear-gradient(90deg, #004aad55, #cb6ce655);
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  padding: 0 100px;
  color: white;
}

.basic {
  margin-top: 100px;
  display: flex;
}

.basic .picon {
  aspect-ratio: 1 / 1;
  height: 8rem;
  flex-shrink: 0;
  border: white 1px solid;
}

.basic>.info {
  padding: 0 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.basic>.info>h1 {
  padding: 0;
  margin: 0;
  line-height: 2rem;
}
.basic>.info>p {
  margin: 10px 0 0 .25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
}

.basic>.lvl {
  flex-shrink: 0;
  font-size: 2rem;
}
.basic>.lvl>span {
  min-width: 2rem;
  display: inline-block;
  text-align: center;
}

.exhibition {
  flex-grow: 1;
  margin: 75px 0 75px 0;
  display: flex;
  flex-direction: column;
  background-color: #27223055;
}
.exhibition>h1 {
  padding: 12px;
  margin: 0;
  line-height: 2rem;
  background-color: #21325755;
}

.exhibition>.display {
  flex-grow: 1;
  overflow: auto;
}
</style>
<script setup>
import {onMounted, ref} from "vue";
import DisplayCard from "@/components/DisplayCard.vue";

const props = defineProps({
    contentType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  });

  const list = ref([]);

  onMounted(async function() {
    try {
      let ids = await (await fetch('/api/css/valid', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })).json();
      if (ids.length > 0) {
        list.value = await (await fetch(`/api/css?${ids.map(e => `id=${e}`).join('&')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })).json();
      }
    } catch (e) {
      console.log(e);
    }
  });
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input class="input"/>
        <button>Search</button>
      </div>
      <span class="sort"><span style="font-size: 0.5rem">Sort : </span>Randomized</span>
    </div>
    <div class="main">
      <DisplayCard v-for="each in list" :name="each.name" :subscribed="0" :css="each.css" :html="each.html"/>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<style scoped>
.container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 5rem 2rem 0;
}

.header {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  font-style: italic;
  color: white;
  height: 1.7rem;
  padding-bottom: 0.5rem;
}

.sort {
  white-space: pre;
  font-size: 0.8rem;
  font-family: "Cooljazz", serif;
  font-style: italic;
  align-self: flex-end;
  margin-right: 1.5rem;
  margin-bottom: 0.1rem;
  letter-spacing: 0.1rem;
}

.search {
  position: relative;
  display: flex;
}
.search>svg {
  height: 100%;
  position: absolute;
  left: 0.4rem;
  color: black;
}
.search>input {
  margin: 1px 0;
  border-radius:  1rem 0.3rem 0.3rem 1rem;
  padding-left: 1.3rem;
  font-size: 0.8rem;
}

.search>button {
  border-radius: 0.3rem 1rem 1rem 0.3rem;
  border: none;
  margin-left: 0.12rem;
  cursor: pointer;
  background-color: #272030;
  color: white;
  font-size: 0.8rem;
  padding-right: 0.5rem;
}

.main {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 18rem);
  grid-template-rows: repeat(auto-fill, 15rem);
  justify-content: space-between;
  grid-gap: 1rem;
}

</style>
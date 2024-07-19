<script setup lang="ts">
import {inject, onMounted, Ref, ref} from "vue";
import DisplayCard from "@/components/DisplayCard.vue";
import {CSSCategory, CSSStyle, Notification} from "@/constants";
import {getCSSByIds, getValidCSSIds} from "@/api";

const props = defineProps<{
  contentType?: "css" | "js",
  category?: CSSCategory
}>();

const notifications: Notification[] = inject('notifications')!;

const list: Ref<CSSStyle[]> = ref([]);

onMounted(async function() {
  try {
    let ids = await getValidCSSIds();
    if (ids.length > 0) {
      list.value = await getCSSByIds(ids);
    }
  } catch (e) {
    notifications.push({message: String(e), color: 'red'});
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
      <DisplayCard v-for="each in list" :name="each.name" :subscribed="0" :css="each.css" :html="each.html" :id="each.id"/>
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
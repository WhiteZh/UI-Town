<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {notifications, user, playedOA} from "@/globs";
import {CSSStyle} from "@/constants";
import {getCSSByIds, getValidCSSIds} from "@/api";
import DisplayCard from "@/components/DisplayCard.vue";
import DisplayMenu from "@/components/DisplayMenu.vue";

let router = useRouter();

let works = ref<CSSStyle[]>([]);

onMounted(async () => {
  if (user.value === undefined) {
    playedOA.value = true;
    notifications.push({message: "Please login first", color: 'red'});
    await router.push('/');
    return;
  }

  let workIDs = await getValidCSSIds({author_id: user.value.id});
  if (workIDs.length > 0) {
    works.value = await getCSSByIds(workIDs);
  }
});


</script>

<template>
  <div class="absolute top-0 w-full">
    <NavigationBar/>
  </div>
  <div v-if="user !== undefined" class="max-w-screen-lg bg-[linear-gradient(90deg,#004aad55,#cb6ce655)] h-screen mx-auto flex flex-col justify-start items-stretch lg:px-28 px-5 text-white overflow-scroll">
    <div class="mt-20 flex w-full">
      <!--TODO you need to implement the actual profile picture-->
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" fill="currentColor" class="bi bi-person-fill aspect-square h-32 flex-shrink-0 border border-white" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg>

      <div class="px-5 flex flex-col justify-start">
        <h1 class="leading-8 text-3xl font-bold">{{user.name}}</h1>
        <p class="w-full mt-2 ms-0.5 overflow-scroll overflow-ellipsis max-h-20 [scrollbar-width:none] leading-tight">
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How razorback-jumping frogs can level six piqued gymnasts! Grumpy wizards make toxic brew for the evil queen and jack. Jived fox nymph grabs quick waltz. Cozy lummox gives smart squid who asks for job pen.
        </p>
      </div>

      <div class="flex-shrink-0 text-2xl">
        lvl.<span class="min-w-8 inline-block text-center">1</span>
      </div>
    </div>
    <div class="flex-grow mt-16 mb-8 flex flex-col bg-[#27223055] overflow-hidden">
      <h1 class="p-3 text-3xl leading-8 bg-[#21325755] font-[Cooljazz] tracking-widest font-extralight">Exhibition</h1>
      <DisplayMenu :hasSearcher="false" class="px-6 py-6"/>
    </div>
  </div>
</template>

<style scoped>
</style>
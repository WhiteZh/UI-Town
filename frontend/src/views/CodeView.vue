<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar.vue"
import CodeDisplay from "@/components/code/CodeDisplay.vue";
import {User, Notification, CSSStyle, cssCategories} from "@/constants";
import {computed, ComputedRef, inject, onMounted, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {createCSSStyle, deleteCSSStyle, getCSSByIds} from "@/api";
import {user, notifications} from "@/globs";

const route = useRoute();
const router = useRouter();

const mode = computed(() => route.meta.mode) as ComputedRef<"create" | "view" | "edit">;
const codeID = ref<number>();
const authorID = ref<number>();

const name = ref() as Ref<HTMLInputElement>;
const type = ref() as Ref<HTMLSelectElement>;

const html = ref('');
const css = ref('');


onMounted(async () => {
  console.log(mode.value);
  switch (mode.value) {
    case 'create':
      if (!user.value) {
        await router.push({name: 'browse'});
        notifications.push({
          message: 'Please login before creating new styles',
          color: 'yellow'
        });
      }
      break;
    case 'view':
      codeID.value = parseInt(route.params.id as string);
      try {
        let styles = await getCSSByIds([parseInt(route.params.id as string)]);
        if (styles.length > 0) {
          html.value = styles[0].html;
          css.value = styles[0].css;
          authorID.value = styles[0].author_id;
        } else {
          notifications.push({message: 'Id does not exist', color: 'yellow'});
        }
      } catch (e) {
        console.log(e);
        notifications.push({message: `Failed to fetch data from server ${String(e)}`, color: 'red'});
      }
      break;
    case 'edit':
      break;
    default:
      notifications.push({message: 'Unexpected behavior (unexpected mode for CodeView)', color: 'purple'});
  }
});


async function submit() {
  console.log(user);
  if (!user.value) {
    notifications.push({message: 'Not logged in', color: 'yellow'});
    return;
  }
  try {
    await createCSSStyle(
        user.value.id,
        user.value.password_hashed,
        name.value.value,
        type.value.value,
        html.value,
        css.value
    );
    notifications.push({message: 'Successfully created a new style'});
  } catch (e) {
    console.log(e);
    notifications.push({message: `Upload failed: ${String(e)}`, color: 'yellow'});
  }
}


const del = async () => {
  if (!user.value) {
    notifications.push({message: 'Login first', color: 'yellow'});
    return;
  }
  if (codeID.value === undefined) {
    notifications.push({message: "Cannot delete a style that hasn't been uploaded", color: "yellow"});
    return;
  }
  try {
    await deleteCSSStyle(codeID.value, user.value.password_hashed);
    notifications.push({message: 'successfully deleted'});
  } catch (e) {
    notifications.push({message: 'deletion failed'});
    console.log(e);
  }
}
</script>

<template>
  <NavigationBar />
  <div class="m-8 mx-auto max-w-screen-2xl px-3">
    <RouterLink :to="{name: 'browse'}" class="text-black bg-white py-3 inline-flex w-28 text-center rounded-full flex-row items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" fill="currentColor" class="bi bi-arrow-left  h-4 me-1" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg>
      <span class="me-0.5">Go Back</span>
    </RouterLink>
    <div class="bg-[#2b2a28] flex flex-row px-20 h-20 rounded-full mt-4 items-center justify-between text-[1.2rem] -mx-0.5" v-if="mode === 'create'">
      <div>
        <label class="text-white me-8 font-bold">Name</label>
        <input class="h-12 rounded-full py-2 px-3" ref="name"/>
      </div>
      <div class="bg-[#1ac8db] p-4 rounded-full text-white cursor-pointer" @click="submit()">submit</div>
      <div>
        <label class="text-[1.2rem] text-white me-8 font-bold">Type</label>
        <select class="h-12 rounded-full py-2 px-3" ref="type">
          <option>---</option>
          <option v-for="cate in cssCategories">{{cate}}</option>
        </select>
      </div>
    </div>
    <CodeDisplay class="rounded-2xl overflow-hidden h-[70svh] mt-4 mx-auto" v-if="html || mode === 'create'" v-model:html="html" v-model:css="css" :deletion="user !== undefined && authorID !== undefined && user.id === authorID ? del : undefined"/>
  </div>
</template>

<style scoped>
</style>
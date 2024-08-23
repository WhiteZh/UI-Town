<script setup lang="ts">
import NavBar from "@/components/NavigationBar.vue"
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


const setup = async () => {
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

onMounted(setup);
watch(route, setup);
</script>

<template>
  <NavBar />
  <div class="main">
    <div style="max-width: 2000px; margin: 0 auto;">
      <RouterLink :to="{name: 'browse'}" class="no-link-style" style="color: black; background-color: white; padding: 0.7rem 0; display: inline-flex; width: 7rem; text-align: center; border-radius: 1rem; flex-direction: row; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1rem; margin-right: 0.2rem;" height="100%" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
        <span style="margin-right: 0.15rem;">Go Back</span>
      </RouterLink>
    </div>
    <div class="float" v-if="mode === 'create'">
      <div>
        <label>Name</label>
        <input class="input" ref="name"/>
      </div>
      <div class="submit-btn" @click="submit()">submit</div>
      <div>
        <label>Type</label>
        <select class="input" ref="type">
          <option>---</option>
          <option v-for="cate in cssCategories">{{cate}}</option>
        </select>
      </div>
    </div>
    <CodeDisplay style="border-radius: 1rem; overflow: hidden; height: 75vh; max-width: 2000px; margin: 1rem auto 0;" v-if="html || mode === 'create'" v-model:html="html" v-model:css="css" :deletion="user !== undefined && authorID !== undefined && user.id === authorID ? del : undefined"/>
  </div>
</template>

<style scoped>
.main {
  padding: 2rem;
}

.float {
  background-color: #2b2a28;
  display: flex;
  flex-direction: row;
  padding: 0 5rem;
  border-radius: 2rem;
  height: 5rem;
  max-width: 2000px;
  margin: 1rem auto 0 auto;
  align-items: center;
  justify-content: space-between;
}

.float>div>label {
  font-size: 1.2rem;
  color: white;
  margin: 0 2rem 0 0;
  font-weight: bold;
}
.float>div>input, .float>div>select {
  height: 3rem;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  padding: 0.5rem 1.3rem;
}

.submit-btn {
  font-size: 1.2rem;
  background-color: #1ac8db;
  padding: 1rem;
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
}
</style>
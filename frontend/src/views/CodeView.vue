<script setup lang="ts">
import NavBar from "@/components/NavigationBar.vue"
import CodeDisplay from "@/components/CodeDisplay.vue";
import {User, Notification, CSSStyle, cssCategories} from "@/constants";
import {computed, ComputedRef, inject, onMounted, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {createCSSStyle, deleteCSSStyle, getCSSByIds} from "@/api";
import {user, notifications} from "@/globs";

const route = useRoute();
const router = useRouter();

const mode = computed(() => route.meta.mode) as ComputedRef<"create" | "view" | "edit">;
const codeID = ref<number>();

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
        await router.push('/');
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
  <div style="position: absolute; right: 5rem; top: 5rem;" v-if="mode === 'view'">
    <button @click="del">delete</button>
  </div>
  <div class="main">
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
    <div style="height: 2rem;"></div>
    <CodeDisplay style="height: 75vh; margin: 0 auto; max-width: 2000px;" v-if="html || mode === 'create'" v-model:html="html" v-model:css="css"/>
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
  margin: 0 auto;
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
<script setup>
import NavBar from "@/components/NavigationBar.vue"
import CodeDisplay from "@/components/CodeDisplay.vue";
import {cssCategories} from "@/constants.js";
import {computed, inject, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const mode = computed(() => route.meta.mode);
const codeID = ref(null);

const user = inject('user');
const notifications = inject('notifications');

const name = ref(null);
const type = ref(null);

const html = ref('');
const css = ref('');

async function submit() {
  console.log(user);
  let res = await fetch('/api/css', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: user.id,
      password_hashed: user.password_hashed,
      name: name.value.value,
      category: type.value.value,
      html: html.value,
      css: css.value,
    })
  });
  if (res.ok) {
    notifications.push({message: 'Successfully created a new style'});
  } else {
    notifications.push({message: `Upload failed: ${(await res.json()).error}`, color: 'yellow'});
  }
}


const setup = async () => {
  console.log(mode.value);
  switch (mode.value) {
    case 'create':
      if (!user.id) {
        await router.push('/');
        notifications.push({
          message: 'Please login before creating new styles',
          color: 'yellow'
        });
      }
      break;
    case 'view':
      codeID.value = route.params.id;
      let response = await fetch(`/api/css/?id=${route.params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        let body = await response.json();
        if (body.length > 0) {
          html.value = body[0].html;
          css.value = body[0].css;
        } else {
          notifications.push({message: 'Id does not exist', color: 'yellow'});
        }
      } else {
        let body = await response.json();
        console.log(body);
        notifications.push({message: `Failed to fetch data from server ${body.error}`, color: 'red'});
      }
      break;
    case 'edit':
      break;
    default:
      notifications.push({message: 'Unexpected behavior (unexpected mode for CodeView)', color: 'purple'});
  }
}

const del = async () => {
  if (!user) {
    notifications.push({message: 'Login first', color: 'yellow'});
    return;
  }
  let res = await fetch(`/api/css?id=${codeID.value}&password_hashed=${user.password_hashed}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (res.ok) {
    notifications.push({message: 'successfully deleted'});
  } else {
    notifications.push({message: 'deletion failed'});
    console.log(await res.json());
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
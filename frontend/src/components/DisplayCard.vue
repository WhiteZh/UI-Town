<script setup>
import {onMounted, ref} from "vue";
import {shadowContent} from '@/constants.js';
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  subscribed: {
    type: Number,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const cardContentRoot = ref();
onMounted(() => {
  let shadowDOM = cardContentRoot.value.attachShadow({mode: 'open'});
  shadowDOM.innerHTML = shadowContent(props.html, props.css);
  const calcHeightRatio = (x) => cardContentRoot.value.offsetHeight * 0.9 / x;
  const calcWidthRatio = (x) => cardContentRoot.value.offsetWidth * 0.9 / x;
  let ratio = Infinity;
  for (let each of Array.from(shadowDOM.querySelectorAll('*')).filter((e) => getComputedStyle(e).position === 'absolute')) {
    ratio = Math.min(ratio, calcHeightRatio(each.offsetHeight));
    ratio = Math.min(ratio, calcWidthRatio(each.offsetWidth));
  }
  if (ratio < 1) {
    shadowDOM.getElementById('the-id-of-the-shadow-root').style.transform += ` scale(${ratio}) `;
  }
})
</script>

<template>
  <div class="card-container">
    <div class="card-frame">
      <div class="card-content-root" ref="cardContentRoot"/>
      <RouterLink class="card-content-btn no-link-style" :to="`/view/${props.id}`">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-braces" viewBox="0 0 16 16">
          <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6"/>
        </svg>
        <span style="padding-top: 0.15rem;">Code</span>
      </RouterLink>
    </div>
    <div class="card-title">
      <div class="card-name">
        {{name}}
      </div>
      <div class="card-subs">
        subs: {{ subscribed }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  height: 15rem;
  width: 18rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.card-frame {
  flex-grow: 1;
  position: relative;
}

.card-content-root {
  border-radius: 1.2rem;
  border: none;
  height: 100%;
  position: relative;
  background-color: #2b2a2a;
}

.card-content-btn {
  position: absolute;
  bottom: 1rem;
  right: 1.2rem;
  background-color: white;
  border: none;
  border-radius: 0.4rem;
  font-size: 1rem;
  height: 2rem;
  width: 5rem;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  color: black;
  cursor: pointer;
}
.card-frame:hover .card-content-btn {
  display: inline-flex;
}

.card-title {
  padding: 0.4rem 0.8rem 0 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card-name {
  color: white;
  font-size: 0.9rem;
}

.card-subs {
  color: white;
  font-size: 0.8rem;
}
</style>
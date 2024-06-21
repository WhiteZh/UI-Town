<script setup>
import {onMounted, ref} from "vue";
import {shadowContent} from '@/constants.js';

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
});

const cardRoot = ref();
onMounted(() => {
  let shadowDOM = cardRoot.value.attachShadow({mode: 'open'});
  shadowDOM.innerHTML = shadowContent(props.html, props.css);
  const calcHeightRatio = (x) => cardRoot.value.offsetHeight * 0.9 / x;
  const calcWidthRatio = (x) => cardRoot.value.offsetWidth * 0.9 / x;
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
    <div class="card" ref="cardRoot">

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

.card {
  border-radius: 1.2rem;
  border: none;
  flex-grow: 1;
  position: relative;
  background-color: #2b2a2a;
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
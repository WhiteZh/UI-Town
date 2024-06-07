<script setup>
import { EditorView, basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorState } from "@codemirror/state";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { iframeContent } from '@/constants.js'
import { onMounted, ref } from "vue";

const props = defineProps({
  html: {
    type: String,
    default: '',
  },
  css: {
    type: String,
    default: ''
  },
});

const activeTab = ref('html');

const htmlEditor = ref(null);
const cssEditor = ref(null);

let iframeValue = ref(iframeContent('', ''));

onMounted(() => {
  // number 12 is autocompletion
  const htmlExtensions = [basicSetup.filter((e, i) => i !== 12), oneDark, html()];
  const cssExtensions = [basicSetup.filter((e, i) => i !== 12), oneDark, css()];

  const htmlState = EditorState.create({
    doc: props.html,
    extensions: htmlExtensions,
  });

  const htmlView = new EditorView({
    state: htmlState,
    parent: htmlEditor.value,
  });

  const cssState = EditorState.create({
    doc: props.css,
    extensions: cssExtensions,
  });

  const cssView = new EditorView({
    state: cssState,
    parent: cssEditor.value,
  });

  let lastHTML = htmlView.state.doc.toString();
  let lastCSS = cssView.state.doc.toString();
  setInterval(() => {
    let html = htmlView.state.doc.toString();
    let css = cssView.state.doc.toString();
    if (html !== lastHTML || css !== lastCSS) {
      iframeValue.value = iframeContent(html, css);
    }
  }, 500);
});


</script>

<template>
  <div class="container">
    <iframe class="iframe" :srcdoc="iframeValue">
    </iframe>
    <div class="code">
      <div class="tabs">
        <button style="background-color: #7ed957" @click="activeTab = 'html'">HTML</button>
        <button style="background-color: #ff66c4" @click="activeTab = 'css'">CSS</button>
      </div>
      <div class="codeArea" ref="htmlEditor" :style="{display: activeTab === 'html' ? 'block' : 'none'}"></div>
      <div class="codeArea" ref="cssEditor" :style="{display: activeTab === 'css' ? 'block' : 'none'}"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.iframe {
  width: 50%;
}

.code {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.tabs {
  min-height: 5rem;
  max-height: 5rem;
  background-color: #545454;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
  gap: 1.5rem;
}
.tabs>button {
  width: 8rem;
  height: 4rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: white;
  font-family: "Cooljazz", serif;
  font-style: italic;
  letter-spacing: 0.3rem;
  cursor: pointer;
}

.codeArea {
  flex-grow: 1;
  background-color: #272727;
  padding-top: 0.2rem;
}
</style>
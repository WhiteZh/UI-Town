<script setup lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import {EditorState, Extension} from "@codemirror/state";
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { iframeContent } from '@/constants'
import {onMounted, Ref, ref, watch} from "vue";

const props = withDefaults(defineProps<{
  html: string,
  css: string,
  deletion?: () => void,
}>(), {
  html: '',
  css: '',
});

const emit = defineEmits(['update:html', 'update:css']);

const activeTab: Ref<"html" | "css"> = ref('html');

const htmlEditor = ref() as Ref<HTMLDivElement>;
const cssEditor = ref() as Ref<HTMLDivElement>;

let iframeValue = ref(iframeContent('', ''));

onMounted(() => {
  // number 12 is autocompletion
  let setupExtensions: Extension[] = (basicSetup as Extension[]).filter((_, i) => ![12].includes(i));
  const htmlExtensions = [setupExtensions, oneDark, html()];
  const cssExtensions = [setupExtensions, oneDark, css()];

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

  [{src: () => props.html, view: htmlView}, {src: () => props.css, view: cssView}].forEach(({src, view}) => {
    watch(src, () => {
      if (src() === view.state.doc.toString()) {
        return;
      }
      // keep cursor location even if view got dispatched/updated
      // let cursor = Math.min(view.state.selection.main.head, src().length);
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: src(),
        },
        // selection: {
        //   anchor: cursor,
        // }
      });
    });
  });

  let lastHTML = '';
  let lastCSS = '';
  setInterval(() => {
    let html = htmlView.state.doc.toString();
    let css = cssView.state.doc.toString();
    if (html !== lastHTML || css !== lastCSS) {
      iframeValue.value = iframeContent(html, css);
      emit('update:html', html);
      emit('update:css', css);
      lastHTML = html;
      lastCSS = css;
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
        <div style="flex-grow: 1"/>
        <button style="background-color: #550000" @click="deletion" v-if="deletion !== undefined">Delete</button>
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
  padding: 0 2rem;
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
  overflow: auto;
}
</style>
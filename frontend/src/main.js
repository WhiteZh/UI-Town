import './assets/main.css'

import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.provide('notifications', reactive([]));
app.provide('user', reactive({}));
app.provide('session', {});

app.use(router)

app.mount('#app')

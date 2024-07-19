import './assets/main.css'

import {createApp, reactive, ref} from 'vue'
import App from './App.vue'
import router from './router'
import {Notification, User, Session} from '@/constants'

const app = createApp(App)

let notifications: Notification[] = [];
app.provide('notifications', reactive(notifications));

let user = ref<User>();
app.provide('user', user);

let session: Session = {
    playedOA: false
}
app.provide('session', reactive(session));

app.use(router)

app.mount('#app')

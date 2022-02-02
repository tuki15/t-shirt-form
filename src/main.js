import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './index.css'
import './assets/tailwind.css'

const eventBus = mitt()
const app = createApp(App)

app.config.globalProperties.eventBus = eventBus
app.mount('#app')

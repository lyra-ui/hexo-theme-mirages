import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './router/guard'
import { registerObSkeleton } from '@/components/Skeleton'
import 'normalize.css'
import './styles/index.scss'

const app = createApp(App).use(router).use(createPinia())
registerObSkeleton(app)
app.mount('#app')

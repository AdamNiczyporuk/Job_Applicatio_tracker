import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


const app = createApp(App);
app.use(router)
app.use(vuetify)
app.use(Toast, {
  position: "bottom-left",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  
});
app.mount('#app')



import Vue from 'vue'
import App from './App.vue'
// 整体引入
import FOCUSTARUI from "@/index"
import '@/styles/index.scss';
import '@/styles/global.css';
import ElementUI from 'element-ui';
import router from "./router";
import filters from "@/filters"
import Preview from "@/directives/imgViewer/preview.js";
import plugin from '@/components/emoji-picker/install.js'
import './pages'
import './components'
/* ions */
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI, {size: "default"})
Vue.use(FOCUSTARUI)
Vue.use(filters)
Vue.use(Preview)
plugin.install(Vue)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

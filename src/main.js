// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Form,
  FormItem,
  TimePicker,
  Radio,
  RadioGroup,
  Select,
  Option,
  Cascader,
  Button,
  Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'babel-polyfill'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false
Vue.use(Form)
Vue.use(FormItem)
Vue.use(TimePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Button)
Vue.use(Loading)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
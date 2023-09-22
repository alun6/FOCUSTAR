import EmojiPicker from "./EmojiPicker.vue";
import { emoji2string, genString2emoji } from "./util";
import qqface from './qqface.png'


const plugins = {
 install(Vue, options) {
  const url = options && options.url || qqface;
  Vue.component("emoji-picker", Vue.extend({ mixins: [EmojiPicker], created: function(){
    this.url = url
    }}));
  Vue.prototype.$string2emoji = genString2emoji(url)
  Vue.prototype.$emoji2string = emoji2string
 }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugins);
}

export default plugins;
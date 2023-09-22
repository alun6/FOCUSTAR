import FuWangEditor from './FuWangEditor';
import locale from "@/locale"

FuWangEditor.install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)
  Vue.component(FuWangEditor.name, FuWangEditor);
};

export default FuWangEditor;

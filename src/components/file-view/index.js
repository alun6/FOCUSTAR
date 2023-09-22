import FuFileView from './FileView.vue';
import locale from "@/locale"

FuFileView.install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)
  Vue.component(FuFileView.name, FuFileView);
};

export default FuFileView;

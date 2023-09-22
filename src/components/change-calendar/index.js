import FuChangeCalendar from './FuChangeCalendar';
import locale from "@/locale"

FuChangeCalendar.install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)
  Vue.component(FuChangeCalendar.name, FuChangeCalendar);
};

export default FuChangeCalendar;

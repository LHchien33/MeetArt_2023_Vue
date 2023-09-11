import swal from 'sweetalert2';

const defaultStyle = {
  toast: true,
  timer: 1800,
  position: 'top',
  width: 'auto',
  padding: '.5rem 1rem',
  showConfirmButton: false,
  customClass: {
    container: 'pt-6',
    title: 'm-2',
    icon: 'border-0 me-0',
    popup: 'gradient-border gradient-border-2'
  },
  showClass: {
    popup: 'custom-toast-show',
  }
};

const templates = {
  success: {
    title: '成功',
    iconHtml: '<span class="material-symbols-outlined text-secondary opacity-75">check_circle</span>'
  },
  failed: {
    title: '失敗',
    iconHtml: '<span class="material-symbols-outlined text-danger">cancel</span>'
  }
}

export function toast(style){
  return swal.mixin({
    ...defaultStyle,
    ...style.otherMixins,
    ...templates[style?.toastType]
  });
}

export default {
  install(app, opts){
    app.config.globalProperties.$toast = (style) => toast(style)
  }
}

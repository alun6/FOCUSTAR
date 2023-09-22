<template>
  <div>
    <fu-wang-editor :content="content" :disabled="disabled"></fu-wang-editor>
  </div>
</template>
<script>
export default {
  name: "wangEditorBase",
    data(){
      return{
        content:'文档内容',
        disabled:false,
      }
    }

};
</script>
<template>
    <div>
      <fu-wang-editor :content="content" :disabled="disabled" :shortConfig="shortConfig"></fu-wang-editor>
    </div>
  </template>
  <script>
  export default {
    name: "shortConfig",
      data(){
        return{
          content:'文档内容',
          disabled:false,
          shortConfig:true,
        }
      }
  
  };
  </script>
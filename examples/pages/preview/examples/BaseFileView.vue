<template>
  <div>
    <fu-file-view :fileType="fileType" :fileUrl="fileUrl"></fu-file-view>
  </div>
</template>

<script>
export default {
  name: "BaseFileView",
  data() {
    return {
      fileType:'docx',
      fileUrl:'http://ashuai.work/api/word.docx',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.component-block {
  margin-top: 40px;

  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }

  h2 {
    font-weight: 400;
    color: #1f2f3d;
  }
}
</style>
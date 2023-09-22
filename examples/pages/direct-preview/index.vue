<example path="./examples/BaseImg.vue"/>
<template>
  <div>
    <!-- 文档说明 -->
    <document-table :data="attributes"/>
    <!-- 一级描述 -->
    <p>可预览、放大图片文件 $openPreview方法出入图片数组</p>
    <!--内容 -->
    <div class="component-block" v-for="(item, index) in comList" :key="index">
      <h2>{{ item.title }}</h2>
      <p>{{ item.titleDesc }}</p>
      <code-example :description="item.description" :component="examples[item.component]"/>
    </div>
  </div>
</template>

<script>
import examples from "../../mixins/docsExample";
import attributes from "./attributes";

export default {
  name: "previewDoc",
  mixins: [examples],
  data() {
    return {
      attributes,
      comList: [
        {
          title: "基础用法",
          titleDesc: "",
          component: "BaseImg",
        },
      ]
    };
  },
  methods: {},
  created() {
  },
  mounted() {
  }
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

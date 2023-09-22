<example path="./examples/wangEditorBase.vue"/>
<example path="./examples/shortConfigEditor.vue"/>
<template>
  <div>
    <!-- 文档说明 -->
    <document-table :data="attributes"/>
    <!-- 一级描述 -->
    <p>富文本书写，可添加自定义上传，高级按钮功能请自行修改配置</p>
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
  name: "wangEditorDoc",
  mixins: [examples],
  data() {
    return {
      attributes,
      comList: [
        {
          title: "基本用法",
          titleDesc: "",
          component: "wangEditorBase",
        },
        {
          title: "功能按钮减少",
          titleDesc: "",
          component: "shortConfigEditor",
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

<example path="./examples/emoBase.vue"/>
<template>
  <div>
    <!-- 文档说明 -->
    <document-table :data="attributes"/>
    <!-- 一级描述 -->
    <p>聊天表情，通过图片特征定位图片位置显示，回显需要在标签 v-html="$string2emoji('内容')"</p>
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
  name: "emoDoc",
  mixins: [examples],
  data() {
    return {
      attributes,
      comList: [
        {
          title: "基础用法",
          titleDesc: "",
          component: "emoBase",
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

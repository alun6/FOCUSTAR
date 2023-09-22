<template>
  <div>
    <img :src="src" style="width: 100px; height: 100px" @click="toBig(src)"/>
  </div>
</template>

<script>
export default {
  name: "BaseImg",
  data() {
    return {
      src:'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1695315600&t=a7bbabe1170eea2e6c9a9e41e6b31c93'
    };
  },
  methods: {
    toBig(src){
      this.$openPreview([src])
    }
  },
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
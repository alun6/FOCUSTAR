<template>
  <div>
    <el-input type="textarea" style="width: 520px;margin-left:10px" resize="none" v-model="ComText" maxlength="1000"
      :rows="6" show-word-limit></el-input>
      <div class="emojiFont">
        <el-popover placement="bottom" width="420" ref="popover" trigger="click">
          <emoji-picker class="emoji-width" @input="showtHite" v-model="ComText" height="200px"></emoji-picker>
          <el-image slot="reference" class="emojiCuopt" src="https://img2.baidu.com/it/u=2947303655,1626794127&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1695315600&t=153a65543db6d880eb300d3274119930"></el-image>
        </el-popover>
      </div>
   <p class="soemoji" v-html="$string2emoji(ComText)"></p>
  </div>
</template>

<script>
export default {
  name: "emoBase",
  data() {
    return {
      ComText: '',
    };
  },
  methods: {
    showtHite(){
      this.$refs.popover.doClose()
    },
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
.emojiFont{
  margin-left:10px;
  margin-top: 5px;
}
.emojiCuopt{
  width:24px;
  height: 24px;
  cursor: pointer;
  background-color: #fff;
}
</style>
<template>
  <el-input
    :size="size"
    :type="type"
    :maxlength="maxlength"
    :clearable="clearable"
    @input="inputChange"
    v-bind="$attrs"
    @keyup.enter.native="$emit('keyup.enter.native')"
    @blur="blur"
  ></el-input>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "Input",
  props: {
    size: {
      default: "mini",
      type: String
    },
    type: {
      default: "text",
      type: String
    },
    clearable: {
      default: true,
      type: Boolean
    },
    maxlength: {
      default: 20,
      type: [Number, String]
    },
    remark: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      nameReg: /[^0-9\u4e00-\u9fa5a-zA-Z]/g, //名称正则
      remarkReg: /[^0-9\u4e00-\u9fa5a-zA-Z\.\,\s\。\，\;\"\:\'\‘\’\”\“\/\、\(\)\（\）]/g //备注正则
    };
  },
  methods: {
    inputChange(value) {
      // console.log(value);
      let tmpValue = value;
      let reg = this.remark ? this.remarkReg : this.nameReg;
      tmpValue = value.replace(reg, "");
      this.$emit("input", tmpValue); //关键点，把满足的值赋给input事件
    },
    blur(e) {
      // console.log(e);
      e.target.value = e.target.value.trim(); //失焦点时去掉空格，
      this.$emit("blur", e);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
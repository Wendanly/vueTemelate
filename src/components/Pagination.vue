<template>
  <el-pagination
    v-if="total>0"
    class="pagination"
    :class="getDirection"
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="page.page"
    :page-sizes="pageSizes"
    :page-size="page.rows"
    :layout="layout"
    :total="total"
    background
    :small="small"
    :pager-count="pagerCount"
  ></el-pagination>
</template>

<script>
//示例：  <Pagination @getList="getList" :page="page" :total="total"></Pagination>
export default {
  name: "Pagination",
  props: {
    total: {
      default: 0,
      type: Number
    },
    pagerCount: {
      default: 7,
      type: Number
    },
    page: {
      type: Object,
      default() {
        return {};
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    align: {
      default: "right",
      type: String
    },
    small: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {
    getDirection() {
      if (this.align == "left") {
        return "left";
      } else if (this.align == "right") {
        return "right";
      } else if (this.align == "center") {
        return "center";
      } else {
        return "right";
      }
    }
  },
  methods: {
    currentChange(val) {
      // console.log(val);
      this.page.page = val;
      this.$emit("getList", val);
    },
    sizeChange(val) {
      this.page.rows = val;
      this.$emit("getList", val);
    }
  }
};
</script>

<style lang='scss' scoped>
.pagination {
  margin-top: 10px;
}
.right {
  text-align: right;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
</style>

<template>
  <div class="wrap">
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :max-height="`calc(100vh - ${$TABLEHEIGHT}px)`"
      >
        <el-table-column prop="1" label="任务编码"></el-table-column>
        <el-table-column prop="2" label="任务名称"></el-table-column>
        <el-table-column prop="3" label="周期"></el-table-column>
        <el-table-column prop="4" label="任务编码"></el-table-column>
        <el-table-column prop="5" label="记录数"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row['5'] == '1610'"
              type="text"
              size="mini"
              @click="upload(scope)"
            >上传</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :currentPage="page"
        :pageSize="rows"
        :total="total"
      ></MyPagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "taskMonitor",
  data() {
    return {
      tableData: [
        {
          1: "1",
          2: "标签元数据下发",
          3: "20210819",
          4: "成功",
          5: "598"
        },
        {
          1: "2",
          2: "标签元数据上传",
          3: "20210817",
          4: "成功",
          5: "1610"
        },
        {
          1: "3",
          2: "标签元数据下发",
          3: "20210819",
          4: "成功",
          5: "598"
        },
        {
          1: "4",
          2: "标签元数据上传",
          3: "20210817",
          4: "成功",
          5: "1610"
        },
        {
          1: "5",
          2: "标签元数据下发",
          3: "20210819",
          4: "成功",
          5: "598"
        },
        {
          1: "6",
          2: "标签元数据上传",
          3: "20210817",
          4: "成功",
          5: "1610"
        },
        {
          1: "7",
          2: "标签元数据下发",
          3: "20210819",
          4: "成功",
          5: "598"
        },
        {
          1: "8",
          2: "标签元数据上传",
          3: "20210817",
          4: "成功",
          5: "1610"
        },
        {
          1: "9",
          2: "标签元数据下发",
          3: "20210819",
          4: "成功",
          5: "598"
        },
        {
          1: "10",
          2: "标签元数据上传",
          3: "20210817",
          4: "成功",
          5: "1610"
        },
        {
          1: "11",
          2: "标签元数据下发",
          3: "20210819",
          4: "成功",
          5: "598"
        },
        {
          1: "12",
          2: "标签元数据上传",
          3: "20210817",
          4: "成功",
          5: "1610"
        }
      ],
      total: 12, //总条数
      page: 1,
      rows: this.$PAGE_SIZES[0] // 初始化每页展示多少条
    };
  },
  methods: {
    upload() {
      this.$confirm("确定上传吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      })
        .then(() => {
          setTimeout(_ => this.$message.success("上传成功！"), 1100);
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.rows = val;
      // this.getList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <el-dialog
    :destroy-on-close="true"
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
  >
    <div class="dia-wrap">
      <el-form
        v-loading="formLoading"
        label-position="center"
        label-width="120px"
        :model="formData"
        ref="formRules"
        disabled
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户群编码" prop="SUBJECT_ID">
              <MyInput placeholder="客户群编码" :maxlength="maxlength" v-model="formData.SUBJECT_ID"></MyInput>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户群名称" prop="SUBJECT_NAME">
              <MyInput placeholder="客户群名称" :maxlength="maxlength" v-model="formData.SUBJECT_NAME"></MyInput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分析主体" prop="FRAME_NAME">
              <MyInput placeholder="分析主体" :maxlength="maxlength" v-model="formData.FRAME_NAME"></MyInput>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="周期" prop="CYCLE_NAME">
              <MyInput placeholder="周期" :maxlength="maxlength" v-model="formData.CYCLE_NAME"></MyInput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="BEGIN_DATE">
              <MyInput placeholder="开始时间" :maxlength="maxlength" v-model="formData.BEGIN_DATE"></MyInput>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="END_DATE">
              <MyInput :maxlength="maxlength" placeholder="结束时间" v-model="formData.END_DATE"></MyInput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="BUS_INFO">
              <MyInput
                type="textarea"
                :maxlength="maxlength"
                placeholder="备注"
                v-model="formData.BUS_INFO"
              ></MyInput>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" v-loading="tableLoading" max-height="240">
          <el-table-column prop="STAT_DATE" show-overflow-tooltip label="周期"></el-table-column>
          <el-table-column prop="EXEC_STATUS_NAME" show-overflow-tooltip label="状态"></el-table-column>
          <el-table-column prop="CNT" show-overflow-tooltip label="规模"></el-table-column>
          <el-table-column prop="CREATE_TIME" show-overflow-tooltip label="创建时间"></el-table-column>
          <el-table-column prop="EXEC_TIME" show-overflow-tooltip label="执行时间"></el-table-column>
          <el-table-column prop="ERROR_MSG" show-overflow-tooltip label="执行描述"></el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" style="text-align: center;">
      <el-button size="mini" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { GetViewSubjectInfo } from "@/api/customerCluster.js";
export default {
  name: "add",
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      title: "查看",
      formLoading: false,
      formData: {
        SUBJECT_ID: "",
        SUBJECT_NAME: "",
        FRAME_NAME: "",
        CYCLE_NAME: "",
        BEGIN_DATE: "",
        END_DATE: "",
        BUS_INFO: ""
      },
      tableData: [],
      maxlength: 50,
      loading: false,
      rows: this.$PAGE_SIZES[0], // 初始化每页展示多少条
      tableLoading: false
    };
  },
  methods: {
    open(rowInfo) {
      this.getList({
        subject_name: rowInfo.SUBJECT_NAME,
        subject_id: rowInfo.SUBJECT_ID
      });
      this.dialogFormVisible = true;
    },
    getList(param) {
      //清空子节点
      this.tableLoading = true;
      GetViewSubjectInfo(param)
        .then(res => {
          this.tableLoading = false;
          if (res.SUCCESS) {
            this.tableData = res.DATA_LIST;
            for (let i in this.formData) {
              this.formData[i] = res.DATA_INFO[i];
            }
          } else {
            this.$message.warning(res.MESSAGE);
          }
        })
        .catch(err => {
          this.tableLoading = false;
        });
    },
    close() {
      this.dialogFormVisible = false;
      this.reset();
    },
    reset() {
      for (let i in this.formData) {
        this.formData[i] = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
}
</style>

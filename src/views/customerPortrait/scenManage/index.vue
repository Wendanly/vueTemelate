<template>
  <div class="wrap">
    <div class="search">
      <el-select
        class="fuzzy-query"
        size="mini"
        v-model="serarchCondition.iop_type"
        placeholder="建设主体"
        clearable
        @change="getList('search')"
      >
        <el-option
          v-for="(item,index) in iopTypeList"
          :key="index"
          :label="item.DIM_NAME"
          :value="item.DIM_ID"
        ></el-option>
      </el-select>
      <el-select
        class="fuzzy-query"
        size="mini"
        v-model="serarchCondition.status"
        placeholder="场景状态"
        clearable
        @change="getList('search')"
      >
        <el-option
          v-for="(item,index) in sceneStatusList"
          :key="index"
          :label="item.DIM_NAME"
          :value="item.DIM_ID"
        ></el-option>
      </el-select>
      <el-input
        @keyup.enter.native="getList('search')"
        class="fuzzy-query"
        size="mini"
        v-model="serarchCondition.scene_id"
        placeholder="场景编码"
        clearable
        :maxlength="maxlength"
      ></el-input>
      <el-input
        @keyup.enter.native="getList('search')"
        class="fuzzy-query"
        size="mini"
        v-model="serarchCondition.scene_name"
        placeholder="场景名称"
        clearable
        :maxlength="maxlength"
      ></el-input>
      <el-button type="primary" @click="getList('search')" size="mini">查询</el-button>
      <div class="btn-group">
        <el-button type="primary" size="mini" @click="add">新增</el-button>
      </div>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="tableLoading"
        :height="`calc(100vh - ${$TABLEHEIGHT}px)`"
      >
        <el-table-column prop="SCENE_ID" show-overflow-tooltip label="场景编码"></el-table-column>
        <el-table-column prop="SCENE_NAME" show-overflow-tooltip label="场景名称"></el-table-column>
        <el-table-column prop="STATUS_NAME" label="场景状态"></el-table-column>
        <el-table-column prop="SCENE_HEAT" width="150" sortable>
          <template slot="header" slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="按照场景被画像引用的次数" placement="right">
              <span>场景热度</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="TEMP_ID2" show-overflow-tooltip width="150" label="优秀活动编码"></el-table-column>
        <el-table-column prop="TEMP_ID3" show-overflow-tooltip width="150" label="优秀活动名称"></el-table-column>
        <el-table-column prop="TEMP_ID4" width="150" sortable>
          <template slot="header" slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="场景关联营销互动的办理成功率取最大" placement="right">
              <span>画像效果</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="TEMP_ID5" show-overflow-tooltip width="150" label="热门画像推荐"></el-table-column>
        <el-table-column prop="IOP_TYPE_NAME" show-overflow-tooltip label="建设主体"></el-table-column>
        <el-table-column prop="CLASS_NAME" width="150" show-overflow-tooltip label="一级场景分类"></el-table-column>
        <el-table-column prop="CLASS_NAME2" width="150" show-overflow-tooltip label="二级场景分类"></el-table-column>
        <el-table-column prop="OPER_DATE" width="150" label="创建时间"></el-table-column>
        <el-table-column prop="OPER_ID" label="操作人" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
            <el-button type="text" size="mini" @click="copy(scope)">复制</el-button>
            <el-button type="text" size="mini" @click="showInfo(scope)">详情</el-button>
            <el-button type="text" size="mini" @click="updateStatus(scope)">{{getStatus(scope)}}</el-button>
            <el-button type="text" size="mini" v-if="scope.row.STATUS != '1'" @click="del(scope)">删除</el-button>
            <el-button type="text" size="mini" v-else disabled>删除</el-button>
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
    <add ref="add"></add>
    <show ref="show"></show>
  </div>
</template>
<script>
import {
  GetSceneList,
  DoSaveAsSceneStatusInfo,
  DoDelAsSceneInfo
} from "@/api/scenManage.js";
import { GetDicInfo } from "@/api/commonApi.js";
export default {
  name: "scenManage",
  components: {
    add: () => import(/* webpackChunkName :"scenManageAdd" */ "./add"),
    show: () => import(/* webpackChunkName :"scenManageShow" */ "./show")
  },
  data() {
    return {
      maxlength: 50,
      tableData: [],
      total: 0, //总条数
      page: 1,
      rows: this.$PAGE_SIZES[0], // 初始化每页展示多少条
      tableLoading: false,
      sceneStatusList: [], //场景状态
      iopTypeList: [], // 建设主体
      serarchCondition: {
        iop_type: "",
        status: "",
        scene_id: "",
        scene_name: ""
      }
    };
  },
  provide() {
    return {
      getParentList: this.getList
    };
  },
  created() {
    this.getList();
    GetDicInfo({
      dic_type: "IOP_TYPE#SCENE_STATUS"
    })
      .then(res => {
        if (res.SUCCESS == "true") {
          this.sceneStatusList = res.SCENE_STATUS;
          this.iopTypeList = res.IOP_TYPE;
        } else {
        }
      })
      .catch(err => {});
  },
  methods: {
    add() {
      // console.log(this.$options.data().serarchCondition);
      this.$refs.add.open("add");
    },
    edit(rowInfo) {
      this.$refs.add.open("edit", rowInfo.row);
    },
    copy(rowInfo) {
      this.$refs.add.open("copy", rowInfo.row);
    },
    showInfo(rowInfo) {
      this.$refs.show.open(rowInfo.row);
    },
    getStatus(scope) {
      if (scope.row.STATUS == "0") {
        return "上线";
      } else if (scope.row.STATUS == "1") {
        return "下线";
      }
    },
    updateStatus(scope) {
      let status = scope.row.STATUS;
      let tmpStatus = "";
      let message = status == "0" ? "上线" : "下线";
      if (status == "0") {
        tmpStatus = "1";
      } else if (status == "1") {
        tmpStatus = "2";
      }
      this.$confirm(
        `[${scope.row.SCENE_ID}]该场景确定是否${message}？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: "warning"
        }
      )
        .then(() => {
          DoSaveAsSceneStatusInfo({
            scene_id: scope.row.SCENE_ID,
            status: tmpStatus
          }).then(res => {
            this.getList();
          });
        })
        .catch(() => {});
    },
    del(scoped) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      })
        .then(() => {
          DoDelAsSceneInfo({
            scene_id: scoped.row.SCENE_ID
          })
            .then(res => {
              this.getList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    getList(from) {
      //清空子节点
      if (from == "search") {
        this.page = 1;
        this.rows = this.$PAGE_SIZES[0];
      }
      this.tableLoading = true;
      GetSceneList({
        page: this.page,
        rows: this.rows,
        ...this.serarchCondition
      })
        .then(res => {
          this.tableLoading = false;
          if (res.SUCCESS) {
            this.tableData = res.DATA_LIST;
            this.total = res.TOTAL;
          } else {
            this.$message.warning(res.MESSAGE);
          }
        })
        .catch(err => {
          this.tableLoading = false;
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.rows = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

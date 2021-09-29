<template>    
  <el-table border style="width: 100%"  v-bind="$attrs" v-on="$listeners">
    <!-- 多选 -->
    <el-table-column v-if="settings.selection" type="selection" width="45"></el-table-column>
    <!-- 序号 -->
    <el-table-column v-if="settings.hasIndex" type="index" :index="1" align="center"></el-table-column>
    <!-- 单选 -->
    <el-table-column v-if="settings.singleChoose" width="45">
      <template slot-scope="scope">
        <el-radio
          @change="$emit('selection-change',scope)"
          v-model="radio"
          :label="scope.$index"
        >{{''}}</el-radio>
      </template>
    </el-table-column>
    <template v-for="(item,index) in colList">
      <el-table-column
        v-if="item.slot"
        :key="index"
        show-overflow-tooltip
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :fixed="item.fixed"
        :align="item.align"
      >
        <template slot-scope="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="index"
        show-overflow-tooltip
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :fixed="item.fixed"
        :align="item.align"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
/*
使用示例：
     colList: [
        {
          prop: "APP_ID",
          label: "服务编码"
        },
        {
          prop: "STATUS_NAME",
          label: "状态",
          slot: "STATUS_NAME"
        },
        {
          prop: "REMARK",
          label: "服务描述"
        },
        {
          prop: "",
          label: "操作",
          slot: "operation"
        }
      ]
 
 <Table
        :data="tableData"
        :colList="colList"
        :settings="{
        singleChoose:true
      }"
        @selection-change="selectionChange"
      >
        <template #STATUS_NAME="{scope}">
          <span :class="[scope.row.STATUS != '1'?'':'run']">{{scope.row.STATUS_NAME}}</span>
        </template>
        <template #operation="{scope}">
          <el-button
            type="text"
            size="mini"
            @click="updateStatus(scope)"
            :class="[scope.row.STATUS == '1'?'stop':'run']"
          >{{scope.row.STATUS == '1'?'停用':'启用'}}</el-button>
        </template>
      </Table>

*/
export default {
  name: "Table",
  props: {
    colList: {
      type: Array,
      default() {
        return [];
      }
    },
    selection: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      radio: "1"
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang='scss' scoped>
//表格样式修改
.el-table {
  //表头高度，背景色
  th {
    background: #fafafa;
    padding: 6px 0;
  }

  //内容高度
  td {
    padding: 8px 0;
  }
}
</style>


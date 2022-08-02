<template>

  <div class="goods">
    <!-- 搜索区域 -->
    <div class="header">
      <el-input  v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!-- 表格区域展示视图 -->
    <div class="wrapper">
      <el-table
          :data="classList"
          border
          style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="类别ID" width="100px"></el-table-column>
        <el-table-column prop="class_name" label="类别名称" width="100px"></el-table-column>
        <el-table-column width="100px" prop="icon" label="图标"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
  </div>
</template>

<script>

export default {

  name: "WaresClass",
  data(){
    return{
      input:'',
      classList: []
    }
  },
  mounted() {
    this.$api.food.findClassList("/food/classification_list")
        .then(res => {
          this.classList=res;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);

    },
    handleDelete(index, row) {
      console.log(index, row);
    }

  }
}
</script>

<style scoped>

</style>
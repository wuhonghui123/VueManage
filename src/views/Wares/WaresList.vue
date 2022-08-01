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
          :data="foodList"
          border
          style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="100px"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="100px"></el-table-column>
        <el-table-column width="100px" prop="price" label="商品价格"></el-table-column>
        <el-table-column width="100px"  prop="sale"  label="商品销量"></el-table-column>
<!--        <el-table-column width="120px"  prop="category"   label="规格类目"></el-table-column>-->
        <el-table-column  prop="food_img"  label="商品图片"></el-table-column>
        <el-table-column  prop="like_num"  label="喜欢人数"></el-table-column>
        <el-table-column prop="desc"  label="商品描述"></el-table-column>
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
  name: "WaresList",
  data(){
    return{
      input:'',
      foodList: []
    }
  },
  mounted() {
      this.$api.food.findFoodlist("food/list")
          .then(res => {
            this.foodList=res;
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

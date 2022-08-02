<template>
  <div style="background-color: white;width:85%; height: 90%;position: absolute">
    <el-steps :active="1" align-center finish-status="success" style="margin-top: 50px">
      <el-step title="提交订单" description="2022-08-01 14:55:27"/>
      <el-step title="支付订单" />
      <el-step title="平台发货" />
      <el-step title="确认收获" />
      <el-step title="完成评论" />
    </el-steps>
    <div style="border:1px solid #E5E5E5;width: 90%;margin-left: 5%;margin-top: 5%">
      <span style="margin-left:5%">收获人信息</span>
      <br/>
      <el-table border :data="SearchOrder" style="width: 96%;height: 96%;margin: 2% 0 2% 2%">
        <el-table-column prop="order_id" label="收货人姓名"/>
        <el-table-column prop="food_name" label="手机号码" />
        <el-table-column prop="food_price" label="收货地址"/>
      </el-table>
    </div>
    <div style="border:1px solid #E5E5E5;width: 90%;margin-left: 5%;margin-top: 2%">
      <span style="margin-left:5%">商品信息</span>
      <br/>
      <el-table border :data="SearchOrder" style="width: 96%;height: 96%;margin: 2% 0 2% 2%">
        <el-table-column prop="order_id" label="商品图片"/>
        <el-table-column prop="food_name" label="商品名称" />
        <el-table-column prop="food_price" label="商品价格"/>
        <el-table-column prop="food_num" label="商品数量"/>
        <el-table-column prop="{food_price*food_num}" label="小计"/>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  name: "OrderDetails",
  computed:{
    SearchOrder(){
      let tree = this.$store.getters.getSearchOrder;
      console.log(tree);
      return tree;
    }
  }
}
</script>

<style scoped>
::v-deep .el-table th,
::v-deep .el-table td{
  text-align: center !important;
}
</style>
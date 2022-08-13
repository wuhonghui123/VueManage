<template>
  <div style="border:1px solid #E5E5E5;width: 90%;margin-left: 5%;margin-top: 5%">
    <span style="margin-left:5%">发货列表</span>
    <br/>
    <el-table border :data="OrderUserList" style="width: 96%;height: 96%;margin: 2% 0 2% 2%">
      <el-table-column prop="order_id" label="订单编号"/>
      <el-table-column prop="user_name" label="收货人姓名"/>
      <el-table-column prop="user_phone" label="手机号码" />
      <el-table-column prop="user_address" label="收货地址"/>
      <el-table-column  label="配送人">
        <el-select v-model="delivery_man" placeholder="全部">
          <el-option lable="何忠生" value="何忠生"/>
          <el-option lable="吕翔" value="吕翔"/>
        </el-select>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "OrderShipped",
  computed:{
    OrderUserList(){
      let tree = this.$store.getters.getOrderUserList;
      console.log(tree);
      return tree;
    }
  },
  data(){
    return{
      delivery_man:null
    }
  }
}
</script>

<style scoped>

</style>
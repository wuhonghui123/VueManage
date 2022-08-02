<template>
  <div style="background-color: white" class="main">
    <div class="search" style="background-color: #ffffff;height: 230px">
      <div style="height: 50px;position: relative">
        <span style="position:absolute;font-size: 20px;margin:10px 0 0 30px"><i Class="el-icon-search"></i>筛选搜索</span>
        <el-button type="primary" style="position:relative;margin:5px 0 0 80%">重置</el-button>
        <el-button type="primary" @click="select" style="background-color: RGB(64,158,255);position:relative;margin:10px 0 0 10px">搜素查询</el-button>
      </div>

      <el-form :model="form" label-width="120px">
        <el-form-item label="输入搜索" class="lab">
          <el-input placeholder="订单编号" v-model="form.id" class="inp"/>
        </el-form-item>
        <el-form-item label="收货人" class="lab">
          <el-input placeholder="收获人姓名/手机号" v-model="form.name" class="inp"/>
        </el-form-item>
        <el-form-item label="订单状态" class="lab">
          <el-select v-model="form.status" placeholder="全部" class="inp">
            <el-option lable="待付款" value="待付款"/>
            <el-option lable="待发货" value="待发货"/>
            <el-option lable="已发货" value="已发货"/>
            <el-option lable="已完成" value="已完成"/>
            <el-option lable="已关闭" value="已关闭"/>
          </el-select>
        </el-form-item>
        <el-form-item label="订单分类" class="lab">
          <el-select v-model="form.orderClass" placeholder="全部" class="inp">
            <el-option lable="正常订单" value="正常订单"/>
          </el-select>
        </el-form-item>
        <el-form-item label="订单来源" class="lab">
          <el-select v-model="form.source" placeholder="全部" class="inp">
            <el-option lable="微信小程序" value="微信小程序"/>
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间" class="lab">
          <el-col :span="11">
            <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="提交时间"
                class="inp"
            />
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div style="background-color: red">
      <div style="background-color: white;height: 70%" Class="tab">
        <el-table  :data="OrderList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                   :stripe="stripe"

                   border style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="订单编号"/>
          <el-table-column prop="create_time" label="提交时间" />
          <el-table-column prop="user_id" label="用户账号"/>
          <el-table-column prop="order_price" label="订单金额"/>
          <el-table-column prop="pay_type" label="支付方式"/>
          <el-table-column prop="order_type" label="订单状态"/>
          <el-table-column label="操作">
            <router-link to="/index/mainContent/orderDetails"><el-button size="small" @click="search">查看订单</el-button></router-link>
            <el-button size="small" type="danger" style="margin-left: 10px" @click="dele($event)">删除订单</el-button>
          </el-table-column>
        </el-table>
        <div>
          <el-button type="primary" style="background-color: RGB(64,158,255); margin-top: 20px">批量删除</el-button>
          <span style="margin-left: 70%">共{{OrderList.length}}条</span>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              layout="prev, pager, next"
              :total="OrderList.length"
              style="margin:-35px 0 0 80%;width: 15%"/>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {reactive} from 'vue'
export default {
  name: "OrderList",
  data(){
    return {
      form:reactive({
            id:null,
            name:null,
            status:null,
            orderClass:null,
            source:null,
            time:null
          }
      ),
      id1:'1',
      stripe:true,//是否为斑马纹 table
      currentPage:1,
      pagesize:5
    }
  },
  computed: {
    OrderList() {
      let tree = this.$store.getters.getOrderList;
      return tree;
    }
  },
  methods:{
    search(){
      console.log("##########");
      this.$api.searchOrder.getOrderList("order/search",{'order_id':this.id1})
          .then(res=>{
            console.log("订单详情：", res);
            this.$store.commit("setSearchOrder",res)
          })
    },
    select(){
      this.$api.orderList.selectOrderList("order/list",{'id':this.form.id,'user_id':this.form.name,'order_type':this.form.status,'pay_type':this.form.source,'create_time':this.form.time})
          .then(res=>{
            console.log("订单信息：", res);
            this.$store.commit("setOrderList",res)
          })
    },
    dele(s){
      var id=s.target.parentNode.parentNode.parentNode.parentNode.children[1].textContent
      this.$api.orderList.selectOrderList("order/delete",{'id':id})
          .then(res=>{
            console.log("订单信息：", res);
            this.$store.commit("setOrderList",res)
          })
    },
    handleSizeChange(val) {
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
}
</script>

<style scoped>
.lab{
  width:400px;
  padding: 20px 0 0 40px;
  float: left;
}
.inp{
  width: 205px;
  float: left;
}
.search{
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 1px solid #E5E5E5;
}
.main{
  position: absolute;
}
::v-deep .el-table th,
::v-deep .el-table td{
  text-align: center !important;
}
.tab{
  width: 97.5%;
  height: 95%;
  position: absolute;
  top: 300px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>

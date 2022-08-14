<template>
  <div>
    <div class="wrapper">
      <el-table
          :data="commendList"
          border
          :stripe="stripe"
          style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="commend_id" label="评论ID" width="100px"></el-table-column>
        <el-table-column prop="nickName" label="昵称" width="140px"></el-table-column>
        <el-table-column width="140px" prop="order_id" label="订单ID"></el-table-column>
        <el-table-column prop="stars" label="评分" width="140px"></el-table-column>
        <el-table-column prop="comments" label="评论" width="140px"></el-table-column>
        <el-table-column width="180px" prop="comments_time" label="评论时间"></el-table-column>
        <el-table-column prop="storeReply" label="商家回复" width="140px"></el-table-column>
        <el-table-column prop="storeReply_time" label="商家回复时间" width="140px"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">追评</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog title="追评" v-model="ChangedialogFormVisible" width="800px" >
    <el-form :model="commendfrom">
      <el-form-item label="编号:" >
        <span>{{commendfrom.commend_id}}</span>
      </el-form-item>
      <el-form-item label="追评:" >
        <!--        <input></input>-->
        <el-input v-model="commendfrom.storeReply" ></el-input>
      </el-form-item>
    </el-form>
    <div  class="dialog-footer">
      <!--      添加函数-->
      <el-button @click="ChangedialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updatefood">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

import * as loading from "element-plus/es/components/notification/src/notify";

export default {
  name: "CommentList",
  data() {
    return {
      commendList: [
        {
          commend_id:'',
          nickName:'',
          order_id:'',
          stars:'',
          comments:'',
          comments_time:'',
          storeReply:'',
          storeReply_time:"",
        }
      ],
      stripe:true,//是否为斑马纹 table
      currentPage:1,
      pagesize:10,
      ChangedialogFormVisible: false,
      DeletedialogFormVisible:false,
      commendfrom:{
        commend_id:'',
        storeReply:'',
        index:''
      },

    }
  },
  methods: {
    //点击赋值
    handleEdit(index, row) {
      console.log(index, row);
      console.log(row.commend_id);
      this.commendfrom.commend_id=row.commend_id;
      this.commendfrom.storeReply=row.storeReply;
      this.commendfrom.index=index
      this.ChangedialogFormVisible = true;

    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row);
    },
    handleSizeChange(val) {
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    updatefood(){
      //追评
      this.$api.commend.updateCommend("/commend/update",this.commendfrom).then(res=>{
            console.log(res);
            setTimeout(() => {
              loading.close();
            }, 1000);
            //可添加修改成功提示窗口
          }
      ).catch(err=>{
        console.log(err);
        //可添加删除失败提示窗口
      });
      this.commendList[this.commendfrom.index].storeReply=this.commendfrom.storeReply;
      this.ChangedialogFormVisible = false;
    },

  },
  mounted() {
    //获取评论列表
    this.$api.commend.findCommendlist("commend/list")
        .then(res => {
          this.commendList = res;
        })
        .catch(err => {
          console.log(err);
        })
  },
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

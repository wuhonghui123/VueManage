<template>
  <div>
    <!--------------------------------------面包屑导航区域------------------------------------>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!------------------------------------卡片视图区域------------------------------------------>

    <el-card class="box-card">
      <!------------搜索与添加区域,el-row->gutter="20":间隔为20,el-col->span="8":长度为8------------>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索 clearable:清空数据，@clear:查询数据-->
          <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              clearable
              @clear="userlist">
            <el-button icon="el-icon-search" @click="userlist"></el-button>
          </el-input>
        </el-col>

      </el-row>
    </el-card>


    <!----------------------------------------------- 页面区域 ---------------------------------------------->
    <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]"
                   :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
                   :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>

    <el-card class="box-card">
      <!--------------------------------------------- 用户列表区域 ----------------------------------------->
      <el-table border stripe class="usertable" :data="userlist">
        <el-table-column label="序号" type="index" width="80px"></el-table-column>
        <el-tableColumn label="用户名" prop="name"></el-tableColumn>
        <el-tableColumn label="姓名" prop="nickName"></el-tableColumn>
        <el-tableColumn label="邮箱" prop="email"></el-tableColumn>
        <el-tableColumn label="电话" prop="mobile"></el-tableColumn>
        <el-tableColumn label="角色" prop="remark"></el-tableColumn>
        <el-tableColumn label="状态" prop="status" ></el-tableColumn>
        <el-tableColumn label="操作" width="220px"></el-tableColumn>
      </el-table>
    </el-card>
  </div>
</template>

<script>



export default {
  name: "UserList",
  data (){
    return{
      // 监听 page size 改变的事件
      handleSizeChange (newSize) {
        this.queryInfo.pagesize = newSize
        this.userlist()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (newPage) {
        this.queryInfo.pagenum = newPage
        this.userlist()
      },

      // 定义获取用户列表参数（queryInfo），query:查询，pagenum:当前页数，pagesize:当前每页显示多少条数据
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userlist:[
        {
          id:'',
          name:'',
          email:'',
          mobile:"",
          remark:'',
          nickName:'',
          avatar:'',
          salt:'',
          password:'',
          status:'',
          dept_id:'',
          create_by:'',
          create_time:'',
          last_update_by:'',
          last_update_time:'',
          del_flag:''
        }
      ],

    }
  },
  mounted() {
    this.$api.user.findAlluser("user/findAlluser")
        .then(res => {
          this.userlist = res;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })

  },
  methods:{
  }
}
</script>

<style scoped>

</style>
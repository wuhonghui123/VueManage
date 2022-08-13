<template>
  <div>
    <!--------------------------------------面包屑导航区域------------------------------------>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!------------------------------------卡片视图区域------------------------------------------>

    <el-card class="box-card">
      <!------------搜索与添加区域,el-row->gutter="20":间隔为20,el-col->span="8":长度为8------------>
      <el-row :gutter="20" >
        <el-col :span="6" :model="queryInfo">
          <!-- 搜索 clearable:清空数据，@clear:查询数据-->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="findAlluser">
            <el-button icon="el-icon-search" @click="findAlluser" ></el-button>
          </el-input>
        </el-col>
        <!--------------------------- 添加用户 -------------------------------->

        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>

        <!-- 添加用户的对话框 -->
        <el-dialog v-model="addDialogVisible" title="添加用户" width="50%" :before-close="handleClose" >
          <!-- 内容主体区域 -->
          <el-form ref="insertUser" :model="addForm" :rules="addFormRules" label-width="70px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="名字" prop="nickName">
              <el-input v-model="addForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="insertUser">确定</el-button>
      </span>
          </template>
        </el-dialog>
      </el-row>
    </el-card>

    <!----------------------------------------------- 页面区域 ---------------------------------------------->
    <el-card class="box-card">
      <!--------------------------------------------- 用户列表区域 ----------------------------------------->
      <el-table border stripe class="usertable" :data="userlist">
        <el-table-column label="序号" type="index" width="80px"></el-table-column>
        <el-tableColumn label="用户名" prop="name"></el-tableColumn>
        <el-tableColumn label="姓名" prop="nickName"></el-tableColumn>
        <el-tableColumn label="邮箱" prop="email"></el-tableColumn>
        <el-tableColumn label="电话" prop="mobile"></el-tableColumn>
        <el-tableColumn label="角色" >
          <template v-slot="scope">
            {{scope.row.sysUserRole.sysRole.remark}}
          </template>
        </el-tableColumn>
        <el-tableColumn label="状态" >
          <template v-slot="aa">
            <el-switch v-model="aa.row.status"></el-switch>
          </template>
        </el-tableColumn>
        <el-tableColumn label="操作" width="220px">
          <template v-slot="caozuo">
          <!-------------------------------- 修改用户按钮 ---------------------------------->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateUserduihuak=(caozuo.row.id)"></el-button>
          <!-- 修改用户的对话框 -->
          <el-dialog v-model="updateUserduihuak" title="修改用户密码" width="50%" :before-close="handleClose" >
            <!-- 内容主体区域 -->

            <el-form ref="updateUser" :model="updateForm" label-width="70px">
              <el-form-item label="编号:" >
                <span>{{updateForm.id}}</span>
              </el-form-item>
              <el-form-item label="原密码:" >
                <span>{{updateForm.password}}</span>
              </el-form-item>
<!--              <el-form-item label="原密码" prop="password">-->
<!--                <el-input v-model="updateForm.password"></el-input>-->
<!--              </el-form-item>-->
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="updateForm.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="confirmPassword">
                <el-input v-model="updateForm.confirmPassword"></el-input>
              </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUserduihuak = false">取消</el-button>
        <el-button type="primary" @click="updateuser">确定</el-button>
      </span>
            </template>
          </el-dialog>

          <!------------------------------- 删除用户按钮 ------------------------------>

            <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteUserAction(caozuo.row)" ></el-button>

          <!---------------分配角色按钮,tooltip:提示框,enterable:自动隐藏 -------------->

            <el-button type="warning" icon="el-icon-setting" size="mini" title="分配角色" @click="addUserRole=true"></el-button>

            <!--------------------------------------分配角色的对话框---------------------------------------->

          <el-dialog v-model="addUserRole" title="修改角色" width="500px"  >

              <el-select v-model="userlist.id" placeholder="请选择">
                <el-option
                    v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>

              <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="addUserRole = false">取消</el-button>
                    <el-button type="primary" @click="addrole">确定</el-button>
                  </span>
              </template>
            </el-dialog>
          </template>
        </el-tableColumn>
      </el-table>

      <!---------------------列表分页------------------------->
      <!--    <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]"-->
      <!--                   :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"-->
      <!--                   :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">-->
      <!--    </el-pagination>-->

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.prop="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="20">
      </el-pagination>


    </el-card>


  </div>
</template>

<script>

  export default {
  name: "UserPage",
  data (){
    return{

      //角色管理
      value:'',
      options: [{
        value: '选项1',
        label: '超级管理员'
      }, {
        value: '选项2',
        label: '项目经理'
      }, {
        value: '选项3',
        label: '开发人员'
      }, {
        value: '选项4',
        label: '测试人员'
      }],


      //控制添加角色对话框的显示和隐藏
      addUserRole:false,
      // dialogFormVisible: false,

      //控制修改用户对话框的显示和隐藏
      updateUserduihuak:false,

      // 控制添加用对话框的显示和隐藏，默认false,表示隐藏对话框
      addDialogVisible: false,
      // 添加用户的表单数据对象
      addForm:
        {
        name: '',
        nickName: '',
        password: '',
        email:'',
        mobile:'',
        salt:'',
        avatar: '',
        status:'',
        deptId:'',
        delFlag:''
      },
      // 添加表单的验证规则对象
      // addFormRules: {
      //   name: [
      //     {
      //       required: true,
      //       message: '请输入用户名',
      //       trigger: 'blur'
      //     },
      //     {
      //       min: 1,
      //       max: 10,
      //       message: '用户名的长度在 1 - 10个字符之间',
      //       trigger: 'blur'
      //     }
      //   ],
      //   nickName: [
      //     {
      //       required: true,
      //       message: '请输入名字',
      //       trigger: 'blur'
      //     },
      //     {
      //       min: 2,
      //       max: 4,
      //       message: '用户名的长度在 2-4个字符之间',
      //       trigger: 'blur'
      //     }
      //   ],
      //   password: [
      //     {
      //       required: true,
      //       message: '请输入密码',
      //       trigger: 'blur'
      //     },
      //     {
      //       min: 6,
      //       max: 15,
      //       message: '密码的长度在 6 - 15个字符之间',
      //       trigger: 'blur'
      //     }
      //   ],
      //   email: [
      //     {
      //       required: true,
      //       message: '请输入邮箱',
      //       trigger: 'blur'
      //     }
      //   ],
      //   mobile: [
      //     {
      //       required: true,
      //       message: '请输入手机号',
      //       trigger: 'blur'
      //     },
      //     {
      //       min: 11,
      //       max: 11,
      //       message: '手机号长度在11个字符',
      //       trigger: 'blur'
      //     }
      //   ]
      // },

      //修改用户密码表单
      updateForm:{

      },



      // 定义获取用户列表参数（queryInfo），query:查询，pagenum:当前页数，pagesize:当前每页显示多少条数据
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },


      //从下面的渲染到的数据放在数组里来
      userlist:[],

    }
  },
  mounted() {
    this.$api.user.findAlluser("user/findAlluser",this.queryInfo)
        .then(res => {
          this.userlist = res;//获取到的数据放到userlist中
          console.log(res);

        })
        .catch(err => {
          console.log(err);
        })

  },
  methods:{

    //分页功能
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },

    //监听 page size 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.userlist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.userlist()
    },

    //确定是否删除用户，确定执行删除
    DeleteUserAction(a) {
      console.log("该用户的ID为"+a.id);

      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.$api.user.deleteUser("user/deleteUser",{"id":a.id})
        .then(res => {
          this.userlist = res;})//获取到的数据放到userlist中)
        if (res.meta.status !== 200) {
          return this.$message.error('删除用户失败！')
        }
      });
    },

    insertUser(){
      // console.log(addForm);
      this.$api.user.insertUser("/user/insertUser",this.addForm)
      .then(res=>{
        console.log(res);
        this.addDialogVisible=false;
        this.userlist=res;//刷新列表
        // // this.addForm=res

      })
    },

    //修改用户密码
    updateuser(c){
      console.log(c.id);
      // this.$api.user.updateUser("/user/updateUser",{"id":c.id})
      // .then((res)=>{
      //   this.updateUserduihuak=false;
      //   this.addForm=res;
      //   console.log(res);
      // })

      // this.$api.user.findAlluser("/user/findAlluser",(id) => {
      //   if (id) {  //合法
      //     if (this.updateForm.newPassword !== this.updateForm.confirmPassword) {
      //       this.$message.error("2次输入的新密码不相同")
      //       return false
      //     }
          this.$api.user.updateUser("/user/updateUser", this.updateForm).then(res => {
            if (res.code === '200') {
              this.$message.success("修改成功")
              this.$store.commit("logout")
            } else {
              this.$message.error(res.msg)
            }
          })
        // }
      // })

    }
  }
}
</script>

<style scoped>

</style>
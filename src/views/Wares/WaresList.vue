<template>
  <div class="goods">
    <!-- 搜索区域 -->
    <div class="header">
      <el-select v-model="input" placeholder="选择类别">
        <el-option
            v-for="item in ClassList"
            :key="item.id"
            :label="item.class_name"
            :value="item.id"
        />
      </el-select>
      <el-button type="primary" @click="findFood">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!-- 表格区域展示视图 -->
    <table class="userTable">
      <tr>
        <th>商品ID</th>
        <th>商品名称</th>
        <th>商品价格</th>
        <th>商品销量</th>
        <th>商品类别</th>
        <th>状态</th>
        <th width="200px">商品图片</th>
        <th>喜欢人数</th>
        <th>商品描述</th>
        <th>操作</th>

      </tr>
      <tr v-for="(food,idx) in foodList" :key="food.id">
        <td>{{food.id}}</td>
        <td>{{food.name}}</td>
        <td>{{food.price}}</td>
        <td>{{food.sale}}</td>
        <td>{{food.class_name}}</td>
        <td>
          新品<el-switch active-value=1 inactive-value=0 v-model="food.new_status" /><br>
          上架<el-switch active-value=1 inactive-value=0 v-model="food.publish_status" /><br>
          推荐<el-switch active-value=1 inactive-value=0 v-model="food.recommend_status" />
          </td>
        <td>
<!--          {{food.food_img}}-->
          <el-image :src="food.food_img" /></td>
        <td>{{food.like_num}}</td>
        <td>{{food.desc}}</td>
        <el-button @click="changeUser(idx)">编辑</el-button>
        <el-button @click="deleteUser(idx)">删除</el-button>
      </tr>
    </table>
  </div>

  <!--//修改商品信息界面-->
  <el-dialog title="修改商品信息！！！" v-model="ChangedialogFormVisible" width="800px" >
    <el-form :model="foodfrom">
      <el-form-item label="编号:" >
        <span>{{foodfrom.id}}</span>
      </el-form-item>
      <el-form-item label="名称:" >
        <!--        <input></input>-->
        <el-input v-model="foodfrom.name" ></el-input>
      </el-form-item>
      <el-form-item label="价格:" >
        <el-input v-model="foodfrom.price"></el-input>
      </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="foodfrom.class_name" placeholder="选择类别">
            <el-option label="烧烤" value="1" />
            <el-option label="烤素" value="2" />
          </el-select>
        </el-form-item>
      <el-form-item label="图片"  prop="image" style="height: 300px;width: 300px">
        <el-upload
            class="avatar-uploader"
            :action="this.uploadUrl"
            :data="this.fromup"
            :show-file-list="false"
            :on-success="handleUpImage"
            :before-upload="beforeImageUpload"
        >
          <el-image v-if="foodfrom.food_img" :src="foodfrom.food_img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">+</el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述:" >
        <el-input v-model="foodfrom.desc"></el-input>
      </el-form-item>
      <el-form-item label="新品:" >
        <el-switch active-value=1
                   inactive-value=0 v-model="foodfrom.new_status" />
      </el-form-item>
      <el-form-item label="上架:" >
        <el-switch active-value=1
                   inactive-value=0 v-model="foodfrom.publish_status" />
      </el-form-item>
      <el-form-item label="推荐:" >
        <el-switch active-value=1 inactive-value=0 v-model="foodfrom.recommend_status" />
      </el-form-item>
    </el-form>
    <div  class="dialog-footer">
      <!--      添加函数-->
      <el-button @click="ChangedialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updatefood">确 定</el-button>
    </div>
  </el-dialog>

  <!--删除商品提示界面-->
  <el-dialog title="是否删除商品???" v-model="DeletedialogFormVisible" width="360px">
    <el-form :model="foodfrom">
      <el-form-item label="编号:">
        <span>{{foodfrom.id}}</span>
      </el-form-item>
      <el-form-item label="名称:">
        <span>{{foodfrom.name}}</span>
      </el-form-item>
    </el-form>
    <div  class="dialog-footer">
      <!--      添加函数-->
      <el-button @click="DeletedialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteFood">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
import {ElMessage} from "element-plus";

export default {
  name: "WaresList",
  data(){
    return{
      input:'',
      ClassList:[{
          id:'1',
          class_name:'烧烤'
        },
        {
          id:'2',
          class_name:'烤素'
        },
        {
          id:'3',
          class_name:'热销'
        },
        {
          id:'7',
          class_name:'酒水'
        },
        {
          id:'8',
          class_name:'主食'
        },
        {
          id:'9',
          class_name:'炒饭'
        },
        {
          id:'10',
          class_name:'炒面'
        },
        {
          id:'11',
          class_name:'新品'
        }
        ],
      foodList: [
        {
          id:'',
          food_img:'',
          desc:'',
          price:'',
          sale:'',
          class_name:'',
          name:'',
          publish_status:"",
          recommend_status:"",
          new_status:"",
          like_num:''
        }
      ],
      DeleteIdx:'',
      updateIdx:'',
      ChangedialogFormVisible: false,
      DeletedialogFormVisible:false,
      loading: false,
      foodfrom:
        {
          id:'',
          food_img:'',
          desc:'',
          price:'',
          class_name:'',
          name:'',
          publish_status:'',
          recommend_status:'',
          new_status:''
        },
      uploadUrl: 'https://www.imgurl.org/api/v2/upload',
      fromup:{
        uid:'373a616dd3f76daa844907d0d1e0d551',
        token:'ec8037840340973db13559825482ad7b'
      }
    }
  },
  mounted() {
      this.$api.food.findFoodlist("food/list")
          .then(res => {
            this.foodList = res;
            // console.log(this.foodList);
          })
          .catch(err => {
            console.log(err);
          })
  },
  methods: {
    changeUser(idx){
      //调用赋值函数.
      this.updateIdx=idx;
      this.foodListTofoodFrom(idx);
      this.ChangedialogFormVisible = true;
    },

    beforeImageUpload(rawFile){
      if(rawFile.size / 1024 / 1024 > 10){
        ElMessage.error("单张图片大小不能超过10MB!");
        return false;
      }
      return true;
    },
    handleUpImage(res){
      console.log(res);
      this.foodfrom.food_img = res.data.url;
    },
    updatefood(){
      //进行交互
      const loading = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: '加载中,请等待',//显示在加载图标下方的加载文案
        spinner: 'el-icon-loading',//自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.8)',//遮罩层颜色
        // target: document.querySelector('')//loading覆盖的dom元素节点
      });
      this.$api.food.updatefood("/food/update_food",this.foodfrom).then(res=>{
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
      this.ChangedialogFormVisible = false;
    },
    findFood(){
      var url = "food/listtwo?id="+this.input;
      this.$api.food.findfood(url)
          .then(res => {
            this.foodList=[];
            this.foodList = res;
            // console.log(this.foodList);
          })
          .catch(err => {
            console.log(err);
          })
    },
    deleteUser(idx){
      this.foodListTofoodFrom(idx);
      this.DeleteIdx=idx;
      this.DeletedialogFormVisible=true;
    },
    deleteFood(){
      const loading = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: '加载中,请等待',//显示在加载图标下方的加载文案
        spinner: 'el-icon-loading',//自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.8)',//遮罩层颜色
      });
      this.$api.food.deletefood("/food/delete_food",this.foodfrom).then(res=>{
            // console.log(res);
            setTimeout(() => {
              loading.close();
            }, 1000);
            loading.close();
            this.foodList.splice(this.DeleteIdx,1);
            alert("删除成功"+res);
            //可添加修改成功提示窗口
          }
      ).catch(err=>{
        console.log(err);
        //可添加删除失败提示窗口
      });
      this.DeletedialogFormVisible=false;
    },
    foodListTofoodFrom(index){
      var a = String(this.foodList[index].publish_status);
      var b = String(this.foodList[index].new_status);
      var c = String(this.foodList[index].recommend_status);
      this.foodfrom.id=this.foodList[index].id;
      this.foodfrom.name=this.foodList[index].name;
      this.foodfrom.food_img=this.foodList[index].food_img;
      this.foodfrom.price =this.foodList[index].price;
      this.foodfrom.class_name=this.foodList[index].class_name;
      this.foodfrom.publish_status=a;
      this.foodfrom.new_status=b;
      this.foodfrom.recommend_status=c;
    }

  }
}
</script>

<style scoped>
.userTable{
  background-color: #ffffff;
  width:1600px;
}
.userTable td,th{
  /*border: 1px solid beige;*/
  padding:5px;
}
.searchButton{
  background-color: blanchedalmond;
  width: 60px;
  height: 30px;
  /*border: 2px black solid;*/
}
body {
  margin: 0;
}
button{
  height: 40px;
  margin-left: 20px;
}
</style>

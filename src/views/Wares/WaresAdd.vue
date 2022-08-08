<template>
  <el-form :model="this.from" label-width="120px">
    <el-form-item label="菜名">
      <el-input v-model="this.from.name"/>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="this.from.price"/>
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="this.from.class_name" placeholder="选择类别">
        <el-option
            v-for="item in ClassList"
            :key="item.id"
            :label="item.class_name"
            :value="item.id"
        />
        <!--        <el-option label="烧烤" value="1"/>-->
        <!--        <el-option label="烤素" value="2"/>-->
      </el-select>
    </el-form-item>
      <el-form-item label="图片"  prop="image">
        <el-upload
            class="avatar-uploader"
            :action="this.uploadUrl"
            :data="this.fromup"
            :show-file-list="false"
            :on-success="handleUpImage"
            :before-upload="beforeImageUpload"
        >
          <el-image v-if="this.from.food_img" :src="this.from.food_img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">+</el-icon>
        </el-upload>
      </el-form-item>
    <el-form-item label="上架状态">
      <el-switch active-value=1
                 inactive-value=0 v-model="this.from.publish_status"/>
    </el-form-item>
    <el-form-item label="热销状态">
      <el-switch active-value=1
                 inactive-value=0 v-model="this.from.recommend_status"/>
    </el-form-item>
    <el-form-item label="新品状态">
      <el-switch active-value=1
                 inactive-value=0 v-model="this.from.new_status"/>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="this.from.desc" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {ElMessage} from "element-plus";

export default {
  name: "WaresAdd",
  data() {
    return {
      ClassList: [
        {
          id: '1',
          class_name: '烧烤'
        },
        {
          id: '2',
          class_name: '烤素'
        },
        {
          id: '3',
          class_name: '热销'
        },
        {
          id: '7',
          class_name: '酒水'
        },
        {
          id: '8',
          class_name: '主食'
        },
        {
          id: '9',
          class_name: '炒饭'
        },
        {
          id: '10',
          class_name: '炒面'
        },
        {
          id: '11',
          class_name: '新品'
        }
      ],
      uploadUrl: 'https://www.imgurl.org/api/v2/upload',
      from: {
        name: '',
        price: '',
        class_name: '',
        publish_status: '1',
        recommend_status: '1',
        new_status: '0',
        desc: '',
        food_img: '',
        image:''
      },
      fromup:{
        uid:'373a616dd3f76daa844907d0d1e0d551',
        token:'ec8037840340973db13559825482ad7b'
      }
    }

  },

  methods: {
    onSubmit() {
      console.log(JSON.stringify(this.from));
      // eslint-disable-next-line no-undef
      this.$api.food.addfood("/food/add_food", this.from)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
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
      this.from.food_img = res.data.url;
    },
  }
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

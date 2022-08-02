<template>
  <el-form :model="this.from" label-width="120px">
    <el-form-item label="菜名">
      <el-input v-model="this.from.name" />
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="this.from.price" />
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="this.from.class_name" placeholder="选择类别">
        <el-option label="烧烤" value="1" />
        <el-option label="烤素" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="图片">
      <el-input v-model="this.from.food_img" />
    </el-form-item>
    <el-form-item label="上架状态">
      <el-switch active-value=1
                 inactive-value=0 v-model="this.from.publish_status" />
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
      <el-input v-model="this.from.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "WaresAdd",
  data(){
    return{
      from:{
        name: '',
        price:'',
        class_name: '',
        publish_status: '1',
        recommend_status: '1',
        new_status: '0',
        desc: '',
        food_img : ''
      }
    }

  },

  methods: {
    onSubmit(){
      console.log(JSON.stringify(this.from));
      // eslint-disable-next-line no-undef
      this.$api.food.addfood("/food/add_food",this.from)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
    }

  }


}

</script>

<style scoped>

</style>

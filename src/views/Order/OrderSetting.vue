<template>
  <div>
    <el-card class="form-container" shadow="never">
      <el-form :model="orderSetting"
               ref="orderSettingForm"
               :rules="rules"
               label-width="150px">
        <el-form-item label="秒杀订单超过：" prop="flashOrderOvertime">
          <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">
            分
          </el-input>
          <span class="note-margin">未付款，订单自动关闭</span>
        </el-form-item>
        <el-form-item label="正常订单超过：" prop="normalOrderOvertime">
          <el-input v-model="orderSetting.normalOrderOvertime" class="input-width">
            60分
          </el-input>
          <span class="note-margin">未付款，订单自动关闭</span>
        </el-form-item>
        <el-form-item label="发货超过：" prop="confirmOvertime">
          <el-input v-model="orderSetting.confirmOvertime" class="input-width">
            天
          </el-input>
          <span class="note-margin">未收货，订单自动完成</span>
        </el-form-item>
        <el-form-item label="订单完成超过：" prop="finishOvertime">
          <el-input v-model="orderSetting.finishOvertime" class="input-width">
            天
          </el-input>
          <span class="note-margin">自动结束交易，不能申请售后</span>
        </el-form-item>
        <el-form-item label="订单完成超过：" prop="commentOvertime">
          <el-input v-model="orderSetting.commentOvertime" class="input-width">
            天
          </el-input>
          <span class="note-margin">自动五星好评</span>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>
<script>
const defaultOrderSetting = {
  id: null,
  flashOrderOvertime: '60分',
  normalOrderOvertime: '120分',
  confirmOvertime: '15天',
  finishOvertime: '7天',
  commentOvertime: '7天'
};
const checkTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('时间不能为空'));
  }
  console.log("checkTime",value);
  let intValue = parseInt(value);
  if (!Number.isInteger(intValue)) {
    return callback(new Error('请输入数字值'));
  }
  callback();
};
export default {
  name: 'orderSetting',
  data() {
    return {
      orderSetting: Object.assign({}, defaultOrderSetting),
      rules: {
        flashOrderOvertime:{validator: checkTime, trigger: 'blur' },
        normalOrderOvertime:{validator: checkTime, trigger: 'blur' },
        confirmOvertime: {validator: checkTime, trigger: 'blur' },
        finishOvertime: {validator: checkTime, trigger: 'blur' },
        commentOvertime:{validator: checkTime, trigger: 'blur' }
      }
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 50%;
}

.note-margin {
  margin-left: 15px;
}
</style>


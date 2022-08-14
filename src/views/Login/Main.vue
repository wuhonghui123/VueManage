<template>
  <div style="width: 85%;height: 90%;background-color: white;position: absolute">
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img src="../../assets/orderNum.png" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">7</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img src="../../assets/today.png" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥132.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img src="../../assets/history.png" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥1498.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img src="../../assets/history.png" class="total-icon">
            <div class="total-title">总销售额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(7)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(3)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(5)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(2)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待评价订单</span>
              <span style="float: right" class="color-danger">(6)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">128</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">47</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">12307</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">4885</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
                style="float: right;z-index: 1"
                size="small"
                v-model="orderCountDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDateChange"
                :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line :data="chartData">
<!--                  :legend-visible="false"-->
<!--                  :loading="loading"-->
<!--                  :data-empty="dataEmpty"-->
<!--                  :settings="chartSettings"-->


              </ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
  </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data(){
    return{
      chartData:{
        columns: ['date', 'orderCount','orderAmount'],
        rows: [
          {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
          {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
          {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
          {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
          {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
          {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
          {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
          {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
          {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
          {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
          {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
          {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
          {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
          {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
          {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
        ]
      }
    }
  }
}
</script>

<style scoped>
.total-layout {
  width: 90%;
  margin: 20px 0 0 5%;
}
.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}
.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}
.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}
.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}
.un-handle-layout {
  width: 90%;
  margin: 20px 0 0 5%;
  border: 1px solid #DCDFE6;
}
.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #F2F6FC;
  font-weight: bold;
}
.un-handle-content {
  padding: 20px 40px;
}
.un-handle-item {
  border-bottom: 1px solid #EBEEF5;
  padding: 10px;
}
.color-danger{
  color: red;
}
.statistics-layout {
  width: 90%;
  margin: 20px 0 0 5%;
  border: 1px solid #DCDFE6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
</style>
<template>
  <div class="fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="粉丝列表 ">
          <div
            class="block"
            v-for="item in fansList"
            :key="item.id.toString()"
            style="text-align:center;width:150px;height:190px;margin-right:60px; display:inline-block"
          >
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <p>{{item.name}}</p>
            <el-button type="primary" size="small" plain>+关注</el-button>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="userForm.per_page"
            :current-page="userForm.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝视图">
          <div style="width:600px;height:400px" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  },
  data () {
    return {
      userForm: {
        page: 1,
        per_page: 21
      },
      total: 0,
      fansList: []
    }
  },
  created () {
    this.getUserImg()
  },
  methods: {
    pager (newPage) {
      this.userForm.page = newPage
      this.getUserImg()
    },
    async getUserImg () {
      const { data: { data } } = await this.$http.get('followers', { params: this.userForm })
      console.log(data)
      this.fansList = data.results
      this.total = data.total_count
    }
  }

}
</script>

<style scoped lang='less'>
</style>

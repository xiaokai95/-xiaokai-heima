import { async } from 'q';
<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div>
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" @click="open">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="img_bottom">
            <span
              class="el-icon-star-off"
              style="cursor: pointer;"
              :class="{'red':item.is_collected}"
              @click="toggleStatus(item)"
            ></span>
            <span class="el-icon-delete" @click="delImage(item)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top:20px"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="page"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        name="image"
        :on-success="handleSuccess"
        multiple
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: { Authorization: `Bearer ${local.getUser().token}` }
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
      this.getImage()
    },
    async getImage () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      console.log(data)
      this.total = data.total_count
    },
    page (newqPage) {
      this.reqParams.page = newqPage
      this.getImage()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImage()
    },
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    async delImage (item) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨小提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${item.id}`)
        this.$message.success('删除成功')
        this.getImage()
      }).catch(() => { })
    }
  }
}
</script>

<style scoped lang = 'less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 100px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
    }
    .img_bottom {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>

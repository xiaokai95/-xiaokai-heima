<template>
  <div class="publish_image">
    <div class="default_image" @click="open">
      <img :src="value||defaultImgUrl" alt />
    </div>
    <!-- 弹框-->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              v-for="item in images"
              :key="item.id"
              :class="{selected:seletedImgUrl===item.url}"
              @click="seletedImg(item.url)"
            >
              <img :src="item.url" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px"> -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- </el-dialog> -->
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import URL from '../assets/default.png'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      images: [],
      uploadImageUrl: null,
      seletedImgUrl: null,
      defaultImgUrl: URL,
      headers: { Authorization: `Bearer ${local.getUser().token}` }

    }
  },
  methods: {
    confirmImage () {
      this.dialogVisible = false
      if (this.activeName === 'image') {
        // 素材库
        if (!this.seletedImgUrl) {
          return this.$message.warning('请选中一张图片')
        }
        // 给img的src赋值图片地址
        // this.defaultImgUrl = this.seletedImgUrl
        this.$emit('input', this.seletedImgUrl)
        this.dialogVisible = false
      } else {
        // 上传图片
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // 给img的src赋值图片地址
        // this.defaultImgUrl = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
    },
    seletedImg (url) {
      this.seletedImgUrl = url
      console.log(url)
    },
    // 上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
    },
    open () {
      this.getImage()
      this.dialogVisible = true
    },
    async getImage () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      console.log(data)
      this.total = data.total_count
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImage()
    }
  }

}
</script>

<style scoped lang='less'>
.publish_image {
  .default_image {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.img_list {
  margin-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>

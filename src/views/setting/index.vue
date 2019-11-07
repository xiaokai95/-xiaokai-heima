<template>
  <div class="setting">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form label-width="120px">
              <el-form-item label="编号:">{{userForm.id}}</el-form-item>
              <el-form-item label="手机号:">{{userForm.mobile}}</el-form-item>
              <el-form-item label="用户名称:">
                <el-input v-model="userForm.name"></el-input>
              </el-form-item>
              <el-form-item label="用户简介:">
                <el-input type="textarea" v-model="userForm.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input type="email" v-model="userForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="editUserInfo">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              name="image"
              :http-request="updatePhoto"
            >
              <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center">上传头像</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async updatePhoto (result) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果（包含文件信息）
      // 1. 获取图片文件数据
      const file = result.file
      // 2. 创建一个formData
      const formData = new FormData()
      // 3. 追加图片数据到fromData  字段名字和后台一致
      formData.append('photo', file)
      // 4. 使用axios提交数据
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 5. 拿着上传成功后的地址进行预览
      this.userForm.photo = data.photo
      // 6. 提示
      this.$message.success('修改头像成功')
      // 7. 更新home组件的photo
      eventBus.$emit('updatePhoto', data.photo)
      // 8. 更新本地存储的photo
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    },
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
      this.photo = data.photo
    },
    async  editUserInfo () {
      await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存用户信息成功')
      eventBus.$emit('userName', this.userForm.name)
      // 改本地数据
      const newUserName = local.getUser()
      newUserName.name = this.userForm.name
      local.setUser(newUserName)

      // debugger
    }

  }

}
</script>

<style scoped lang = 'less'>
</style>

<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>{{ $route.query.id?'修改文章':'发布文章' }}</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 组件 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image
              v-for="i in 3"
              :key="i"
              v-model="articleForm.cover.images[i-1]"
              style="float:left;margin-right:10px"
            ></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }

      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    const arctileId = this.$route.query.id
    if (arctileId) {
      // 修改逻辑
      // 填充表单内容
      this.getarticleStatus(arctileId)
    }
  },
  methods: {
    // 修改
    async update (draft) {
      await this.$http.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    async create (draft) {
      await this.$http.post(`/articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    async getarticleStatus (id) {
      const { data: { data } } = await this.$http.get(`articles/${id}`)
      this.articleForm = data
    }
  },
  watch: {
    // key===>被监听的(this下的)数据的字段的名字
    // value ===> 值改变后触发的函数 (newVal,oldVal) 新值  旧值
    '$route.query.id': function (newVal, oldVal) {
      if (newVal) {
        // 修改 填充表单
        this.getarticleStatus(newVal)
      } else {
        // 新建 重置表单
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  }

}
</script>

<style scoped lang='less'>
</style>

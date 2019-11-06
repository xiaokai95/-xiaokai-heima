<template>
  <div class="comment">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="commentList" style="width: 100%">
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="primary" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="commentForm.per_page"
        :current-page="commentForm.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      total: 0,
      commentForm: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      }
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    // 分页函数
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.commentForm.page = newPage
      // 重新获取数据
      this.getComment()
    },
    async getComment () {
      const { data: { data } } = await this.$http.get('/articles', { params: this.commentForm })
      this.commentList = data.results
      this.total = data.total_count
    },
    async toggleStatus (row) {
      const reminderText = row.comment_status ? '是否打开评论' : '是否关闭评论'
      this.$confirm(reminderText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发修改状态的请求
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })

        // 成功
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        // 更新当前文章的状态
        row.comment_status = data.allow_comment
      }).catch(() => { })
    }
  }
}

</script>

<style scoped lang='less'>
</style>

<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // value: null,
      options: []
    }
  },
  
  created () {
    this.getchannels()
  },
  methods: {
    fn (id) {
      if (id === '') id = null
      this.$emit('input', id)
    },
    async getchannels () {
      const { data: { data } } = await this.$http.get('channels')
      this.options = data.channels
    }
  }
}
</script>

<style>
</style>

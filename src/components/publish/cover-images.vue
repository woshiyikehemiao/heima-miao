<template>
  <div class="imglist">
      <div class="imgitem" v-for="(item,index) in imgs" :key="index" @click="showdialog(index)">
          <img :src="item?item:url" alt="">
      </div>

        <el-dialog :visible="dialogVisible" @close="closedialog">
            <select-images @selectimg='geturl'></select-images>
        </el-dialog>
  </div>

</template>

<script>
export default {
  props: ['imgs'],
  methods: {
    geturl (url) {
      this.$emit('coverimg', url, this.index)
      this.dialogVisible = false
    },
    showdialog (index) {
      this.dialogVisible = true
      this.index = index
    },
    closedialog () {
      this.dialogVisible = false
    }
  },
  data () {
    return {
      dialogVisible: false,
      index: -1,
      url: require('../../assets/img/pic_bg.png')
    }
  }
}
</script>

<style lang="less" scoped>
.imglist{
    border: 1px solid #ccc;
    display: inline-block;
    .imgitem{
        display: inline-block;
        width: 200px;
        height: 200px;
        padding: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

</style>

<template>
  <el-card class="card">
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="form">
      <el-form-item label="文章状态：">
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">草稿</el-radio>
          <el-radio :label="3">待审核</el-radio>
          <el-radio :label="4">审核通过</el-radio>
          <el-radio :label="5">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select v-model="articleSelect">
          <el-option value="1" label="a" v-for="(item,index) in list" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
          v-model="articleDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="article-number">共找到xxx条符合条件的内容</div>
    <div class="article-list">
    <div class="row" v-for="(item,index) in list" :key='index'>
        <div class="left">
            <img src="../../assets/img/avatar.jpg" alt="">
            <div class="content">
                <span class="title">这是标题</span>
                <span class="status">已发表</span>
                <span class="time">123456</span>
            </div>
        </div>
        <div class="right">
            <span><i class="el-icon-edit"></i>修改</span>
            <span><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 1,
      articleSelect: '',
      articleDate: '',
      list: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style lang="less" scoped>
.card{
    .form{
        margin-left: 40px;
    }
    .article-number{
        border-bottom: 1px dashed #ccc;
        padding-bottom: 10px;
        color: #323745;
        font-size: 14px;
    }
    .article-list{
        .row{
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            .left{
                display: flex;
                img{
                    width: 180px;
                    height: 100px;
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-left: 10px;
                    font-size: 14px;
                    color: #333;
                    .time{
                        color:#999;
                        font-size: 12px;
                    }
                }
            }
            .right{
                span{
                    margin-left: 8px;
                    color: #333;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

<template>
  <el-row>
    <el-col :span="2"><div class="grid-content"></div></el-col>
    <el-col :span="20">

      <el-button type="primary" size="medium" class="create-button" @click="createmodel">创建模型</el-button>

      <div v-for="(item, i) in modellist" :key="i">
        <el-card class="box-card" header-cell-style="background: #eef1f6">
          <div slot="header" class="clearfix">
            <span>【{{ item[0].type }}】 <strong>{{ item[0].modelname }}</strong> &nbsp;ID:{{ item[0].id }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="deletemodel">
              <i class="el-icon-delete el-icon--left"></i>
              删除模型
            </el-button>
          </div>
            <el-table
              :data="item"
              border
              style="width: 100%">
              <el-table-column
                prop="createtime"
                label="创建时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="useStage"
                label="应用场景"
                width="150">
              </el-table-column>
              <el-table-column
                prop="target"
                label="鉴别对象"
                width="150">
              </el-table-column>
              <el-table-column
                prop="description"
                label="具体描述"
                width="300">
              </el-table-column>
              <el-table-column
                prop="state"
                label="训练状态"
                width="150">
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <el-button @click="check" type="text" size="small" v-if="item[0].state=='训练完成'">校验</el-button>
                <el-button @click="check" type="text" size="small" v-if="item[0].state=='训练未完成'">查看</el-button>
                <el-button @click="createmodel" type="text" size="small">编辑</el-button>
              </el-table-column>
            </el-table>
        </el-card>
      </div>

    </el-col>
    <el-col :span="2"><div class="grid-content"></div></el-col>
  </el-row>

</template>

<script>
import axios from 'axios'
export default {
  methods: {
    createmodel() {
      this.$router.push('/ModelManager/CreateModel');
    },
    check() {
      this.$router.push('/ModelManager/TestModel');
    },
    deletemodel() {
      this.$confirm('此操作将永久删除该模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 向后端传送删除请求后端完成
        // let data = new FormData();
        // data.append('token',this.$store.getters.getToken);
        // axios.post(``, data).then(response => {}); 
        this.$router.push('/ModelManager/MyModel'); // 删除后重新进入页面初始化
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  created() {
      // 初始化时向后端发起请求，获取数据后显示在主页
      let data = new FormData();
      data.append('token',this.$store.getters.getToken);
      axios.post(`${this.generalUrl}/dashboard`, data).then(response => {
        var res = response.data;
        if (res.code == 200) {
          // console.log(res)
          // 数据库中好像还没有数据，本条模拟返回数据
          res.modelList = [
            {'id': 4832,
             'createtime':"2021-05-03",
             'username':'shadowstar',
             'modelname':'特朗普音频鉴别模型',
             'type':'特定说话人鉴别',
             'useStage':'身份判别',
             'target':'特朗普',
             'state':1,
             'description':'保护特朗普，鉴别其语音音频真伪，防止针对性深度伪造音频造成舆论危机'},
            {'id': 2393,
             'createtime':"2021-05-03",
             'username':'shadowstar',
             'modelname':'普京音频鉴别模型',
             'type':'特定说话人鉴别',
             'useStage':'身份判别',
             'target':'普京',
             'state':0,
             'description':'保护普京，鉴别其语音音频真伪，防止针对性深度伪造音频造成舆论危机'},
            {'id': 2483,
             'createtime':"2021-05-03",
             'username':'shadowstar',
             'modelname':'钟南山音频鉴别模型',
             'type':'特定说话人鉴别',
             'useStage':'身份判别',
             'target':'钟南山',
             'state':1,
             'description':'保护钟南山，鉴别其语音音频真伪，防止针对性深度伪造音频造成舆论危机'}
          ]
          this.modellist = [];
          for (var i = 0; i < res.modelList.length; i++) {
            var l = [];
            res.modelList[i].state = (res.modelList[i].state) ? "训练完成" : "训练未完成";
            l.push(res.modelList[i]);
            this.modellist.push(l);
          } 
        }
      });
  },
  data() {
    return {
      generalUrl:'http://127.0.0.1:5000',
      modellist: null,
    }
  }
  
}


</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .text {
    font-size: 14px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 30px;
  }
  
  .create-button {
    margin-top: 30px;
  }
</style>
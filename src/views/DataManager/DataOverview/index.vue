<template>
  <el-row>
    <el-col :span="3"><div class="grid-content"></div></el-col>
    <el-col :span="18">

      <el-button type="primary" size="medium" class="create-button" @click="createdataset">创建数据集</el-button>

    <!-- <div v-for="(item, i) in datasetlist" :key="i">
        <el-card class="box-card" header-cell-style="background: #eef1f6">
          <div slot="header" class="clearfix">
            <span><strong>{{ item[0].name }}</strong> &nbsp;ID:{{ item[0].id }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="deletedataset">
              <i class="el-icon-delete el-icon--left"></i>
              删除数据集
            </el-button> 
          </div> -->
          <div class ="table">
            <el-table
              :data="datasetlist"
              stripe
              :header-cell-style="{background: '#eef1f6', height: 60+'px'}"
              :row-style="{height: 100+'px'}"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width=80px>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width=150px>
              </el-table-column>
              <el-table-column
                prop="createtime"
                label="创建时间"
                width=150px>
              </el-table-column>
              <el-table-column
                prop="size"
                label="数据集大小"
                width=100px>
              </el-table-column>
              <el-table-column
                prop="state"
                label="是否标注"
                width=100px>
              </el-table-column>
              <el-table-column
                prop="description"
                label="具体描述">
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <el-button @click="check" type="text" size="small">查看</el-button>
                <el-button @click="createdataset" type="text" size="small">编辑</el-button>
                <el-button @click="deletedataset" type="text" size="small">删除</el-button>
              </el-table-column>
            </el-table>
          </div>
        <!-- </el-card>
      </div> -->

    </el-col>
    <el-col :span="3"><div class="grid-content"></div></el-col>
  </el-row>

</template>

<script>
import axios from 'axios'
export default {
  methods: {
    createdataset() {
      this.$router.push('/DataManager/DatasetCreate');
    },
    check() {
      this.$router.push('/DataManager/DataOverview');
    },
    deletedataset() {
      this.$confirm('此操作将永久删除该模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 向后端传送删除请求后端完成
        // let data = new FormData();
        // data.append('token',this.$store.getters.getToken);
        // axios.post(``, data).then(response => {}); 
        this.$router.push('/DataManager/DataOverview'); // 删除后重新进入页面初始化
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
          // 数据库中还没有数据，本条模拟返回数据
          res.datasetList = [
            {'id': 4832,
             'createtime':"2021-05-03",
             'name': '特朗普音频数据集',
             'username':'shadowstar',
             'state': 1,
             'description':'特朗普音频数据集，仅包含正样本，共1小时音频',
             'size': 500},
            {'id': 2393,
             'createtime':"2021-05-03",
             'name': '普京音频数据集',
             'username':'shadowstar',
             'state': 0,
             'description':'普京音频数据集，仅包含正样本，共1小时音频',
             'size': 345},
            {'id': 2483,
             'createtime':"2021-05-03",
             'name': '钟南山音频数据集',
             'username':'shadowstar',
             'state': 1,
             'description':'钟南山音频数据集，仅包含正样本，共1小时音频',
             'size': 646}
          ]
          this.datasetlist = res.datasetList;
          for (var i = 0; i < this.datasetlist.length; i++) {
            this.datasetlist[i].state = (this.datasetlist[i].state) ? "已标注" : "未标注";
            this.datasetlist[i].size = String(this.datasetlist[i].size) + " MB";
          } 
        }
      });
  },
  data() {
    return {
      generalUrl:'http://127.0.0.1:5000',
      datasetlist: null,
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

  .table {
    margin-top: 30px;
  }
  
  .create-button {
    margin-top: 30px;
  }
</style>
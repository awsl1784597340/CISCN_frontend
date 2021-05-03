<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <br />
      <el-form-item label="模型类别">
        <div class="style1">
        <font color="#FF0000">*</font> &emsp;
        <el-select v-model="form.type" placeholder="请选择模型类别">
          <el-option label="特定说话人鉴别" value="type1" />
        </el-select>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="模型名称">
        <div class="style1">
        <font color="#FF0000">*</font> &emsp;
        <el-input v-model="form.name" style="width:400px"/>
        </div>
      </el-form-item>
      <br />
<!--      <el-form-item label="应用场景">-->
<!--        <el-select v-model="form.application" placeholder="请选择模型应用场景">-->
<!--          <el-option label="内容审核" value="application1" />-->
<!--          <el-option label="身份判别" value="application2" />-->
<!--          <el-option label="司法取证" value="application3" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="应用场景">
        <div class="style1">
        <font color="#FF0000">*</font> &emsp;
        <el-radio-group v-model="form.application">
          <el-radio label="内容审核" value="application1"></el-radio>
          <el-radio label="身份判别" value="application2"></el-radio>
          <el-radio label="司法取证" value="application3"></el-radio>
          <el-radio label="其他" value="application4"></el-radio>
        </el-radio-group>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="鉴别对象">
        <div class="style1">
        <font color="#FFFFFF">.</font> &emsp;
        <el-input v-model="form.target" style="width:400px"/>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="具体描述">
        <div class="style1">
        <font color="#FFFFFF">.</font> &emsp;
        <el-input v-model="form.desc" type="textarea" style="width:400px" :rows="5"/>
        </div>
      </el-form-item>
      <br />
      <el-form-item>
        <div class="style1">
        <font color="#FFFFFF">.</font> &emsp;
        <el-button type="primary" @click="onSubmit">创建</el-button>
        &nbsp;
        <el-button @click="onCancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    if (this.$route.params) {
      this.form.name = this.$route.params.modelname;
      this.form.type = this.$route.params.type;
      this.form.application = this.$route.params.useStage;
      this.form.target = this.$route.params.target;
      this.form.desc = this.$route.params.description;
    }
  },
  data() {
    return {
      form: {
        name: '',
        type: '',
        application: '',
        target: '',
        desc: ''
      },
      generalUrl:'http://127.0.0.1:5000'
    }
  },
  methods: {
    onSubmit() {
      let that = this
      if(!that.form.name){
        this.$message({
          message: '请输入模型名称',
          type: 'warning'
        })
        return
      }
      if(!that.form.type){
        this.$message({
          message: '请输入模型类型',
          type: 'warning'
        })
        return
      }
      if(!that.form.application){
        this.$message({
          message: '请输入模型应用场景',
          type: 'warning'
        })
        return
      }
      let data1 = new FormData();
      data1.append('token',that.$store.getters.getToken)
      data1.append('type',that.form.type)
      data1.append('modelname',that.form.name)
      data1.append('useStage',that.form.application)
      if(that.form.target){
        data1.append('target',that.form.target)
      }else{
        data1.append('target','null')
      }
      if(that.form.desc){
        data1.append('description',that.form.desc)
      }else{
        data1.append('description','null')
      }
      axios.post(`${that.generalUrl}/updateModel`,data1).then((res)=>{
        if (res.data.code == 201){
          this.$message({
            message: '创建成功!',
            type: 'success'
          })
        }
      })
    },
    onCancel() {
      this.$message({
        message: '取消创建!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.style1 {
  float:left;
  margin-left:30px;
}
</style>


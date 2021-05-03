<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <br />
      <el-form-item label="数据类型">
        <div class="style1">
        <a>音频文件</a>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="数据集名称">
        <div class="style1">
        <el-input v-model="form.name" style="width:355px" placeholder="输入数据集名称"/>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="标注状态">
        <div class="style1">
        <el-radio-group v-model="form.state" size="medium">
            <el-radio-button label="已标注完成"></el-radio-button>
            <el-radio-button label="未标注完成" disabled></el-radio-button>
        </el-radio-group>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="具体描述">
        <div class="style1">
        <el-input v-model="form.desc" type="textarea" style="width:355px" :rows="2"/>
        </div>
      </el-form-item>
      <br />
      <el-form-item label="上传文件">
        <div class="style1">
        <el-upload
          class="upload-demo"
          drag
          action="http://127.0.0.1:5000/upload"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="style1">
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
  data() {
    return {
      uploaded: false, // 上传成功后修改为true
      form: {
        name: '',
        state: '已标注完成',
        desc: '',
      },
      generalUrl:'http://127.0.0.1:5000'
    }
  },
  methods: {
    uploadSuccess(res) {
      this.$message.success('上传成功!');
      this.uploaded = true;
    },
    beforeUpload(file) {
      const check = (file.type === 'application/x-zip-compressed') || (file.type === 'application/x-rar-compressed');
      console.log(file.type);
      if (!check) {
          this.$message.error('上传头像图片只能是 ZIP/RAR 格式!');
      }
      return check;
    },
    onSubmit() {
      let that = this
      if(!that.uploaded){
        this.$message({
          message: '请上传文件',
          type: 'warning'
        })
        return
      }
      if(!that.form.name){
        this.$message({
          message: '请输入数据集名称',
          type: 'warning'
        })
        return
      }
      if(!that.form.desc){
        this.$message({
          message: '请输入描述信息',
          type: 'warning'
        })
        return
      }
      let data1 = new FormData();
      data1.append('token',that.$store.getters.getToken)
      data1.append('name',that.form.name)
      data1.append('desc',that.form.desc)
      axios.post(`${that.generalUrl}/uploadDataset`,data1).then((res)=>{
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


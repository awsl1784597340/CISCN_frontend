<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <br />
      <el-form-item label="模型类别">
        <font color="#FF0000">*</font> &emsp;
        <el-select v-model="form.type" placeholder="请选择模型类别">
          <el-option label="特定说话人鉴别" value="type1" />
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="模型名称">
        <font color="#FF0000">*</font> &emsp;
        <el-input v-model="form.name" style="width:400px"/>
      </el-form-item>
      <br />
      <!-- <el-form-item label="应用场景">
        <el-select v-model="form.application" placeholder="请选择模型应用场景">
          <el-option label="内容审核" value="application1" />
          <el-option label="身份判别" value="application2" />
          <el-option label="司法取证" value="application3" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="应用场景">
        <font color="#FF0000">*</font> &emsp;
        <el-radio-group v-model="form.application">
          <el-radio label="内容审核" value="application1"></el-radio>
          <el-radio label="身份判别" value="application2"></el-radio>
          <el-radio label="司法取证" value="application3"></el-radio>
          <el-radio label="其他" value="application4"></el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <el-form-item label="鉴别对象">
        <font color="#FFFFFF">.</font> &emsp;
        <el-input v-model="form.target" style="width:400px"/>
      </el-form-item>
      <br />
      <el-form-item label="具体描述">
        <font color="#FFFFFF">.</font> &emsp;
        <el-input v-model="form.desc" type="textarea" style="width:400px" :rows="5"/>
      </el-form-item>
      <br />
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        &nbsp;
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        type: '',
        application: '',
        target: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      
      this.$message({
        message: '创建成功!',
        type: 'success'
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
</style>


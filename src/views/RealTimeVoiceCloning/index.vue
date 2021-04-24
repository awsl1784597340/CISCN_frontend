<template>
  <div class="outer">
    <el-card class="title-card" shadow="hover">
      <div class="title">
        <font face="bold" style="font-size: 60px;"><strong>欢迎使用语音生成功能！</strong></font>
        <br><br><br>
        <font face="YouYuan" style="font-size: 20px;">这是语音转换界面，你可以选择一段音频作为音色，并输入一段文字，我们会自动帮你生成转换后的音频。相关的信息会自动显示在两侧。</font>
      </div>
    </el-card>
<!--    <div class="title">-->
<!--      Real-time Voice Cloning 语音生成-->
<!--    </div>-->
    <el-row class="upload">
      <el-col :span="11">
        <div class="infoleft">音频文件</div>
        <div class="border" />
        <div class="border" />
        <vue-audio
          v-if="UploadUrl"
          :audio-source="UploadUrl"
          style="height: 178px;width: 360px"
        />
        <el-upload
          v-else
          class="upload-demo"
          drag
          action="http://127.0.0.1:5000/upload"
          :on-success="succs"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将音频文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">上传音频格式的文件，大小不超过5M</div>
        </el-upload>
      </el-col>
      <el-col :span="2" class="rowclass">
        <el-row>
          <el-col v-for="(i) in infocenter" :key="i" :span="6">
            <div :class="i">{{ empty }}</div>
          </el-col>
        </el-row>
        <div style="margin-top: 150px" />
        <el-button class="bottom-class" @click="convertt">
          <div>点击转换</div>
        </el-button>
      </el-col>
      <div class="inforight">文字输入</div>
      <div class="border" />
      <el-col :span="9" class="inputarea">
        <!--        <div style="margin-top: 20px;"></div>-->
        <el-input
          v-model="textarea"
          type="textarea"
          placeholder="请输入内容"
          :autosize="{ minRows: 8, maxRows: 9 }"
          resize="none"
          style="margin-left: 75px;margin-right: 75px;"
        />
      </el-col>
      <el-col :span="2">
        <div style="min-font-size: 9" />
      </el-col>
    </el-row>
    <el-row>
      <div v-if="converted_path">
        <vue-audio
          :audio-source="converted_path"
          style="height: 178px;width: 360px"
        />
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RealTimeVoiceCloning',
  data() {
    return {
      generalUrl: 'http://127.0.0.1:5000',
      UploadUrl: 0,
      fileurl:null,
      textarea: '',
      infocenter: ['infocenter1', 'infocenter1', 'infocenter1', 'infocenter1'],
      empty: null,
      converted_path:null,
      running:false
    }
  },
  methods: {
    succs(res) {
      console.log(res)
      this.UploadUrl = this.generalUrl  + res.path
      this.fileurl = res.path
      console.log(this.UploadUrl)
    },
    convertt() {
      this.infocenter[0] = 'infocenter1'
      this.infocenter[1] = 'infocenter1'
      this.infocenter[2] = 'infocenter1'
      this.infocenter[3] = 'infocenter1'
      const that = this
      that.running =true
      // console.log(that.fileurl,that.textarea)
      axios.get(`${that.generalUrl}/voice-cloning?file=${that.fileurl}&text=${that.textarea}`).then((res)=>{
        console.log(res)
        if(res.data.code === 200){
          that.converted_path = that.generalUrl + '/' + res.data.filepath
          that.running=false
          that.showResult = 1
          that.$notify({
            title: '提示',
            message: h('i', { style: 'color: teal' }, '转换完成，请浏览转换结果')
          })
        }
      })
        setTimeout(() => {
          this.infocenter[0] = 'infocenter2'
          that.refresh()
          setTimeout(() => {
            // this.infocenter[0] = "infocenter1"
            this.infocenter[1] = 'infocenter2'
            that.refresh()
            setTimeout(() => {
              // this.infocenter[1] = "infocenter1"
              this.infocenter[2] = 'infocenter2'
              that.refresh()
              setTimeout(() => {
                // this.infocenter[2] = "infocenter1"
                this.infocenter[3] = 'infocenter2'
                that.refresh()
                setTimeout(() => {
                  // this.infocenter[3] = "infocenter1"
                  that.refresh()
                }, 1000)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      const h = this.$createElement
    },
    refresh() {
      this.empty = 1
      this.empty = null
    }
  }
}
</script>

<style scoped>
  /*.title{*/
  /*  position: relative;*/
  /*  margin: 0 auto;*/
  /*  text-align: center;*/
  /*  font-size: 50px;*/
  /*  color: #ffffff;*/
  /*  !*color: transparent;*!*/
  /*  -webkit-text-stroke: 1px black;*/
  /*  letter-spacing: 0.04em;*/
  /*}*/
  .title{
    margin-top: 50px;
    margin-left: 60px;
    /*color: #ffffff;*/
    /*color: transparent;*/
    /* -webkit-text-stroke: 1px black; */
    letter-spacing: 0.04em;
  }
  .upload{
    padding-top: 50px;
  }
  .outer{
    margin:50px;
  }
  .upload-demo{
    position: relative;
    margin: 0 auto;
    text-align: center
  }
  .infocenter1{
    position: relative;
    margin: 0 auto;
    text-align: center;
    content: '';
    display: block;;
    width: 30px;
    height: 30px;
    border-top: 2px solid #999;
    border-right: 2px solid #999;
    transform: rotate(45deg);
  }
  .infocenter2{
    position: relative;
    margin: 0 auto;
    text-align: center;
    content: '';
    display: block;;
    width: 30px;
    height: 30px;
    border-top: 2px solid #999;
    border-right: 2px solid #999;
    transform: rotate(45deg);
    border-color: #20a0ff;
  }
  .rowclass{
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
  .inputarea{
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
  .bottom-class{
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
  .infoleft{
    position: relative;
    margin: 0 auto;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
  }
  .inforight{
    position: relative;
    margin: 0 auto;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
  }
  .border{
    margin-top: 50px;
  }
  .title-card{
    width: 900px;
    height: 290px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: rgb(239, 239, 239);
  }
</style>

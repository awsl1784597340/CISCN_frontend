<template>
  <div class="outer">
    <el-card class="cardd" shadow="hover">
    <el-row>
      <div class="title">
        CycleGAN 语音生成
      </div>
    </el-row>
    <el-row class="info">
      <el-col :span="11">
        <div class="infoleft">源文件</div>
        <div class="border" />
        <vue-audio
          v-if="sourceurl"
          :audio-source="sourceurl"
          style="height: 178px;width: 360px"
        />
        <el-upload
          v-else
          class="upload-demo"
          drag
          action="http://127.0.0.1:5000/upload"
          :on-success="sourcesuccs"
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
      <el-col :span="11">
        <div class="inforight">目标文件</div>
        <div class="border" />
        <vue-audio
          v-if="targeturl"
          :audio-source="targeturl"
          style="height: 178px;width: 360px"
        />
        <el-upload
          v-else
          class="upload-demo"
          drag
          action="http://127.0.0.1:5000/upload"
          :on-success="targetsuccs"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将音频文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">上传音频格式的文件，大小不超过5M</div>
        </el-upload>
      </el-col>
    </el-row>
      <el-col v-show="showResult" >
        <el-row class="result">
          <el-col :span="11">
            <el-image
              class="imagee"
              :src="sourceimage"
              fit="fit"
            />
          </el-col>
          <el-col :span="2"><div style="min-height:1px;" /></el-col>
          <el-col :span="11">
            <el-image
              class="imagee"
              :src="targetimage"
              fit="fit"
            />
          </el-col>
        </el-row>
        <div class="subtitle">
          转换结果
        </div>
        <el-row class="result">
          <el-col :span="12"><vue-audio :audio-source="targeturl" /></el-col>
          <el-col :span="12">
            <el-image
              class="imagee"
              :src="convertimage"
              fit="fit"
            />
          </el-col>
        </el-row>

      </el-col>
    </el-card>
  </div>
</template>

<script>
import sourceimage from './p225_003.png'
import targetimage from './p226_001.png'
import convertimage from './p225_003_to_p226_001.png'
export default {
  name: 'CycleGAN',
  data() {
    return {
      generalUrl: 'http://127.0.0.1:5000',
      UploadUrl: 0,
      sourceurl: null,
      targeturl: null,
      converturl: null,
      infocenter: ['infocenter1', 'infocenter1', 'infocenter1', 'infocenter1'],
      empty: null,
      showResult: 0,
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      sourceimage,
      targetimage,
      convertimage
    }
  },
  methods: {
    sourcesuccs(res) {
      console.log(res)
      this.sourceurl = this.generalUrl + res.path
      // console.log(this.UploadUrl)
    },
    targetsuccs(res) {
      console.log(res)
      this.targeturl = this.generalUrl + res.path
      // console.log(this.UploadUrl)
    },
    convertt() {
      const that = this
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
                that.showResult = 1
                that.$notify({
                  title: '提示',
                  message: h('i', { style: 'color: teal' }, '转换完成，请浏览转换结果')
                })
                setTimeout(() => {
                  this.infocenter[0] = 'infocenter1'
                  this.infocenter[1] = 'infocenter1'
                  this.infocenter[2] = 'infocenter1'
                  this.infocenter[3] = 'infocenter1'
                  that.refresh()
                }, 2000)
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
  .title{
    position: relative;
    margin: 0 auto;
    text-align: center;
    font-size: 50px;
    /*color: #ffffff;*/
    /*color: transparent;*/
    -webkit-text-stroke: 1px black;
    letter-spacing: 0.04em;
  }
  .subtitle{
    position: relative;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
    color: #ffffff;
    /*color: transparent;*/
    -webkit-text-stroke: 1px black;
    letter-spacing: 0.04em;
    padding-top: 50px;
  }

  .outer{
    margin:50px;
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
  }
  .upload-demo{
    position: relative;
    margin: 0 auto;
    text-align: center
  }
  .info{
    margin-top: 50px;
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
  .bottom-class{
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
  .rowclass{
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
.border{
  margin-top: 50px;
}
  .result{
    padding-top: 40px;
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
  .imagee{
    position: relative;
    margin: 0 auto;
    text-align: center;
    width: 50%; height: 50%
  }
  .cardd{
    height: 1200px;
    /*background-color: #20a0ff;*/
  }
</style>

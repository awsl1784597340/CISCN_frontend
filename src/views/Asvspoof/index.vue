<template>
  <div class="outer">
    <el-card class="title-card" shadow="hover">
      <div class="title">
        <font face="bold" style="font-size: 60px;"><strong>欢迎使用音频鉴伪功能！</strong></font>
        <br><br><br>
        <font face="YouYuan" style="font-size: 20px;">这是深度伪造音频鉴别界面，你可以上传任何想要鉴别的音频源，选取判别对象或数据集，我们将反馈关于该音频的分析。</font>
      </div>
    </el-card>
    <div class="mainn">
      <el-row>
        <el-col :span="8">
          <div v-if="showResult">
            <div class="textt">
              resemblyzer 频谱图
            </div>
            <el-image :src="resemblyzer" />
          </div>
          <div v-else style="min-height: 1px" />
        </el-col>
        <!--        <el-col :span="1.5"><div style="min-width: 1px"></div></el-col>-->
        <el-col :span="8">
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
          <div class="optionn">
            <el-row>
              <el-col :span="12">
                <el-select v-model="value" placeholder="请选择数据集">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.key"
                  />
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-button class="bottom-class" @click="convertt" type="primary" plain>
                  <div>点击检测</div>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!--        <el-col :span="1.5"><div style="min-width: 1px"></div></el-col>-->
        <el-col :span="8">
          <div v-if="showResult">
            <div class="textt">
              mfcc  频谱图
            </div>
            <el-image :src="resemblyzer" />
          </div>
          <div v-else style="min-height: 1px" />
        </el-col>
      </el-row>
      <el-row class="secondrow">
        <el-col :span="8">
          <div v-if="showResult">
            <div class="textt">
              高维向量特征投影
            </div>
            <el-image :src="PCA_image_path" />
          </div>
          <div v-else style="min-height: 1px" />
        </el-col>
        <!--        <el-col :span="1.5"><div style="min-width: 1px"></div></el-col>-->
        <el-col v-if="showResult":span="8">
          <!--          <div class="border" ></div>-->
<!--          <div class="textt">-->
<!--            控制台输出-->
<!--          </div>-->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>控制台结果返回</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
              文件名：{{filename}}
            </div>
            <div class="text item">
              数据库：{{options[value].label}}
            </div>
            <div class="text item">
                本次查询结果：正确率为{{score}}
            </div>

          </el-card>
        </el-col>
        <!--        <el-col :span="1.5"><div style="min-width: 1px"></div></el-col>-->
        <el-col :span="8">
          <div v-if="showResult">
            <div class="textt">
              最接近的频谱图
            </div>
            <el-image :src="resemblyzer" />
          </div>
          <div v-else style="min-height: 1px" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import resemblyzer from './p225_003.png'
import mfcc from './p226_001.png'
import vector2 from './Untitled.png'
import similar from './p225_003_to_p226_001.png'
import axios from 'axios'
export default {
  name: 'Asvspoof',
  data() {
    return {
      UploadUrl: 0,
      showResult: 0,
      generalUrl: 'http://127.0.0.1:5000',
      infocenter: ['infocenter1', 'infocenter1', 'infocenter1', 'infocenter1'],
      empty: null,
      fileurl:null,
      resemblyzer,
      mfcc,
      vector2,
      similar,
      options: [{
        value: '选项1',
        label: 'Asvspoof2021',
        key:0
      }, {
        value: '选项2',
        label: 'Asvspoof2019',
        key:1
      }, {
        value: '选项3',
        label: '郭德纲',
        key:2
      }, {
        value: '选项4',
        label: '高晓松',
        key:3
      }],
      value: '',
      PCA_image_path:null,
      score:0,
      errorflag:false,
      filename:null,
    }
  },
  methods: {
    succs(res) {
      console.log(res)
      this.fileurl = res.path
      this.UploadUrl = this.generalUrl + res.path
      console.log(this.UploadUrl)
    },
    convertt() {
      let that = this
      console.log(that.value)
      axios.get(`${that.generalUrl}/asvspoof?file=${that.fileurl}&databases=${that.value}`).then((res)=>{
        console.log(res)
        if(res.data.code === 200){
          that.PCA_image_path = that.generalUrl + res.data.PCA
          that.score = res.data.score
          that.filename = res.data.filename
          that.showResult = 1
          // window.open(that.PCA_image_path)
        //   that.converted_path = that.generalUrl + '/' + res.data.filepath
        //   that.running=false
        //   that.showResult = 1
        //   that.$notify({
        //     title: '提示',
        //     message: h('i', { style: 'color: teal' }, '转换完成，请浏览转换结果')
        //   })
        }else {
          that.errorflag = true
        }
      })

    }
  }
}
</script>

<style scoped>
  .outer{
    margin:50px;
  }
  .title{
    margin-top: 50px;
    margin-left: 60px;
    /*color: #ffffff;*/
    /*color: transparent;*/
    /* -webkit-text-stroke: 1px black; */
    letter-spacing: 0.04em;
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
  .mainn{
    position: relative;
    margin: 0 auto;
    text-align: center;
    padding-top: 50px;
  }
  .textt{
    position: relative;
    margin: 0 auto;
    text-align: center;
    font-size: 30px;
    color: #ffffff;
  }
  .border{
    margin-top: 50px;
  }
  .secondrow{
    margin-top: 50px;
  }
  .optionn{
    margin-left: 50px;
    margin-top: 30px;
  }
  .title-card{
    width: 900px;
    height: 290px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: rgb(239, 239, 239);
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
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
    margin-top: 50px;
    width: 480px;
  }
</style>

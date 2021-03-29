<template>
  <div class="outer">
    <div class="title">
      Asvspoof 虚假语音检测
    </div>
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
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-button class="bottom-class" @click="convertt">
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
            <el-image :src="vector2" />
          </div>
          <div v-else style="min-height: 1px" />
        </el-col>
        <!--        <el-col :span="1.5"><div style="min-width: 1px"></div></el-col>-->
        <el-col v-if="showResult":span="8">
          <!--          <div class="border" ></div>-->
          <div class="textt">
            控制台输出
          </div>
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
export default {
  name: 'Asvspoof',
  data() {
    return {
      UploadUrl: 0,
      showResult: 0,
      generalUrl: 'http://127.0.0.1:5000',
      infocenter: ['infocenter1', 'infocenter1', 'infocenter1', 'infocenter1'],
      empty: null,
      resemblyzer,
      mfcc,
      vector2,
      similar,
      options: [{
        value: '选项1',
        label: 'Asvspoof2021'
      }, {
        value: '选项2',
        label: 'Asvspoof2019'
      }, {
        value: '选项3',
        label: '郭德纲'
      }, {
        value: '选项4',
        label: '高晓松'
      }],
      value: ''
    }
  },
  methods: {
    succs(res) {
      console.log(res)
      this.UploadUrl = this.generalUrl + res.path
      console.log(this.UploadUrl)
    },
    convertt() {
      this.showResult = 1
    }
  }
}
</script>

<style scoped>
  .outer{
    margin:50px;
  }
  .title{
    position: relative;
    margin: 0 auto;
    text-align: center;
    font-size: 50px;
    color: #ffffff;
    /*color: transparent;*/
    -webkit-text-stroke: 1px black;
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
    margin-top: 50px;
  }
</style>

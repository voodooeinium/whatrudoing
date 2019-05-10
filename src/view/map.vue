<template>
  <div id='map-container' v-loading="showLoading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <l-map></l-map>
    <fab @edit-form='dialogVisible = true'></fab>

    <add-form :visible.sync="dialogVisible"></add-form>

    <div class="title-wrapper">
      <p>{{preTitle}}<span class="title-txt">{{title}}</span></p>
      <span class="sub-title-txt">{{subTitle}}</span>
    </div>
    <div class="share-wrapper">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>项目地址</el-dropdown-item>
          <el-dropdown-item>数据地址</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-share"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>生成图片</el-dropdown-item>
          <el-dropdown-item>扫描二维码
            <img class="qrcode-container" src="../assets/imgs/QRCode.png" alt="二维码">
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class='image-cover' v-show='imageVisible'>
      <img @click='closeImageModal' src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=' alt='close' class='close-button'>
    </div>
  </div>
</template>

<script>
import lMap from "@/components/map";
import html2canvas from "html2canvas";
import AddForm from "@/components/AddForm";
import Fab from "@/components/FAB";

export default {
  components: {
    lMap,
    Fab,
    AddForm
  },
  data() {
    return {
      showLoading: false,
      preTitle: "实时可视化问卷调查--",
      title: "你是否正在加班？",
      subTitle: "本次调查将持续两周，所有数据将在调查结束后公开，详情请查看",
      dialogVisible: true,
      sum: 1000,
      noPay: "40%",
      imageVisible: false // 是否展示预览图容器
    };
  },
  methods: {
    closeImageModal() {
      this.imageVisible = false;
      document
        .querySelector(".image-cover")
        .removeChild(document.querySelector("canvas"));
    },
    /**
     * @description 生成页面截图函数，将该DOM下的内容转换成canvas，并预览
     */
    generageScreenShot() {
      let screenShot = document.querySelector("#map-container");
      let width = screenShot.offsetWidth;
      let height = screenShot.offsetHeight;
      html2canvas(screenShot, {
        allowTaint: true,
        useCORS: true,
        height: height,
        width: width,
        scale: 1 // 修改画质：1为正常，越小画质越低
      }).then(canvas => {
        document.querySelector(".image-cover").appendChild(canvas);
        this.imageVisible = true;
      });
    }
  }
};
</script>

<style lang='scss'>
#map-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
}
.me-too-btn {
  position: absolute;
  top: 49%;
  right: 20px;
  background-color: #e8e94f;
  color: #111;
  height: 85px;
  width: 85px;
  line-height: 85px;
  font-size: 22px;
  border-radius: 50%;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  z-index: 2000;
  transition: 0.3s;
  overflow: hidden;
}
.me-too-btn:hover {
  box-shadow: #e8e94f 1px 1px 10px;
}
.form-unfold {
  height: 330px;
  width: 30%;
  right: 40px;
  background-color: #fff;
  border-radius: 7px;
  text-align: left;
}
.form-unfold:hover {
  box-shadow: none;
}
.form-wrapper {
  padding: 20px;
  box-sizing: border-box;
}
.overtime-state-wrapper {
  height: 100px;
  width: 20%;
  z-index: 2000;
  position: absolute;
  right: 20px;
  bottom: 0px;
  text-align: right;
  color: #d6d4d4;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-family: "微软雅黑";
}
.overtime-state-wrapper p {
  margin-block-start: 5px;
  margin-block-end: 5px;
}
.overtime-state-wrapper span {
  color: #e8e94f;
  padding: 0 5px;
}
.image-cover {
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    transform: scale(0.8);
    opacity: 1;
    z-index: 9999;
    transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s,
      opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s,
      -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s;
  }
}
.title-wrapper {
  position: absolute;
  height: 100px;
  width: 400px;
  top: 0px;
  left: 0px;
  z-index: 2000;
  p {
    font-size: 16px;
    color: #d6d4d4;
    .title-txt {
      font-size: 30px;
      color: #e8e94f;
    }
  }
  .sub-title-txt {
    font-size: 12px;
    color: #8fbdd7;
  }
}
.share-wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 50px;
  display: flex;
  flex-direction: row;
  i {
    height: 30px;
    width: 30px;
    margin: 30px 20px 0 0;
    line-height: 30px;
    text-align: center;
    background-color: #d6d4d4;
    border-radius: 50%;
    cursor: pointer;
  }
}
.qrcode-container {
  height: 80px;
  width: 80px;
  display: block;
}
</style>

<style scoped lang='scss'>
.image-cover {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  img.close-button {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
}
</style>
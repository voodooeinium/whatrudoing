<template>
  <div id='map-container' v-loading="showLoading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <l-map></l-map>
    <div class="title-wrapper">
      <p>{{preTitle}}<span class="title-txt">{{title}}</span></p>
      <span class="sub-title-txt">{{subTitle}}</span>
    </div>
    <fab @edit-form='dialogVisible = true'></fab>
    <add-form :visible.sync="dialogVisible"></add-form>
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
        color: #de335e;
      }
    }
    .sub-title-txt {
      font-size: 12px;
      color: #8fbdd7;
    }
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
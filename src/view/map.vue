<template>
    <div id='map-container'
    v-loading="showLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <l-map></l-map>
        <!-- <baidu-map class="bd-map-container"></baidu-map> -->
        <div class="title-wrapper">
            <p>{{preTitle}}<span class="title-txt">{{title}}</span></p>
            <span class="sub-title-txt">{{subTitle}}</span>
        </div>
        <div class="share-wrapper">
            <i class="el-icon-more"></i>
            <i class="el-icon-share"></i>
        </div>

        <div class="me-too-btn" :class="{'form-unfold':isUnfold}" @click="clickAddMe" v-show="showAddMeBtn">
            <div v-show="isUnfold" class="form-wrapper">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="时间">
                        <el-time-picker
                            v-model="form.start"
                            :picker-options="{
                                selectableRange: '17:00:00 - 23:59:59'
                            }"
                            placeholder="开始时间">
                        </el-time-picker>
                        <el-time-picker
                            v-model="form.end"
                            :picker-options="{
                                selectableRange: '17:00:00 - 23:59:59'
                            }"
                            placeholder="结束时间">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="加班费用">
                        <el-radio-group v-model="form.pay">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="企业性质">
                        <el-select v-model="form.nature" placeholder="请选择">
                            <el-option
                            v-for="item in natureOfBussiness"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行业">
                       <el-cascader
                            :options="career"
                            v-model="form.career">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="cancel">取消</el-button>
                        <el-button type="primary" @click="onSubmit">分享状态</el-button>
                    </el-form-item>
                </el-form>
            </div>
            {{addMeTxt}}
        </div>
        <!-- <div class="overtime-state-wrapper">
            <p class="sum-count">此时共有<span>{{sum}}</span>人在加班</p>
            <p class="no-pay-count">其中<span>{{noPay}}</span>的人没有加班工资</p>
        </div> -->
        <div class='image-cover' v-show='imageVisible'>
            <img @click='closeImageModal' src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=' alt='close' class='close-button'>
        </div>
    </div>
</template>

<script>
import lMap from '@/components/map';
import html2canvas from "html2canvas";
import dataConfig from "@/assets/dataConfig.js"
export default {
    components: {
        lMap
    },
    data() {
        return{
            showLoading: false,
            preTitle: '实时可视化问卷调查--',
            title: '你是否正在加班？',
            subTitle: '本次调查将持续两周，所有数据将在调查结束后公开，详情请查看',
            addMeTxt: '填写',
            showAddMeBtn: true,
            isUnfold: false,
            form: {
                start: '',
                end: '',
                pay: 0,
                state: null,
                nature: 0,
                career: []
            },
            sum: 1000,
            noPay: '40%',
            natureOfBussiness: [
                {value: 0, label: '国有企业'},
                {value: 1, label: '集体企业'},
                {value: 2, label: '有限责任公司'},
                {value: 3, label: '股份有限公司'},
                {value: 4, label: '私营企业'},
                {value: 5, label: '中外合资企业'},
                {value: 6, label: '外商投资企业'}
            ],
            career: dataConfig,
            imageVisible: false // 是否展示预览图容器
        }
    },
    mounted(){
        console.log('数据', this.career)
    },
    methods: {
        clickAddMe() {
            this.isUnfold = true;
            this.addMeTxt = '';
        },
        onSubmit() {
            var self = this;
            this.showLoading = true;
            setTimeout(() => {
                self.isUnfold = false;
                self.showAddMeBtn = false;
                self.showLoading = false;
            }, 500);
        },
        cancel() {
            var self = this;
            setTimeout(() => {
                self.isUnfold = false;
                self.addMeTxt = '填写';
            }, 0);
        },
        closeImageModal(){
            this.imageVisible = false;
            document.querySelector(".image-cover").removeChild(document.querySelector("canvas"));
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
                document.querySelector(".image-cover").appendChild(canvas)
                this.imageVisible = true;
            });
        },
    }
}
</script>

<style lang='scss'>
#map-container{
    height: 100%;
    width:100%;
    overflow: hidden;
    user-select:none;
}
.me-too-btn{
    position: absolute;
    top: 49%;
    right: 20px;
    background-color:#e8e94f;
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
.me-too-btn:hover{
    box-shadow: #e8e94f 1px 1px 10px;
}
.form-unfold{
    height: 330px;
    width: 30%;
    right: 40px; 
    background-color: #FFF;
    border-radius: 7px;
    text-align: left;
}
.form-unfold:hover{
    box-shadow: none;
}
.form-wrapper{
    padding: 20PX;
    box-sizing: border-box;
}
.overtime-state-wrapper{    
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
    font-family: '微软雅黑';
}
.overtime-state-wrapper p{
    margin-block-start: 5px;
    margin-block-end: 5px;
}
.overtime-state-wrapper span{
    color: #e8e94f;
    padding: 0 5px;
}
.image-cover{
    canvas{
        position: fixed;
        top: 0;
        left: 0;
        transform: scale(0.8);
        opacity: 1;
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s, opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s, -webkit-transform 0.3s cubic-bezier(0.42, 0, 0.58, 1) 0s;
    }
}
.title-wrapper{
    position: absolute;
    height: 100px;
    width: 400px;
    top: 0px;
    left: 0px;
    z-index: 2000;
    p{
        font-size: 16px;
        color: #d6d4d4;
        .title-txt{
            font-size: 30px;
            color: #e8e94f;
        }
    }
    .sub-title-txt{
        font-size: 12px;
        color: #8fbdd7;
    }
}
.share-wrapper{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 50px;
    display: flex;
    flex-direction: row;
    i{
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
.bd-map-container{
    height: 100%;
    width: 100%;
}
</style>

<style scoped lang='scss'>
.image-cover{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    img.close-button{
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
}
</style>
<template>
    <div class="map-wrapper"
    v-loading="showLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <l-map :theme="theme"></l-map>
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
                    <el-form-item label="职业">
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
        <div class="overtime-state-wrapper">
            <p class="sum-count">此时共有<span>{{sum}}</span>人在加班</p>
            <p class="no-pay-count">其中<span>{{noPay}}</span>的人没有加班工资</p>
        </div>
    </div>
</template>

<script>
import lMap from '@/components/map';
export default {
    components: {
        lMap
    },
    data() {
        return{
            showLoading: false,
            theme: '加班中。。。',
            addMeTxt: '修福报',
            showAddMeBtn: true,
            isUnfold: false,
            form: {
                start: '',
                end: '',
                pay: 0,
                state: null,
                nature: 0,
                career: ''
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
            career: [
                {value: 0, label: '技术', children: [
                    {value: 1, label: '后端'},
                    {value: 2, label: '前端'},
                    {value: 3, label: '架构'}
                ]},
                {value: 1, label: '集体企业'},
                {value: 2, label: '有限责任公司'},
                {value: 3, label: '股份有限公司'},
                {value: 4, label: '私营企业'},
                {value: 5, label: '中外合资企业'},
                {value: 6, label: '外商投资企业'}
            ]
        }
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
                self.addMeTxt = '修福报';
            }, 0);
        }
    }
}
</script>

<style>
.map-wrapper{
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
    /* opacity: 0.8; */
    background-color: #fff;
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
</style>

<template>
  <div>
    <el-dialog title="加班情况问卷调查" :visible="visible" width="33%" @update:visible="$emit('update:visible', $event)">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="加班时间">
            <el-time-picker
                v-model="form.startTime"
                :picker-options="{
                    selectableRange: '17:00:00 - 23:59:59'
                }"
                placeholder="开始时间">
            </el-time-picker>
            <el-time-picker
                v-model="form.endTime"
                :picker-options="{
                    selectableRange: '17:00:00 - 23:59:59'
                }"
                placeholder="结束时间">
            </el-time-picker>
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
                :options="industry"
                v-model="form.industry ">
            </el-cascader>
        </el-form-item>
        <el-form-item label="职业">
            <el-input v-model="form.career" placeholder="请填写职业"></el-input>
        </el-form-item>
        <el-form-item label="每周平均加班(小时)">
            <el-input-number v-model="form.hour"  :min="0" :max="100" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="工作年限（年）">
            <el-input-number v-model="form.year"  :min="0" :max="44" controls-position="right" ></el-input-number>
        </el-form-item>
        <el-form-item label="薪资范围(元/每月)">
            <el-input-number v-model="form.monthlyPay"  :min="0" controls-position="right" :step="1000" ></el-input-number>
        </el-form-item>
        <el-form-item label="生活满意度(0-100)">
            <el-input-number v-model="form.satisfaction"  :min="0" :max="100" controls-position="right" :step="10" ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible',false)">取 消</el-button>
        <el-button type="primary" @click="$emit('update:visible',false)">分享状态</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dataConfig from "@/assets/dataConfig.js";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      industry: dataConfig,
      form: {
          startTime: '',
          endTime: '',
          nature: 0,
          industry: [],
          career: '',
          year: 0,
          hour: 0,
          monthlyPay: 0,
          satisfaction: 0,
          city: '',
          latlng: []
      },
      natureOfBussiness: [
        { value: 0, label: "国有企业" },
        { value: 1, label: "集体企业" },
        { value: 2, label: "有限责任公司" },
        { value: 3, label: "股份有限公司" },
        { value: 4, label: "私营企业" },
        { value: 5, label: "中外合资企业" },
        { value: 6, label: "外商投资企业" }
      ]
    };
  }
};
</script>

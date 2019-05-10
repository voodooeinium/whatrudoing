<template>
  <div>
    <el-dialog title="提示" :visible="visible" width="30%" @update:visible="$emit('update:visible', $event)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="时间">
          <el-time-picker v-model="form.start" :picker-options="{
                                selectableRange: '17:00:00 - 23:59:59'
                            }" placeholder="开始时间">
          </el-time-picker>
          <el-time-picker v-model="form.end" :picker-options="{
                                selectableRange: '17:00:00 - 23:59:59'
                            }" placeholder="结束时间">
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
            <el-option v-for="item in natureOfBussiness" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业">
          <el-cascader :options="career" v-model="form.career">
          </el-cascader>
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
      career: dataConfig,
      form: {
        start: "",
        end: "",
        pay: 0,
        state: null,
        nature: 0,
        career: []
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

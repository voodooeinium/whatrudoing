<template>
  <div>
    <fab :position="position" :bg-color="bgColor" :actions="fabActions" @edit="edit" @share="alert" :main-tooltip="mainTooltip"></fab>
  </div>
</template>

<script>
import Fab from "vue-fab";

export default {
  data() {
    return {
      bgColor: "#de335e",
      position: "bottom-right",
      mainTooltip: "修福报",
      fabActions: [
        {
          name: "more",
          icon: "more_horiz",
          tooltip: "更多"
        },
        {
          name: "share",
          icon: "share",
          tooltip: "分享"
        },
        {
          name: "edit",
          icon: "edit",
          tooltip: "填写福报表单"
        }
      ]
    };
  },
  methods: {
    alert() {
      alert("Clicked on alert icon");
    },
    edit() {
      this.$emit("edit-form", true);
    }
  },
  components: {
    Fab
  }
};
</script>
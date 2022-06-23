<template>
    <div>
      <md-dialog :md-click-outside-to-close="false" :md-active.sync="visible">
      <md-dialog-title>Ändere Subjekt</md-dialog-title>
    <div class="body">
  <el-row class="SID-input">
    <el-col >
          <label class="text-label">Name</label>
    <el-input placeholder="Please input" v-model="nodeForm.name"></el-input>
    </el-col>
  </el-row>
    <el-row class="SID-input">
    <el-col >
          <label class="text-label">ID</label>
    <el-input placeholder="Please input" v-model="nodeForm.externalID"></el-input>
    </el-col>
    <el-row>
      <el-col>
<label class="text-label">Type</label>
      </el-col>
    </el-row>
  </el-row>
     <el-row class="SID-input">
    <el-col >
    
    <el-select v-model="nodeForm.type"  placeholder="Select" size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </el-col>
  </el-row>
     <el-row class="text-label-switch">
    <el-col :span="20">
    <label >Multi-Subjekt</label>
  <el-switch
    v-model="nodeForm.multiSubject"
    class="ml-2"
    active-color="#13ce66"
    inactive-color="#ff4949"

  />
    </el-col>
  </el-row>
     <el-row class="SID-input">
    <el-col>
    <label class="text-label">Kommentar</label>
  <el-input
    v-model="nodeForm.comment"
    placeholder="Füge Kommentar hinzu"
    show-word-limit
    type="textarea"
  />
  
    </el-col>
  </el-row>
            </div>
                      <div class="md-layout md-alignment-center">
<div class="md-layout-item ">
                <md-button @click="handleClickCancelSaveNode">Abbrechen</md-button>
</div>
<div class="md-layout-item ">
                <md-button @click="handleClickSaveNode">Speichern</md-button>
</div>
</div>
    </md-dialog>
        </div>
</template>
<script>

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      node: {
        type: Object,
        default: null,
      },
    },
    data: function() {
      return {
        options: [{value: "intern", label: "Intern"}, {value: "extern", label: "Interface"}],
        nodeForm: {name: null, id: null, type: null, multiSubject: false, externalID: null, comment: null},
      };
    },
    methods: {
      handleClickSaveNode() {
        this.$emit('update:node', Object.assign(this.node, {
          text: this.nodeForm.name,
          type: this.nodeForm.type,
          externalID: this.nodeForm.externalID,
          multiSubject: this.nodeForm.multiSubject,
          comment: this.nodeForm.comment,
        }));
        
        this.$emit('update:visible', false);
      },
      handleClickCancelSaveNode() {
        this.$emit('update:visible', false);
      },
    },
    watch: {
      node: {
        immediate: true,
        handler(val) {
          if (!val) { return; }
          this.nodeForm.id = val.id;
          this.nodeForm.name = val.text;
          this.nodeForm.type = val.type;
          this.nodeForm.externalID = val.externalID;
          this.nodeForm.multiSubject = val.multiSubject;
          this.nodeForm.comment = val.comment;
        },
      },
    },
  };
</script>
<style scoped>

  .el-switch {
    padding-left: 10px;
    padding-right: 10px;
  }


.text-label {
  margin-left: 5px;
  margin-right: 10px;
  margin-top: 10px;
}
.text-label-switch {
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.SID-input {
  padding-left: 15px;
  padding-right: 10px;
}
</style>
<template>
    <div>
      <md-dialog :md-click-outside-to-close="false" :md-active.sync="visible">
      <md-dialog-title>Do-State</md-dialog-title>

     <el-row class="text-label-switch">
    <el-col>
  <el-input
    v-model="connectionForm.actionMsg"
    placeholder=""
    show-word-limit
    type="textarea"
  />
  
    </el-col>
  </el-row>
<div class="md-layout md-alignment-center">
<div class="md-layout-item ">
                <md-button @click="handleClickCancelSaveConnection">Abbrechen</md-button>
</div>
<div class="md-layout-item ">
                <md-button @click="handleClickSaveConnection">Speichern</md-button>
</div>
</div>
      </md-dialog>
    </div>
</template>
<script>

  export default {
    props: {
      idSBD: {
      type: String,
      },
      visible: {
        type: Boolean,
        default: false,
      },
      connection: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        connectionForm: {
          sourceId: null,
          sourcePosition: null,
          destinationId: null,
          destinationPosition: null,
          text: null,
          messages: [],
          actionMsg: "",
        },
      };
    },
    methods: {
      async handleClickSaveConnection() {
        this.inputValue = '',
        this.$emit('update:visible', false);
        this.$emit('update:connection', Object.assign(this.connection, {
          text: this.connectionForm.text,
          messages: this.connectionForm.actionMsg,
          actionMsg: this.connectionForm.actionMsg,
        }));
      },
      async handleClickCancelSaveConnection() {
        this.inputValue = '',
        this.$emit('update:visible', false);
      },
    },
    watch: {
      connection: {
        immediate: true,
        handler(val) {
          if (!val) { return; }
          this.connectionForm.id = val.id;
          this.connectionForm.messages = val.messages;
          this.connectionForm.actionMsg = val.actionMsg;

        },
      },
    },
  };
</script>
<style>


  .text-label-switch {
  margin-left: 15px;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
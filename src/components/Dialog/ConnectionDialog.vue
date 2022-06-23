<template>
    <div>
      <md-dialog :md-click-outside-to-close="false" :md-active.sync="visible">
      <md-dialog-title>Nachrichten</md-dialog-title>

<el-tag
  :key="tag"
  v-for="tag in connectionForm.messages"
  closable
  class="SBD-select"
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="mini"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ Neue Nachricht</el-button>
          <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item ">
        <md-button @click="handleClickSaveConnection">Schließen</md-button>
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
        },
      };
    },
    methods: {
 handleClose(tag) {
        this.connectionForm.messages.splice(this.connectionForm.messages.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.connectionForm.messages.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      async handleClickSaveConnection() {
        this.inputValue = '',
        this.$emit('update:visible', false);
        this.$emit('update:connection', Object.assign(this.connection, {
          text: this.connectionForm.text,
          messages: this.connectionForm.messages
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
        },
      },
    },
  };
</script>
<style>

  .el-tag {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
  }


  .button-new-tag {
    margin-left: 10px;
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 5px;
  }
  .input-new-tag {
    width: 100px;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    vertical-align: bottom;

  }



</style>
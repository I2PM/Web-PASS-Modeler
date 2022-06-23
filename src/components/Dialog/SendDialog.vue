<template>
    <div>
      <md-dialog :md-click-outside-to-close="false" :md-active.sync="visible">
      <md-dialog-title>Versendete Nachrichten</md-dialog-title>
      <label class="text-label">To</label>
    <el-select  class="SBD-select" @change="optionsToChange"  v-model="connectionForm.sendTo" no-data-text="Keine Subjekte vorhanden"  placeholder="Select" size="large">
    <el-option
      v-for="item in optionsSendTo"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <label class="text-label">Message</label>
    <el-select class="SBD-select" :disabled="connectionForm.sendTo === ''" v-model="connectionForm.sendMsg"  placeholder="Select" no-data-text="Keine Nachrichten vorhanden" size="large">
    <el-option
      v-for="item in optionsSendMsg"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
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
          sendTo: "",
          sendMsg: "",
        },
      };
    },
    computed: {
      optionsSendTo(){
        var that = this 
      var sendToHelper = this.$store.state.connections.filter(element => element.source.id === this.idSBD).map(element => element.destination.id)
      let uniqueSendTo = [...new Set(sendToHelper)]
      return uniqueSendTo.map(element => Object.create({value: element, label: that.$store.state.nodes.find(elem => elem.id === element).text}))
      },
      optionsSendMsg(){
      if(!this.connectionForm.sendTo){return}
      var sendMsgHelper = this.$store.state.connections.filter(element => element.source.id === this.idSBD && element.destination.id === this.connectionForm.sendTo).map(element => element.messages).flat(1)
      return sendMsgHelper.map(element => Object.create({value: element, label: element}))
      },
    },
    methods: {
      resetChangeSubject() {
        if(!(this.optionsSendMsg.includes(this.connectionForm.sendMsg))){
      this.connectionForm.sendMsg=""
        }}, 
          optionsToChange(){
        this.connectionForm.sendMsg  = ""
      },
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
          messages: ["To: " + this.connectionForm.sendTo, "Msg: " + this.connectionForm.sendMsg],
          sendTo: this.connectionForm.sendTo,
          sendMsg: this.connectionForm.sendMsg
        }));
      },

  async handleClickCancelSaveConnection() {
    this.$emit('update:visible', false);
  },
    },
    watch: {
      connection: {
        immediate: true,
        handler(val) {
          console.log(val)
          if (!val) { return; }
          this.connectionForm.id = val.id;
          this.connectionForm.messages = val.messages;
          this.connectionForm.sendTo = val.sendTo;
          this.connectionForm.sendMsg = val.sendMsg;
        },
      },
    },
  };
</script>
<style>

.SBD-select {
  padding-left: 10px;
  padding-right: 10px;
}

.text-label {
  margin-left: 15px;
  margin-right: 10px;
}





</style>
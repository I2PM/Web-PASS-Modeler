               conn["receiveFrom"] = ""
                conn["receiveMsg"] = ""

<template>
    <div>
      <md-dialog :md-click-outside-to-close="false" :md-active.sync="visible">
      <md-dialog-title>Empfangene Nachricht</md-dialog-title>
      <label class="text-label">From</label>
    <el-select @change="resetChangeSubject" class="SBD-select" v-model="connectionForm.receiveFrom" no-data-text="Keine Subjekte vorhanden"  placeholder="Select" size="large">
    <el-option
      v-for="item in optionsReceiveFrom"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
   <label class="text-label">Message</label>
    <el-select class="SBD-select" :disabled="connectionForm.receiveFrom === ''" v-model="connectionForm.receiveMsg"  placeholder="Select" no-data-text="Keine Nachrichten vorhanden" size="large">
    <el-option
      v-for="item in optionsReceiveMsg"
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
          receiveFrom: "",
          receiveMsg: "",
        },
      };
    },
    computed: {
      optionsReceiveFrom(){
        var that = this 
      var receiveFrom = this.$store.state.connections.filter(element => element.destination.id === this.idSBD).map(element => element.source.id)
      let uniqueReceiveFrom = [...new Set(receiveFrom)]
      return uniqueReceiveFrom.map(element => Object.create({value: element, label: that.$store.state.nodes.find(elem => elem.id === element).text}))
      },
      optionsReceiveMsg(){
      if(!this.connectionForm.receiveFrom){return}
      var receiveMsg = this.$store.state.connections.filter(element => element.destination.id === this.idSBD && element.source.id === this.connectionForm.receiveFrom).map(element => element.messages).flat(1)
      return receiveMsg.map(element => Object.create({value: element, label: element}))
      }
    },
          methods: {
            resetChangeSubject() {
              if(!(this.optionsReceiveMsg.includes(this.connectionForm.receiveMsg))){
this.connectionForm.receiveMsg=""
              }
            }, 

        optionsFromChange(){
        this.connectionForm.receiveMsg  = ""
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
          messages: ["From: " + this.connectionForm.receiveFrom, "Msg: " + this.connectionForm.receiveMsg],
          receiveFrom: this.connectionForm.receiveFrom,
          receiveMsg: this.connectionForm.receiveMsg
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
          this.connectionForm.receiveFrom = val.receiveFrom;
          this.connectionForm.receiveMsg = val.receiveMsg;
        },
      },
    }
  };
</script>
<style>
.text-label {
  margin-left: 15px;
  margin-right: 10px;
  margin-top: 10px;
}


.SBD-select {
  padding-left: 10px;
  padding-right: 10px;
}



</style>
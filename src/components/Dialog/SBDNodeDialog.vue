<template>
    <div>
      <md-dialog :md-click-outside-to-close="false" :md-active.sync="visible">
      <md-dialog-title>Ändere Zustand</md-dialog-title>
    <div class="body">
  <el-row class="SBD-input">
    <el-col>
          <label class="text-label">Name</label>
    <el-input placeholder="Please input" v-model="nodeForm.name"></el-input>
    </el-col>
  </el-row>
    <el-row class="SBD-input">
    <el-col >
          <label class="text-label">ID</label>
    <el-input  placeholder="Please input" v-model="nodeForm.externalID"></el-input>
    </el-col>
  </el-row>
     <el-row>
    <el-col >
    <label class="text-label-select">State</label>
    </el-col>
  </el-row>
       <el-row class="SBD-input">
    <el-col>
    <el-select   multiple v-model="nodeForm.state"  placeholder="Füge State hinzu" size="large">
    <el-option
      v-for="item in optionsState"
      :key="item.value"
      :label="item.label"
      :value="item.value"
       :disabled="item.disabled"
    />
  </el-select>
    </el-col>
  </el-row>
       <el-row class="SBD-input">
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
      idSBD: {
      type: String,
      },
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
        options: [{value: "intern", label: "Intern"}, {value: "extern", label: "Extern"}],
        nodeForm: {name: null, id: null, type: null, externalID: null, comment: null, state: null},
      };
    },
      computed: {
        optionsState(){
          var stateInitOptions = ["Start"]
          var stateResultOptions = []
      var stateHelper = this.$store.state.nodes.find(element => element.id === this.idSBD).SBD.nodes.filter(element => element.id != this.nodeForm.id).map(element => element.state).flat(1)
      stateInitOptions.forEach(element => 
      {
        if (stateHelper.includes(element)){
          stateResultOptions.push(Object.create({value: element, label: element, disabled: true}))
        } else {
          if(this.nodeForm.type === "send" && element === "End"){
            stateResultOptions.push(Object.create({value: element, label: element, disabled: true}))
          } else {
            stateResultOptions.push(Object.create({value: element, label: element, disabled: false}))
          }
        }
      })
      if(this.nodeForm.type === "send"){
        stateResultOptions.push(Object.create({value: "End", label: "End", disabled: true}))
      } else {
                stateResultOptions.push(Object.create({value: "End", label: "End", disabled: false}))
      }
      return stateResultOptions
      },
      },
    methods: {
      handleClickSaveNode() {
        this.$emit('update:node', Object.assign(this.node, {
          text: this.nodeForm.name,
          externalID: this.nodeForm.externalID,
          comment: this.nodeForm.comment,
          state: this.nodeForm.state
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
          this.nodeForm.type = val.type;
          this.nodeForm.name = val.text;
          this.nodeForm.externalID = val.externalID;
          this.nodeForm.comment = val.comment;
          this.nodeForm.state = val.state;

        },
      },
    },
  };
</script>
<style scoped>

.text-label {
  margin-left: 15px;
  margin-right: 10px;
}
.text-label-select{
  margin-left: 30px;
  margin-right: 10px;
}
.SBD-input {
  padding-left: 15px;
  padding-right: 10px;
}
.text-label-switch {
  margin-left: 15px;
  margin-right: 10px;
  margin-top: 10px;
}
</style>
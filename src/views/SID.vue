<template>
  <div class="container">
    <div class="toolbar">
      <el-button
      size="mini"
        @click="handleAddSubject"
      >
        Füge Subjekt hinzu
      </el-button>
      <el-button size="mini" @click="$refs.chart.remove()">Lösche Subjekt/ Nachrichten</el-button>
      <el-button size="mini" @click="$refs.chart.editCurrent()">
        Bearbeite Subjekt/ Nachrichten
      </el-button>

  <el-popconfirm
  confirm-button-text='OK'
  cancel-button-text='Abbrechen'
  icon="el-icon-info"
  icon-color="red"
  title="Ein Import überschreibt das aktuell gespeicherte Modell. Wollen Sie trotzdem fortfahren?"
  @confirm="getFile()"
>
<el-button slot="reference" class="import" size="mini">Import</el-button>
</el-popconfirm>
  <div style='height: 0px;width: 0px; overflow:hidden;'><input id="upfile" type="file" accept=".json" @change="processFile($event)" /></div>
    <el-button class="export" size="mini" @click="handleSave()">Export</el-button>
    </div>
    <flowchart
      :nodes="nodes"
      :connections="connections"
      @editnode="handleEditNode"
      :width="200000"
      :height="1000"
      :readonly="false"
      @dblclick="handleDblClick"
      @editconnection="handleEditConnection"
      @save="handleChartSave"
      @select="handleSelect"
      @selectconnection="handleSelectConnection"
      ref="chart"
    >
    </flowchart>
    <node-dialog
      :visible.sync="nodeDialogVisible"
      :node.sync="nodeForm.target"
    ></node-dialog>
    <connection-dialog
      :visible.sync="connectionDialogVisible"
      :connection.sync="connectionForm.target"
      :operation="connectionForm.operation"
    >
    </connection-dialog>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */

import ConnectionDialog from "../components/Dialog/ConnectionDialog";
import NodeDialog from "../components/Dialog/NodeDialog";
import Flowchart from "../components/SIDflowchart/Flowchart";
import * as d3 from "d3";
import { roundTo20 } from "../utils/math";
import { mapFields } from 'vuex-map-fields';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    ConnectionDialog,
    NodeDialog,
    Flowchart,
  },
  data: function () {
    return {
      dialogVisible: false,
      files: [],
      connections: [],
      nodes: [],
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  methods: {


//Opens file import on local machine
getFile() {
  document.getElementById("upfile").click();
},
processFile(event) {
	// Stop the form from reloading the page
	event.preventDefault();
	// Create a new FileReader() object
	let reader = new FileReader();
	// Setup the callback event to run when the file is read
	reader.onload = this.logFile;
	// Read the file
	reader.readAsText(event.target.files[0])
},
logFile (event) {
  //Save import in store
	let str = event.target.result;
	let json = JSON.parse(str);
  this.$store.commit('set_all', json)
},
handleSave(){
  //Download the current model 
  const data = {nodes : this.$store.state.nodes, connections : this.$store.state.connections}
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "PASS-Model-" + Date.now()  + ".json";

    link.click();
},
//Add new subject 
    handleAddSubject(){
        let idInit = uuidv4()
        this.$refs.chart.add({
          id: idInit,
          x: 10,
          y: 10,
          text: "Subjekt" + this.$store.state.nodes.length,
          type: "intern",
          SBD: {nodes: [], connections : []},
          externalID: idInit,
          multiSubject: false,
          comment: null,
        })
    },
    //Creates new subject when doubleclicked on  position in  chart
 handleDblClick(position) {
        let idInit = uuidv4()
        this.$refs.chart.add({
          id: idInit,
          x: 10,
          y: 10,
          text: "Subjekt" + this.$store.state.nodes.length,
          type: "intern",
          SBD: {nodes: [], connections : []},
          externalID: idInit,
          multiSubject: false,
          comment: null,
        })
    },

    handleSelect(nodes) {
      // console.log(nodes);
    },
    handleSelectConnection(connections) {
      // console.log(connections);
    },
    async handleChartSave(nodes, connections) {
      alert(JSON.stringify(this.$store.state.nodes))
      alert(JSON.stringify(this.$store.state.connections))
    },
    //Opens edit dialogue for currently selected node
    handleEditNode(node) {
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
//Opens edit dialogue for currently selected connection
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
  },
    computed: {}, 
};
</script>

<style scoped>




.import {
position: fixed;
  top: 6%;
  left: 94%;
}

.export {
position: fixed;
  top: 6%;
  left: 90%;
}


.toolbar {
margin-left: 12px;
margin-bottom: 12px;
}
  

.title {
  margin-bottom: 0px;
}


#toolbar > button {
  margin-right: 4px;
  margin-left: 10px;
}


.container {
  width: 100%;
}

.tabs{
  margin-left: 1px;

}

</style>


<template>
  <div class="container">
    <div id="toolbar">
  <el-button-group >
    <el-button size="mini" @click="handleAddAction">Do-State</el-button>
    <el-button size="mini" @click="handleAddReceive">
      Receive-State
    </el-button>
        <el-button size="mini" @click="handleAddSend">
      Send-State
    </el-button>
  </el-button-group>
      <el-button size="mini" @click="$refs.chart.remove()">Löschen</el-button>
      <el-button size="mini" @click="$refs.chart.editCurrent()">
        Bearbeiten
      </el-button>
    </div>
    <flowchart
      :idSBD="$route.params.id"
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
    <SBDNodeDialog
      :idSBD="$route.params.id"
      :visible.sync="nodeDialogVisible"
      :node.sync="nodeForm.target"
    ></SBDNodeDialog>
    <ActionDialog
      :visible.sync="actionDialogVisible"
      :connection.sync="connectionForm.target"
      :operation="connectionForm.operation"
      :idSBD="$route.params.id"
    >
    </ActionDialog>
    <SendDialog
      :visible.sync="sendDialogVisible"
      :connection.sync="connectionForm.target"
      :operation="connectionForm.operation"
      :idSBD="$route.params.id"
    >
    </SendDialog>
        <ReceiveDialog
      :visible.sync="receiveDialogVisible"
      :connection.sync="connectionForm.target"
      :operation="connectionForm.operation"
      :idSBD="$route.params.id"
    >
    </ReceiveDialog>

  </div>
</template>
<script>
/* eslint-disable no-unused-vars */

import ConnectionDialog from "../components/Dialog/ConnectionDialog";
import ActionDialog from "../components/Dialog/ActionDialog";
import SendDialog from "../components/Dialog/SendDialog";
import ReceiveDialog from "../components/Dialog/ReceiveDialog";
import NodeDialog from "../components/Dialog/NodeDialog";
import SBDNodeDialog from "../components/Dialog/SBDNodeDialog";
import Flowchart from "../components/SBDflowchart/Flowchart";
import * as d3 from "d3";
import { roundTo20 } from "../utils/math";
import { mapFields } from 'vuex-map-fields';
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    SBDNodeDialog,
    ActionDialog,
    SendDialog,
    ReceiveDialog,
    Flowchart,
  },
  data: function () {
    return {
      connections: [],
      nodes: [],
      editableTabsValue: '2',
        tabIndex: 2,
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      actionDialogVisible: false,
      sendDialogVisible: false,
      receiveDialogVisible: false,
    };
  },
  methods: {
    //Adds new action state node 
    handleAddAction(){
        let idInit = uuidv4()
        this.$refs.chart.add({
          id: idInit,
          x: 10,
          y: 10,
          text: "DoState" + this.$store.state.nodes.find(element => element.id === this.$route.params.id).SBD.nodes.filter(element => element.type === "action").length,
          type: "action",
          externalID: idInit,
          comment: null, 
          state: null,
        })
    },
    //Adds new receive state node 
    handleAddReceive(){
        let idInit = uuidv4()
        this.$refs.chart.add({
          id: idInit,
          x: 10,
          y: 10,
          text: "Receive" + this.$store.state.nodes.find(element => element.id === this.$route.params.id).SBD.nodes.filter(element => element.type === "receive").length,
          type: "receive",
          externalID: idInit,
          comment: null, 
          state: null,
        })
    },
      //Adds new send state node 
    handleAddSend(){
        let idInit = uuidv4()
        this.$refs.chart.add({
          id: idInit,
          x: 10,
          y: 10,
          text: "Send" + this.$store.state.nodes.find(element => element.id === this.$route.params.id).SBD.nodes.filter(element => element.type === "send").length,
          type: "send",
          externalID: idInit,
          comment: null, 
          state: null,
        })
    },
  //No db click add merthod currently implemented
 handleDblClick(position) {
    },
    handleSelect(nodes) {
      // console.log(nodes);
    },
    handleSelectConnection(connections) {
      // console.log(connections);
    },
    async handleChartSave(nodes, connections) {},

    //Function receives curretly selected node when triggered 
    handleEditNode(node) {
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
    //Function receives curretly selected connection when triggered 
    //Different dialog visible depending on the source of the connection 
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      if(connection.source.type ==="action"){
        this.actionDialogVisible = true;
      } else if(connection.source.type ==="send"){
        this.sendDialogVisible = true;
      } else if(connection.source.type ==="receive"){
        this.receiveDialogVisible = true;
      }
    },
  },
  computed: {}, 
};
</script>

<style scoped>


#toolbar {
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
  margin: auto;
}

.tabs{
  margin-left: 1px;

}

.el-button-group{
  margin-left: 10px;

}

</style>

import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)



const store =  new Vuex.Store({
  // Only nodes and connections are saved 
  state: {
  connections: [],
  nodes: [],

  },
  // getfield is needed for vuex-map-getters 
  getters: { getField, 

  // returns node with specified id 
  getNode: 
  (state) => (id) => {
    return state.nodes.find(node => node.id === id)
  },

  // returns SBD with specified id 
  getSBD: 
  (state) => (id) => {
    let returnNode = null 
    state.nodes.forEach(node => {
        if(node.SBD.connections.find(elem => elem.id === id)){
          returnNode =  node
        }
    })
    return returnNode
  },

  //Aggregates all messages sent from a node to the specified node. 
  //Usually, this simply corresponds to the messages of a connection. 
  //function also catches the case if multiple connections go from a node to the specified node. 
  getOutgoingMessages : 
  (state) => (startID, endID) => {
    return state.connections.filter(element => element.destination.id === endID && element.source.id === startID).map(element => element.messages).flat(1)
  },

  //Aggregates all messages sent from a node to the specified node. 
  getIncomingMessages : 
  (state) => (startID, endID) => {
    return state.connections.filter(element => element.destination.id === startID && element.source.id === endID).map(element => element.messages).flat(1)
  }
  },
  mutations: { 
    //Neede for vuex-map-getters
    updateField,
    //Needed for loading the data from the sessionStorage
    initialiseStore(state) {
			// Check if the ID exists
			if(sessionStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(sessionStorage.getItem('store')))
				);
			}
		},
//Needed for loading import model 
set_all(state, jsonFile){
state.connections = jsonFile["connections"]
state.nodes = jsonFile["nodes"]
},
//Needed for working with SBD
set_connections(state, payload){
var indexHelp = state.nodes.map(i => i.id).indexOf(payload["id"])
state.nodes[indexHelp].SBD.connections = payload["connections"]
},
//Needed for working with SBD
set_nodes(state, payload){
  var indexHelp = state.nodes.map(i => i.id).indexOf(payload["id"])
  state.nodes[indexHelp].SBD.nodes = payload["nodes"]
  },

  //Deletes msg in SBD for receive/send states when corresponding message in SID is deleted
  reset_msg(state, payload){
    let indexNode = state.nodes.findIndex(element => element.id === payload["nodeID"])
    let connectionSBDID = state.nodes[indexNode].SBD.connections.findIndex(element => element.id === payload["connectionSBDID"])
    if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "receive"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].receiveMsg = ""
    } else if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "send"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].sendMsg = ""
    }
  },
    //Updates sender or receiver of a message if corresponding subjects/ interfaces in SID are altered/ deleted 
    //Similir to reset_msg with the difference that subjects/interfaces can be manipulated, messages can only be deleted
  set_from_to(state, payload){
    let indexNode = state.nodes.findIndex(element => element.id === payload["nodeID"])
    let connectionSBDID = state.nodes[indexNode].SBD.connections.findIndex(element => element.id === payload["connectionSBDID"])
    if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "receive"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].receiveFrom = payload["receive"]
    } else if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "send"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].sendTo = payload["send"]
    }
  },

  },
  })
export default store;

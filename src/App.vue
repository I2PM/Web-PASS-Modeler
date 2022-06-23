<template>
  <div class="container">
    <el-tabs @tab-click="handleClick" class="demo-tabs" v-model="editableTabsValue" type="card" >
  <el-tab-pane
    v-for="(item, index) in subjectTabs"
    :key="item.id"
    :label="item.text"
    :name="item.text"
    >
  </el-tab-pane>
</el-tabs>
  <router-view/>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';



export default {
  components: {},
	beforeCreate() {
		this.$store.commit('initialiseStore');
	},



  data: function () {
    return {
      editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
    };
  },
  async mounted() {},
  methods: {

    //handles navigation 
      async handleClick(obj, event) {
        console.log(obj.$vnode.key)
        console.log(obj.label) 
        if(obj.label==="SID"){
          this.$router.push('/')
        } else {
        this.$router.push('/SBD/' + (obj.$vnode.key))
        }
      },
  },
     computed: {
      
    nodes(){
      return this.$store.state.nodes
    },
       connections(){
      return this.$store.state.connections
    },
    //Renders all subjects as Tabs in SID as long as they are not extern/interfaces 
     subjectTabs() {
       return [{id : uuidv4(), text: "SID"}].concat(this.$store.state.nodes).filter(subject => subject.type != "extern") 
     }
  }, 
  watch: {
//Sync current model with sessionStorage 
   nodes: {
      handler() {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
      },
      deep: true
   },
      connections: {
      handler() {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
      },
      deep: true
   },
  }

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
  margin-left: 2px;
  margin-top: 10px;

}

</style>

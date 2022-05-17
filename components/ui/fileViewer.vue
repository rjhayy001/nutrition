<template>
    <v-layout row wrap>
     <v-flex xs1 class="pb-0" v-for="(item,index) in files" :key="index">
        <div

          class="text-center"
          @click="selected($event)"
          @focusout="deselect($event)"
        >
          <v-img
            :src="iconSelector(item)"
            height="50"
            width="50"
            @contextmenu.stop="show"
            class="ma-auto file"
            contain
          ></v-img>
          <div class="file-name">{{item.name}}</div>
        </div>
     </v-flex>
      <select-menu
        :dialog="showMenu"
        :options="menu_options"
        @close="showMenu=false"
      />
    </v-layout>
</template>
<script>
import iconHelper from '@/mixins/iconHelper'
import selectMenu from '@/components/clients/documents/selectMenu.vue'
export default {
  mixins: [iconHelper],
  props:['files'],
  components:{
    selectMenu
  },
  data(vm){
    return {
      showMenu: false,
      menu_options:{
        x:0,
        y:0,
        in_item_click:true
      },
    }
  },
  methods: {
    iconSelector(item){
      let srcIcon = this.types.find(type => type.type == item.type)
      if(item.type =='image'){
        return item.data
      }

      return srcIcon ? srcIcon.icon : this.unverifyIcon
    },
    show(e){
      e.preventDefault()
      this.showMenu = false
      this.menu_options.x = e.clientX
      this.menu_options.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    selected(e){
        console.log(e)
        e.target.classList.add("is_active")
    },
    deselect(e){
        alert('outclick')
        e.target.classList.remove("is_active")
    }
  }
}
</script>
<style scoped>
.file-name{
  white-space: nowrap;
  overflow: hidden;
  margin-top: 5px;
  text-overflow: ellipsis;
}
.is_active .file{
  background: #c3bcbc !important;
}

.is_active .file-name{
  color: white;
  background:#7c94de;
}
</style>

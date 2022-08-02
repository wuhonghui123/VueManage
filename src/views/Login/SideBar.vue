<template>
  <div class="sidebar">
    <ul class="menu" v-for="menu in navTree" :key="menu.id">
      <li>
        <router-link :to="menu.url" v-if="menu.url!=null"><i :class=menu.icon></i>{{ menu.name }}</router-link>
        <!--        系统管理-->
        <a v-else @click.prevent="test($event)"><i :class=menu.icon></i>{{ menu.name }}</a>

        <ul :class="submenu" v-if="menu.children.length>0">
          <li v-for="childMenu in menu.children" :key="childMenu.id">
            <router-link :to="childMenu.url" :class=childMenu.icon>{{ childMenu.name }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>


export default {
  name: "SideBar",
  data() {
    return {
      submenu: {
        submenuHide: true,
        submenuShow: false
      }
    }
  },
  computed: {
    navTree() {
      let tree = this.$store.getters.getNavTree;
      return tree;
    }
  },
  methods: {
    // test() {
    //   console.log(toRaw(this.$store));
    //   if (this.submenu.submenuHide){
    //     this.submenu.submenuHide = false;
    //     this.submenu.submenuShow = true;
    //
    //   }else {
    //     this.submenu.submenuHide = true;
    //     this.submenu.submenuShow = false;
    //   }
    // }
    test(event) {
      if (event.target.parentNode.lastChild.className=="submenuHide"){
        event.target.parentNode.lastChild.className="submenuShow"
      }else {
        event.target.parentNode.lastChild.className="submenuHide"
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 15%;
  height: 90%;
  background-color: chartreuse;
  float: left;
}

li {
  list-style: none;
  position: relative;
  border-style: solid;
  border-width: 1px 0 0;
  border-color: #E5E5E5;
}

.submenu > li {
  position: relative;
  padding-left: 40px;
}

a {
  display: block;
  width: 189px;
  height: 36px;
  color: #5d5d5d;
  text-decoration: none;
  line-height: 36px;
}

.fa {
  display: inline-block;
  margin-left: 14px;
  margin-right: 14px;
  font-family: 'FontAwesome';
  font-weight: normal;
  font-style: normal;
}


.submenuHide {
  display: none;
  position: relative;
}

.submenuShow {
  display: block;
  position: relative;
}


.submenu:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  left: 18px;
  top: 0;
  bottom: 0;
  border: 1px dotted;
  border-width: 0 0 0 1px; /* 上 右 下 左 */
}

.submenu > li:before {
  content: "";
  display: block;
  width: 10px;
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 17px;
  border: 1px dotted;
  border-width: 1px 0 0; /* 上 右 下*/
}

.active {
  color: red
}
</style>
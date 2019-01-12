<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="/dashboard">
        <img class="navbar-brand-full" src="/ms-icon-310x310.png" width="89" height="55" alt="logo">
        <img
          class="navbar-brand-minimized"
          src="/ms-icon-310x310.png"
          width="30"
          height="30"
          alt="Logo"
        >
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3" to="/MyInfo">{{user.name === "" ? "" : user.name + "님" + ` (${user.role})`}}</b-nav-item>
        <b-nav-item class="px-3">
          <DefaultHeaderDropdownAccnt/>
        </b-nav-item>
        <b-nav-item class="px-3" to="/board/set" v-if="user.role === 'admin'">게시판 설정</b-nav-item>
        <b-nav-item class="px-3" v-if="user.role === 'admin'">관리자용</b-nav-item>
        <b-nav-item class="px-3" v-if="user.role === 'admin'">관리자용2</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"></b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="makeBoardNavItems"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <div>
        <a href="#">maetan</a>
        <span class="ml-1">&copy; 2018</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="#">CoreUI for Vue</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
  import nav from "@/_nav";
  import {
    Aside as AppAside,
    Breadcrumb,
    Footer as TheFooter,
    Header as AppHeader,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    SidebarToggler
  } from "@coreui/vue";
  import DefaultAside from "./DefaultAside";
  import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
  import {mapGetters} from "vuex";
  import * as TYPE from "../config/mutation-types";

  export default {
    name: "DefaultContainer",
    components: {
      AppHeader,
      AppSidebar,
      AppAside,
      TheFooter,
      Breadcrumb,
      DefaultAside,
      DefaultHeaderDropdownAccnt,
      SidebarForm,
      SidebarFooter,
      SidebarToggler,
      SidebarHeader,
      SidebarNav,
      SidebarMinimizer
    },
    created: function () {
      this.$store.dispatch(`${TYPE.GET_BOARDS}`);
    },
    data() {
      return {
        nav: nav.items,
        boardCount: 0
      };
    },
    computed: {
      makeBoardNavItems() {
        console.log(`this.boardCount = ${this.boardCount}`)
        console.log(`this.boards.length = ${this.boards.length}`)
        if (this.boardCount === 0) {
          for (let board of this.boards) {
            this.nav.splice(2, 0, {
              name: board.name,
              url: `/board?id=${board.id}&name=${board.name}`,
              icon: 'icon-pencil'
            })
          }
        }
        if (this.boardCount !== 0 && this.boardCount !== this.boards.length) {
          this.nav.splice(2, this.boardCount)
          for (let board of this.boards) {
            this.nav.splice(2, 0, {
              name: board.name,
              url: `/board?name=${board.name}`,
              icon: 'icon-pencil'
            })
          }
        }
        this.boardCount = this.boards.length
        return this.nav
      },
      name() {
        return this.$route.name;
      },
      list() {
        return this.$route.matched.filter(
          route => route.name || route.meta.label
        );
      },
      ...mapGetters(["user", "boards"])
    }
  };
</script>

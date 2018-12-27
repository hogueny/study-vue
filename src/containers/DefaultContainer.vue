<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="/ms-icon-310x310.png" width="89" height="55" alt="logo">
        <img class="navbar-brand-minimized" src="/ms-icon-310x310.png" width="30" height="30" alt="Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">{{user.name === "" ? "" : user.name + "님"}}</b-nav-item>
        <b-nav-item class="px-3"><DefaultHeaderDropdownAccnt/></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"></b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
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
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import { mapGetters } from "vuex";

export default {
  name: 'DefaultContainer',
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
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    ...mapGetters(["user"])
  }
}
</script>

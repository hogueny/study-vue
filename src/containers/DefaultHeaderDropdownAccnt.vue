<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img src="img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>{{user.name}} 계정</strong>
      </b-dropdown-header>
      <b-dropdown-item>
        <i class="fa fa-bell-o"/>수정
      </b-dropdown-item>
      <b-dropdown-item v-if="user.id === -1" @click="login">
        <i class="fa fa-lock"/>로그인
      </b-dropdown-item>
      <b-dropdown-item v-else @click="logout">
        <i class="fa fa-lock"/>로그아웃
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import * as TYPE from "../config/mutation-types";
import { mapGetters } from "vuex";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    logout: async function() {
      this.$store.commit(`${TYPE.LOGOUT}`);
      this.$router.push("/");
    },
    login: function() {
      console.log("go to login page");
      this.$router.push("/login");
    }
  }
};
</script>

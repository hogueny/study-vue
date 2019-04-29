<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img src="img/avatars/6.png" class="img-avatar" alt="admin@bootstrapmaster.com">
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>{{user.name}} 님의 계정</strong>
      </b-dropdown-header>
      <div v-if="user.id === -1">
        <b-dropdown-item @click="login">
          <i class="fa fa-lock"></i>로그인
        </b-dropdown-item>
        <b-dropdown-item @click="signup">
          <i class="fa fa-lock"></i>회원 가입
        </b-dropdown-item>
      </div>
      <div v-else>
        <b-dropdown-item @click="modify">
          <i class="fa fa-bell-o"></i>수정
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
          <i class="fa fa-lock"></i>로그아웃
        </b-dropdown-item>
      </div>
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
    modify: async function() {
      console.log("go to modify page");
      this.$router.push("/modify");
    },
    logout: async function() {
      this.$store.commit(`${TYPE.LOGOUT}`);
      this.$router.push("/");
    },
    login: function() {
      console.log("go to login page");
      this.$router.push("/login");
    },
    signup: function() {
      this.$router.push("/signup");
    }
  }
};
</script>

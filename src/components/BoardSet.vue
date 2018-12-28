<template>
  <b-card header-tag="header" footer-tag="footer">
    <div slot="header">
      <i class="fa fa-align-justify"></i>
      <strong>게시판 설정</strong>
      <div class="card-header-actions">
        <a
          href="https://bootstrap-vue.js.org/docs/components/list-group"
          class="card-header-action"
          rel="noreferrer noopener"
          target="_blank"
        >
          <small class="text-muted">docs</small>
        </a>
      </div>
    </div>
    <b-list-group>
      <b-list-group-item to="/board/create">게시판 생성</b-list-group-item>
      <b-list-group-item to="/boards">게시판 목록</b-list-group-item>
      <b-list-group-item to="/board/update">게시판 수정</b-list-group-item>
      <b-list-group-item to="/board/remove">게시판 삭제</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import * as TYPE from "../config/mutation-types";
import { mapGetters } from "vuex";

export default {
  name: "admin-bar",
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

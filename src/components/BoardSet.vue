<template>
  <div>
    <div class="animated fadeIn" v-if="user.id !== -1">
      <b-card no-body>
        <b-card-header>
          <strong>작업</strong>
        </b-card-header>
        <b-card-body>
          <b-row class="align-items-center">
            <b-col cols="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
              <b-button block variant="primary" @click="createBoard">생성</b-button>
            </b-col>
            <b-col cols="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
              <b-button block variant="warning">수정</b-button>
            </b-col>
            <b-col cols="6" sm="4" md="2" xl class="mb-3 mb-xl-0">
              <b-button block variant="danger">Danger</b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>

      <b-card header-tag="header" footer-tag="footer">
        <div slot="header">
          <i class="fa fa-align-justify"></i>
          <strong>게시판 목록</strong>
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
        <b-list-group v-for="item in boards" :key="item.id">
          <b-list-group-item>
            이름
            <input type="text" v-model="item.name">
            생성일: {{item.regDate | dateToPritty}}
            <b-button variant="warning" @click="updateBoard(item)">수정</b-button>
            <b-button variant="danger" @click="removeBoard(item.id)">삭제</b-button>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <div v-else>
      <permission/>
    </div>
  </div>
</template>

<script>
import * as TYPE from "../config/mutation-types";
import { mapGetters } from "vuex";
import permission from "../views/pages/permission";
import moment from "moment";

export default {
  name: "admin-bar",
  components: {
    permission
  },
  created: function() {
    this.$store.dispatch(`${TYPE.GET_BOARDS}`);
  },
  computed: {
    ...mapGetters(["user", "boards"])
  },
  methods: {
    createBoard: async function() {},
    updateBoard: async function(item) {
      const result = await this.$store.dispatch(`${TYPE.UPDATE_BOARD}`, {
        boardId: item.id,
        name: item.name
      });
      if (result !== 200) {
        if (result === 400) {
          console.error("이름이 최소 3글자 되야함");
        }
        if (result === 400) {
          console.error("없는 게시판");
        }
        if (result === 401) {
          console.error("권한이 없음");
        }
        if (result === 500) {
          console.error("서버 에러~");
        }
        return false
      }
      console.log("성공적으로 수정됨")
    },
    removeBoard: async function(id) {}
  },
  filters: {
    dateToPritty: function(target) {
      return moment(target)
        .local()
        .format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

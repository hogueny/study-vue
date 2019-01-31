<template>
  <div>
    <div class="animated fadeIn" v-if="user.id !== -1">
      <b-card no-body>
        <b-card-header>
          <strong>작업</strong>
        </b-card-header>
        <b-card-body>
          <b-row class="align-items-center">
            <b-col cols="6" sm="4" md="2">
              name : <input type="text" v-model="board.name"> <br>
              role : <input type="text" v-model="board.role">
              <b-button block variant="primary" @click="createBoard">생성</b-button>
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
            이름 : <input type="text" v-model="item.name"> <br>
            권한 : <input type="text" v-model="item.role"> <br>
            생성일: {{item.regDate | dateToPritty}} <br>
            <b-button variant="warning" @click="updateBoard(item)">수정</b-button>
            <b-button variant="danger" @click="removeBoard(item.id)">삭제</b-button>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <div v-else>
      <permission/>
    </div>
    <b-alert :show="dismissCountDown"
             dismissible
             :variant="type"
             @dismissed="dismissCountdown=0"
             @dismiss-count-down="countDownChanged">
              {{msg}}
    </b-alert>
  </div>
</template>

<script>
  import * as TYPE from "../config/mutation-types";
  import {mapGetters} from "vuex";
  import permission from "../views/pages/permission";
  import moment from "moment";

  export default {
    name: "admin-bar",
    data: function () {
      return {
        board:{
          name : "",
          role : "nomal"
        },
        dismissCountDown: 0,
        msg: "",
        type: "success"
      };
    },
    components: {
      permission
    },
    created: function () {
      this.$store.dispatch(`${TYPE.GET_BOARDS}`);
    },
    computed: {
      ...mapGetters(["user", "boards"])
    },
    methods: {
      setNoti (msg, type) {
        this.msg = msg;
        this.type = type;
        this.dismissCountDown = 3
      },
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      createBoard: async function () {
        const result = await this.$store.dispatch(
          `${TYPE.CREATE_BOARD}`,
          this.board
        );
        if (result !== 201) {
          if (result === 500) {
            console.error("서버 에러");
            this.setNoti("서버 에러", "danger");
          }
          if (result === 400) {
            console.error("이름이 최소 3글자 되야함");
            this.setNoti("이름이 최소 3글자 되야 함", "danger");
          }
          if (result === 404) {
            console.error("사용자가 없음");
            this.setNoti("사용자가 없음", "danger");
          }
          if (result === 4001) {
            console.error("권한이 없음");
            this.setNoti("권한이 없음", "danger");
          }
          return false;
        }
        console.log("성공적으로 생성됨");
        this.setNoti("성공적으로 생성됨", "success");
      },
      updateBoard: async function (item) {
        const result = await this.$store.dispatch(`${TYPE.UPDATE_BOARD}`, {
          boardId: item.id,
          name: item.name,
          role: item.role
        });
        if (result !== 200) {
          if (result === 400) {
            console.error("이름이 최소 3글자 되야함");
            this.setNoti("이름이 최소 3글자 되야 함", "danger");
          }
          if (result === 404) {
            console.error("없는 게시판");
            this.setNoti("없는 게시판", "danger");
          }
          if (result === 401) {
            console.error("권한이 없음");
            this.setNoti("권한이 없음", "danger");
          }
          if (result === 500) {
            console.error("서버 에러~");
            this.setNoti("서버 에러", "danger");
          }
          return false;
        }
        console.log("성공적으로 수정됨");
        this.setNoti("성공적으로 수정됨", "success");
      },
      removeBoard: async function (id) {
        const result = await this.$store.dispatch(`${TYPE.DELETE_BOARD}`, id);
        if (result !== 204) {
          if (result === 404) {
            console.error("없는 게시판");
            this.setNoti("없는 게시판", "danger");
          }
          if (result === 401) {
            console.error("권한이 없음");
            this.setNoti("권한이 없음", "danger");
          }
          if (result === 500) {
            console.error("서버 에러~");
            this.setNoti("서버 에러", "danger");
          }
          if (result === 4401) {
            console.error("토큰 만료");
            this.setNoti("토큰 만료", "danger");
            const refresh = await this.$store.dispatch(`${TYPE.REFRESH_TOKEN}`);
            if (refresh === 200) {
              const resultByRefresh = await this.$store.dispatch(
                `${TYPE.DELETE_BOARD}`,
                id
              );
              if (resultByRefresh !== 204) {
                if (result === 404) {
                  console.error("없는 게시판");
                  this.setNoti("없는 게시판", "danger");
                }
                if (result === 401) {
                  console.error("권한이 없음");
                  this.setNoti("권한이 없음", "danger");
                }
                if (result === 500) {
                  console.error("서버 에러~");
                  this.setNoti("서버 에러", "danger");
                }
              }
              console.log("성공적으로 삭제됨 2");
              this.setNoti("성공적으로 삭제됨", "success");
              return true;
            }
            if (refresh === 500 || refersh === 404 || refresh === 4404) {
              return false;
            }
          }
          return false;
        }
        console.log("성공적으로 삭제됨");
        this.setNoti("성공적으로 삭제됨", "success");
      }
    },
    filters: {
      dateToPritty: function (target) {
        return moment(target)
          .local()
          .format("YYYY-MM-DD HH:mm");
      }
    }
  };
</script>

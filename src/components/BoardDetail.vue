<template>
  <div>
    <div class="message-page" v-if="user.id !== -1">

      <b-card header-tag="header" footer-tag="footer">
        <div slot="header">
          <i class="fa fa-align-justify"></i>
          <strong>상세메시지</strong>
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
            <div>
              <table width>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Contents</th>
                  <th>RegDate</th>
                  <th>modDate</th>
                </tr>
                <tr v-for="item in messages" :key="item.id">
                  <td>{{ item.id }} </td>
                  <td>{{ item.title }} </td>
                  <td>{{ item.contents }} </td>
                  <td>{{ item.regDate | dateToPritty}} </td>
                  <td>{{ item.modDate | dateToPritty}} </td>
                </tr>
              </table>
            </div>
      </b-card>

      <b-card header-tag="header" footer-tag="footer">
        <div slot="header">
          <i class="fa fa-align-justify"></i>
          <strong>메시지 수정</strong>
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
        <b-list-group v-for="item in messages" :key="item.id">
          <b-list-group-item>
            제목 : 
            <input type="text" v-model="item.title"><br>
            내용 :
            <input type="text" v-model="item.contents"><br>
            <b-button variant="warning" @click="updateMessage(item)">수정</b-button>
            <b-button variant="danger" @click="removeMessage(item.id)">삭제</b-button>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <div v-else>
      <permission/>
    </div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="type"
      @dismissed="dismissCountdown=0"
      @dismiss-count-down="countDownChanged"
    >{{msg}}</b-alert>
  </div>
</template>

<script>
import * as TYPE from "../config/mutation-types";
import { mapGetters } from "vuex";
import permission from "../views/pages/permission";
import moment from "moment";
import { async } from "q";
export default {
  name: "message-page",
  data: function() {
    return {
      message: {
        boardId: this.$route.query.id,
        title: "",
        contents: ""
      },
      boardId: this.$route.query.id,
      dismissCountDown: 0,
      msg: "",
      type: "success"

    };
  },
  components: {
    permission
  },
  created: function() {
    this.$store.dispatch(`${TYPE.GET_MESSAGE_DETAIL}`,this.$route.query.boardId);
  },
  computed: {
    ...mapGetters(["user", "boards", "messages"]),
    boardName: function () {
      return this.$route.query.name
    }
  },
  methods: {
    setNoti(msg, type) {
      this.msg = msg;
      this.type = type;
      this.dismissCountDown = 3;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    updateMessage: async function(item) {
      const result = await this.$store.dispatch(`${TYPE.UPDATE_MESSAGE}`, {
        boardId: item.boardId,
        messageId: item.id,
        title: item.title,
        contents: item.contents
      });
      if (result !== 200) {
        if (result === 400) {
          console.error("제목이 최소 3글자 되야함");
          this.setNoti("제목이 최소 3글자 되야 함", "danger");
        }
        if (result === 404) {
          console.error("없는 메시지");
          this.setNoti("없는 메시지", "danger");
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
    removeMessage: async function(id) {
      const result = await this.$store.dispatch(`${TYPE.DELETE_MESSAGE}`, id);
      if (result !== 204) {
        if (result === 404) {
          console.error("없는 메시지");
          this.setNoti("없는 메시지", "danger");
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
              `${TYPE.DELETE_MESSAGE}`,
              id
            );
            if (resultByRefresh !== 204) {
              if (result === 404) {
                console.error("없는 메시지");
                this.setNoti("없는 메시지", "danger");
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
    dateToPritty: function(target) {
      return moment(target)
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

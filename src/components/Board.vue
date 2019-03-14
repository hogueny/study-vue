<template>
  <div>
    <div class="message-page" v-if="user.id !== -1">

      <b-card header-tag="header" footer-tag="footer">
        <div slot="header">
          <i class="fa fa-align-justify"></i>
          <strong>{{boardName}}</strong>
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
                  <th>RegDate</th>
                </tr>
                 
                <tr v-for="item in messages" :key="item.id">
                  <td> {{item.id }} </td>
                  <b-button @click="getMessageDetail(item.id)">
                  <td>{{ item.title }}</td>
                  </b-button>
                  <td>{{ item.regDate | dateToPritty}}</td>
                
                </tr>
                
              </table>
              <span v-for="page in pageInfo.totalPage" :key="page">
                <b-button @click="paging(page)">{{page}}</b-button>
              </span>
            </div>
      </b-card>

        <b-card no-body>
           <b-card-header>
             <strong>메시지 생성</strong>
           </b-card-header>
        <b-card-body>
          <b-row class="align-items-center">
            <b-col cols="6" sm="4" md="2">
              
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="cui-info icons"></i>
                      </b-input-group-text>
                  </b-input-group-prepend>
                <b-form-input type="text" placeholder="Title" v-model="message.title"></b-form-input>
              </b-input-group>
              
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="cui-info icons"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Contents" v-model="message.contents"></b-form-input>
                </b-input-group>
              </b-form-group>
              <b-button block variant="primary" @click="createMessage">작성</b-button>
            </b-col>
          </b-row>
        </b-card-body>
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
import Router from 'vue-router';

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
      page: this.$route.query.page,
      dismissCountDown: 0,
      msg: "",
      type: "success"

    };
  },
   watch: {
      "$route.query": function (params) {
          console.log("--board.vue--")
          console.log("params : ", params)
          console.log("id:",params.id,"page:",params.page)
          this.boardId = params.id
          this.title = params.title
          this.page = params.page
          this.$store.dispatch(`${TYPE.GET_MESSAGES}`,[this.boardId,this.page]);
      }
    },
  components: {
    permission
  },
  created: function() {
    this.$store.dispatch(`${TYPE.GET_MESSAGES}`,[this.boardId,this.page]);
  },
  computed: {
    ...mapGetters(["user", "boards", "messages", "pageInfo"]),
    boardName: function () {
      return this.$route.query.name
    }
  },
  methods: {
    getMessageDetail(id) {
      console.log("-----getMessageDetail---------");
      console.log("messageId : ",id);
      this.$store.dispatch(`${TYPE.GET_MESSAGE_DETAIL}`,id);
      this.$router.push('board/Message'); // 상세보기
    },
    paging(page){
      // 버튼을 누를시 page값을 줄수있도록 하자
      console.log("버튼 : ",page);
      this.$route.query.page = page;
      console.log("쿼리파라미터",this.$route.query.page);
      this.$store.dispatch(`${TYPE.GET_MESSAGES}`,[this.boardId,this.$route.query.page]);
    },
    setNoti(msg, type) {
      this.msg = msg;
      this.type = type;
      this.dismissCountDown = 3;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    createMessage: async function() {
      const result = await this.$store.dispatch(
        `${TYPE.CREATE_MESSAGE}`,
        this.message
      );
      if (result !== 201) {
        if (result === 500) {
          console.error("서버 에러");
          this.setNoti("서버 에러", "danger");
        }
        if (result === 400) {
          console.error("제목이 최소 3글자 되야함");
          this.setNoti("제목이 최소 3글자 되야 함", "danger");
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

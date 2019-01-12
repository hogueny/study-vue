<template>
  <div id="my-info">
    <b-card>
      <div slot="header"> 
        <i class="fa fa-align-justify"></i>
        <strong> 내 정보</strong> 
        </div>
        <b-form @submit.prevent="modify">
          이름 : {{user.name}}<br>
          나이 : {{user.age}}<br>
          이메일 : {{user.email}}<br>
          생성일 : {{user.regDate | dateToPritty }} <br>
          <b-button type="submit" size="sm" variant="success">수정하기</b-button>
        </b-form>
    </b-card>
  <b-card header-tag="header" footer-tag="footer">
        <div slot="header">
          <i class="fa fa-align-justify"></i>
          <strong> 작성한 게시물 </strong>
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
            게시판명 : {{item.boardId}} //* boarName으로 출력되게 수정해야됨 *// <br>
            제목 : {{item.title}} <br>
            내용 : {{item.contents}} <br>  
            생성일: {{item.regDate | dateToPritty}} 
            </b-list-group-item>
        </b-list-group>
      </b-card>
  </div>
</template>


<script>
import * as TYPE from "../config/mutation-types";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "my-info",
  data: function() {
    return {
    };
  },
  created: function() {
    this.$store.dispatch(`${TYPE.GET_MESSAGE}`);
  },
  computed: {
    ...mapGetters(["user","messages","boards"])
  },
  methods: {
    modify(){
      this.$router.push({path:"/modify"});
    }
  },
  filters: {
      dateToPritty: function (target) {
        return moment(target)
          .local()
          .format("YYYY-MM-DD HH:mm:ss");
      }
    }
  };
</script>

<style>
#login-page {
  height: 500;
  width: auto;
  border: 1px solid rgb(128, 0, 0);
}
</style>


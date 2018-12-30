<template>
  <div class="wrapper">
    <b-card header-tag="header" footer-tag="footer">
      <div slot="header">
        <i class="fa fa-align-justify"></i>
        <strong>{{" " + getBoardName}}</strong>
      </div>
      <b-list-group>
        <b-list-group-item href="#" active class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas
            sed diam eget risus varius blandit.
          </p>
          <small>Donec id elit non mi porta.</small>
        </b-list-group-item>
        <b-list-group-item href="#" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas
            sed diam eget risus varius blandit.
          </p>
          <small class="text-muted">Donec id elit non mi porta.</small>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "board",
  data: function () {
    return {
      boardName: ""
    }
  },
  computed: {
    getBoardName: function() {
      this.boardName = this.$route.query.name;
      return this.boardName
    }
  }
};
</script>

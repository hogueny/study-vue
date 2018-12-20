<template>
  <div id="custom-header">헤더~!~!~!~</div>
</template>

<script>
export default {
  name: "custom-header",
  created: function() {
    console.log("야호")
  }
};
</script>

<style>
#custom-header {
  border: 1px solid black;
  width: auto;
  height: 100px;
}
</style>

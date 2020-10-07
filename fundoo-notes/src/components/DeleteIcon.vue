<template>
  <div id="delete">
    <md-icon @click.native="isDeleted = !isDeleted">delete</md-icon>
  </div>
</template>
<script>
export default {
  name: "DeleteIcon",
  data() {
    return {
      isDeleted: false
    };
  }
};
</script>
<style lang="scss" scoped></style>

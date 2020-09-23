<template>
  <div id="container"><div id="login-title">Fundoo</div></div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  left: 30vw;
  top: 10vh;
  width: 40vw;
  height: 80vh;
  border: 1px solid rgba($color: gray, $alpha: 0.6);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
#login-title {
  font-size: 25px;
  line-height: 25px;
  margin-top: 10vh;
}
</style>

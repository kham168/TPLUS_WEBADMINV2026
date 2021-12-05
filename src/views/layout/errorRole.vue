<template>
  <div class="card-403">
    <div class="error-container">
      <div class="error-card">
        <h1>4</h1>
      </div>
      <div class="error-card">
        <img :src="require('@/assets/Images/Something.png')" alt="">
      </div>
      <div class="error-card">
        <h1>3</h1>
      </div>
    </div>
    <div class="text-show-error">
      <h1>Access Denied</h1>
      <p>this page your were tying to reach is absolutely forbidden for some reason</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "errorRole"
}
</script>

<style scoped lang="scss">
.card-403 {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error-container {
    width: 950px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    .error-card {
      width: 300px;
      height: 300px;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: #4b96da;
      img {
        width: 100%;
        height: 100%;
      }

      h1 {
        font-family: $font-family;
        font-size: 20rem;
        font-weight: 900;
      }
    }
  }

  .text-show-error {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      text-transform: capitalize;
      font-size: 22px;
    }
  }
}
</style>

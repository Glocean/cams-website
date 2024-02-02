<template>
  <div class="home">
    <video autoplay muted loop id="myVideo">
      <source src="@/assets/ocean_background_loop.mp4" type="video/mp4">
    </video>
    <div id="overlay"/>
    <div class="content">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
  z-index: -1;
}

#overlay {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.content {
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}

</style>
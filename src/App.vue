<template>
  <Navbar/>
  <video autoplay muted loop id="myVideo" class="fadein animation-duration-500">
    <source src="/Underwater_Garden.mp4" type="video/mp4">
  </video>
  <div id="overlay"/>
  <router-view/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

html, body{
  height: 100%;
  margin: 0px;
  padding: 0px;
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

.p-paginator {
  border-radius: 0 !important;
}

</style>

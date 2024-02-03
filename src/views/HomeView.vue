<template>
  <div class="home">
    <video autoplay muted loop id="myVideo" class="fadein animation-duration-1000">
      <source :src="require('@/assets/ocean_background_loop.mp4')" type="video/mp4">
    </video>
    <div id="overlay"/>
    <div class="content fadein animation-ease-in animation-duration-1000" onload="this.style.opacity='1';">
      <div class="flex flex-column">  
        <div class="align-items-center justify-content-center h-4rem border-round m-8">
          WELCOME
        </div>
        <div class="flex flex-row align-items-center justify-content-center m-2">
          <p-avatar class="w-28rem h-28rem" size="xlarge" shape="circle" :image="require('@/assets/headshot.png')"/>
          <div class="flex flex-column m-5">
            <div>Cameron Dahr</div>
            <p-divider style="border-top: 1px white;"></p-divider>
          </div>
        </div>
        <div class="flex flex-row align-items-center justify-content-center m-5">
          <p-card style="width: 70rem;">
            <template #content>
              <p class="text-2xl">
                Hi, my name is Cameron, and I am a Full Stack Software Developer. I graduated from the University of New Brunswick in May of 2020 with a degree in Software Engineering. This is the landing page for the website I made using Vue 3 to learn about web deployment. My hobbies include playing video games (my favorite is an indie game called Dredge), collecting board games and dice, reading/writing, and playing Dungeons and Dragons. I also enjoy watching movies, and log movies I watch on Letterboxd (link to my profile above)! I also love the ocean; I hope to one day learn to scuba dive and my favorite animal is an octopus!
              </p>
            </template>
          </p-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomeView",
  components: {
  },
};
</script>

<style scoped>
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

.home {
  display: grid;
  height: 100%;
  width: 100%;
}

.content {
  height: -webkit-fill-available;
  display: grid;
  place-items: center;
  font-family: Garamond !important;
  font-size: 3.2vw;
}

.p-divider-horizontal {
  border-top: 1px #ffffff;
}

</style>
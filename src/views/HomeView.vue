<template>
  <div class="home">
    <video autoplay muted loop id="myVideo" class="fadein animation-duration-1000">
      <source :src="require('@/assets/ocean_background_loop.mp4')" type="video/mp4">
    </video>
    <div id="overlay"/>
    <div class="content fadein animation-ease-in animation-duration-1000" onload="this.style.opacity='1';">
      <div class="flex flex-column">  
        <div class="align-items-center justify-content-center m-8" id="title">
          WELCOME
        </div>
        <div class="flex flex-row align-items-center justify-content-center m-2">
          <p-avatar class="w-28rem h-28rem" size="xlarge" shape="circle" :image="require('@/assets/headshot.png')"/>
          <div class="flex flex-column m-8">
            <div class="flex flex-row align-items-center justify-content-evenly">Cameron Dahr</div>
            <p-divider class="flex flex-row align-items-center justify-content-evenly" style="border-color:white;"></p-divider>
            <div class="flex flex-row align-items-center justify-content-evenly">
              <p-button severity="contrast" text link rounded aria-label="GitHub" v-tooltip.bottom="{ value: 'GitHub' }">
                <template #icon>
                  <a href="https://github.com/C-Dahr" target="_blank">
                    <font-awesome-icon class="text-3xl" icon="fa-brands fa-github" color="white" />
                  </a>
                </template>
              </p-button>
              <p-button severity="info" text link aria-label="LinkedIn" v-tooltip.bottom="{ value: 'LinkedIn' }">
                <template #icon>
                  <a href="https://www.linkedin.com/in/cameron-dahr-8a943a129/" target="_blank">
                    <font-awesome-icon class="text-4xl" icon="fa-brands fa-linkedin" color="#00A0DC" />
                  </a>
                </template>
              </p-button>
              <p-button severity="warning" text link rounded aria-label="LetterBoxd" v-tooltip.bottom="{ value: 'Letterboxd' }">
                <template #icon>
                  <a href="https://letterboxd.com/Cam_Dahr/" target="_blank">
                    <font-awesome-icon class="text-3xl" icon="fa-brands fa-letterboxd" color="#ff8000" />
                  </a>
                </template>
              </p-button>
              <p-button severity="success" text aria-label="Facebook" v-tooltip.bottom="{ value: 'Facebook' }">
                <template #icon>
                  <a href="https://www.facebook.com/cameron.dahr.1" target="_blank">
                    <font-awesome-icon class="text-4xl" icon="fa-brands fa-square-facebook" color="lime"/>
                  </a>
                </template>
              </p-button>
              <p-button severity="help" text aria-label="Twitch" v-tooltip.bottom="{ value: 'Twitch' }">
                <template #icon>
                  <a href="https://www.twitch.tv/glocean" target="_blank">
                    <font-awesome-icon class="text-3xl" icon="fa-brands fa-twitch" color="#b9a3e3"/>
                  </a>
                </template>
              </p-button>
              <p-button severity="danger" text aria-label="Youtube" v-tooltip.bottom="{ value: 'YouTube' }">
                <template #icon>
                  <a href="https://www.youtube.com/@GloceanTTV" target="_blank">
                    <font-awesome-icon class="text-3xl" icon="fa-brands fa-youtube" color="#ff5555"/>
                  </a>
                </template>
              </p-button>
            </div>
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

#title {
  font-size: 4.2vw;
}

</style>
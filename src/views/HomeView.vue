<template>
  <div class="home">
    <div class="flex flex-column align-items-center justify-content-center fadein animation-ease-in animation-duration-1000">  
      <div class="flex flex-row align-items-center justify-content-center flex-wrap m-2">
        <p-avatar class="h-25rem w-25rem shadow-6" shape="circle" image="../src/assets/headshot.png"/>
        <div class="flex flex-column m-8">
          <div class="flex flex-row align-items-center justify-content-center">Cameron Dahr</div>
          <div class="flex flex-row align-items-center justify-content-center m-3">
            <p-divider class="my-divider w-10"/>
          </div>
          <div class="flex flex-row align-items-center justify-content-around flex-wrap">
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
        <p-card class="shadow-5" style="width: 45%;background:rgba(0, 0, 0, 0.5);">
          <template #content>
            <p id="card-text">
              Hi, my name is Cameron, and I am a Full Stack Software Developer. I graduated from the University of New Brunswick in May of 2020 with a degree in Software Engineering. This is the landing page for the website I made using Vue 3 to learn about web deployment. My hobbies include playing video games (my favorite is an indie game called Dredge), collecting board games and dice, reading/writing, and playing Dungeons and Dragons. I also enjoy watching movies, and log movies I watch on Letterboxd (link to my profile above)! I also love the ocean; I hope to one day learn to scuba dive and my favorite animal is an octopus!
            </p>
          </template>
        </p-card>
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

.home {
  display: grid;
  width: 100%;
  height: -webkit-fill-available;
  place-items: center;
  font-family: Garamond !important;
  font-size: 6vh;
}

#title {
  font-size: 8vh;
}

#card-text {
  font-size: 2vh;
}

.p-divider.p-divider-horizontal:before {
    border-top: 1px #ffffff;
    border-top-style: solid;
}

</style>
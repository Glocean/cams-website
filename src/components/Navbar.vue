<template>
    <p-menu class="navbar" :model="items">
        <template #start>
            <p-image alt="logo" src="/logo.png" width="50" class="mr-2"/>
        </template>
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate">
                    <font-awesome-icon :icon="item.icon" />
                    <span class="nav-label">{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                <font-awesome-icon :icon="item.icon" />
                <span class="nav-label">{{ item.label }}</span>
                <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
            </a>
        </template>
        <template #end>
        </template>
    </p-menu>
</template>

<script>
export default {
  name: "Main-Navbar",
  data() {
    return{
        items: [
            {
                label: 'HOME',
                icon: 'fa-solid fa-house',
                route: '/'
            },
            {
                label: 'GAMES',
                icon: 'fa-solid fa-gamepad',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'fa-solid fa-table',
                        route: '/games'
                    },
                    {
                        label: 'Stats',
                        icon: 'fa-solid fa-chart-simple',
                        route: '/games/stats'
                    },
                    {
                        label: 'Timeline',
                        icon: 'fa-solid fa-timeline',
                        route: '/games/timeline'
                    }
                ]
            },
            {
                label: 'TASKMASTER',
                icon: 'fa-solid fa-envelope',
                items: [
                    {
                        label: 'COMING SOON',
                        icon: 'fa-solid fa-envelope',
                    },
                ]
            },
            {
                label: 'CONTACT',
                icon: 'fa-solid fa-phone'
            }
        ]
    }
  }
};
</script>

<style>

.navbar {
    border-radius: 0px !important;
    border: 0px !important;
}

.logo {
    max-height: 10%;
}

</style>
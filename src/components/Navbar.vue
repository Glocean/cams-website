<template>
    <p-menu class="navbar" :model="items">
        <template #start>
            <p-image alt="logo" :src="require('@/assets/Logo_shadow.png')" width="50" class="mr-2"/>
        </template>
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span class="ml-2 nav-label">{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2 nav-label">{{ item.label }}</span>
                <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
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
                icon: 'pi pi-home',
                route: '/'
            },
            {
                label: 'ABOUT',
                icon: 'pi pi-star',
                route: '/about'
            },
            {
                label: 'TASKMASTER',
                icon: 'pi pi-envelope',
                items: [
                    {
                        label: '2022',
                        route: '/taskmaster/2022'
                    },
                    {
                        label: '2023',
                        route: '/taskmaster/2023'
                    }
                ]
            },
            {
                label: 'CONTACT',
                icon: 'pi pi-phone'
            }
        ]
    }
  }
};
</script>

<style>

.navbar {
    width: 100%;
    border-radius: 0px;
    border: none;
}

.logo {
    max-height: 10%;
}

</style>
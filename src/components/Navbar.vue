<template>
    <p-menu class="navbar" :model="items">
        <template #start>
        </template>
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
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
                label: 'Home',
                icon: 'pi pi-home',
                route: '/'
            },
            {
                label: 'About',
                icon: 'pi pi-star',
                route: '/about'
            },
            {
                label: 'Taskmaster',
                icon: 'pi pi-search',
                items: [
                    {
                        label: '2022',
                        icon: 'pi pi-bolt'
                    },
                    {
                        label: '2023',
                        icon: 'pi pi-server'
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        items: [
                            {
                                label: 'Apollo',
                                icon: 'pi pi-palette'
                            },
                            {
                                label: 'Ultima',
                                icon: 'pi pi-palette'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]
    }
  }
};
</script>

<style>

.navbar{
    width: 100%;
    border-radius: 0px;
    border: none;
}

</style>
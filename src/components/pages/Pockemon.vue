<template>
    <div class="home">
        <div class="home__inner">
            <BaseButton
                    variant="primary"
                    @click="router.push('/')"
            >
                <span>Back</span>
            </BaseButton>
            <div class="pockemon" v-if="pokemon">
                <div class="pockemon__img">
                    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" alt="">
                </div>
                <div class="pockemon__name text24 semi-bold-text">
                    {{pokemon.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import {useRoute, useRouter} from "vue-router";

    import BaseButton from '#/components/ui/BaseButton.vue'

    const router = useRouter()
    const route = useRoute()
    const pokemon = ref(null)

    onMounted(() => {
        fetchPokemon(route.params.name)
    })

    async function fetchPokemon(name) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            pokemon.value = await res.json()
        } catch (e) {
            console.error('Ошибка загрузки покемона:', e)
        } finally {
            console.log(pokemon.value)
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        padding: 1em;
        min-height: 100vh;
        @include center;
        &__inner {
            border-radius: 1.5em;
            background: $white;
            box-shadow: 0px 72px 80px -48px #223A28;
            width: 81em;
            max-width: 100%;
            padding: 3em;
        }
    }

    .pockemon{
        max-width: 20em;
        margin-top: 2em;
        &__img{
            @include imgCover(70%);
            margin-bottom: 1em;
        }
    }

    @media screen and (max-width: 992px) {
        .home {
            padding: 0;
            &__inner {
                min-height: 100vh;
                width: 100%;
                border-radius: 0;
                padding: 2em 1em;
            }
        }
    }
</style>

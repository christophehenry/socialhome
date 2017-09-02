<template>
    <div>
        <b-button
            class="card card-block text-center nsfw-shield"
            @click.stop.prevent="toggleNsfwShield"
            href="#"
            variant="link"
        >
            {{ nsfwBtnText }}
        </b-button>
        <slot v-if="showNsfwContent" />
    </div>
</template>

<script>
import Vue from "vue"


export default Vue.component("nsfw-shield", {
    data() {
        return {
            showNsfwContent: false,
        }
    },
    computed: {
        nsfwBtnText() {
            return this.showNsfwContent ? gettext("Hide NSFW content") : gettext("Show NSFW content")
        },
    },
    methods: {
        toggleNsfwShield() {
            this.showNsfwContent = !this.showNsfwContent
        },
    },
    updated() {
        Vue.redrawVueMasonry()
    },
})

</script>


import {streamStoreOperations} from "frontend/stores/streamStore"

const loadStreamMixin = {
    methods: {
        loadStream() {
            const options = {params: {}}
            const lastContentId = this.$store.state.contentIds[this.$store.state.contentIds.length - 1]
            if (lastContentId && this.$store.state.contents[lastContentId]) {
                options.params.lastId = this.$store.state.contents[lastContentId].through
            }

            switch (this.$store.state.stream.name) {
                case "followed":
                    this.$store.dispatch(streamStoreOperations.getFollowedStream, options)
                    break
                case "public":
                    this.$store.dispatch(streamStoreOperations.getPublicStream, options)
                    break
                case "tag":
                    options.params.name = this.tag
                    this.$store.dispatch(streamStoreOperations.getTagStream, options)
                    break
                case "profile_all":
                    // TODO: Replace this with guid property when API has evolved to support guid
                    options.params.id = this.$store.state.applicationStore.profile.id
                    this.$store.dispatch(streamStoreOperations.getProfileAll, options)
                    break
                case "profile_pinned":
                    // TODO: Replace this with guid property when API has evolved to support guid
                    options.params.id = this.$store.state.applicationStore.profile.id
                    this.$store.dispatch(streamStoreOperations.getProfilePinned, options)
                    break
                default:
                    break
            }
        },
    },
}

export default loadStreamMixin
export {loadStreamMixin}

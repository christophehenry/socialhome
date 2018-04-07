import {mount} from "avoriaz"

import loadStreamMixin from "frontend/mixins/loadStreamMixin"

import {streamStoreOperations} from "frontend/stores/streamStore"
import {getStore} from "frontend/tests/fixtures/store.fixtures"


describe("loadStreamMixin", () => {
    let store
    let prototype

    describe("methods", () => {
        describe("loadStream", () => {
            beforeEach(() => {
                store = getStore()
                prototype = {
                    mixins: [loadStreamMixin],
                    template: "<div></div>",
                    props: {
                        contentId: {type: String, default: ""},
                        guid: {type: String, default: ""},
                        user: {type: String, default: ""},
                        tag: {type: String, default: ""},
                    },
                }
                Sinon.spy(store, "dispatch")
            })

            context("store.dispatch without contents", () => {
                beforeEach(() => {
                    store.state.contentIds = []
                    store.state.applicationStore = {profile: {id: 5}}
                })

                it("followed stream with no contents", () => {
                    store.state.stream = {name: "followed"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getFollowedStream, {params: {}, data: {}}])
                })

                it("public stream with no contents", () => {
                    store.state.stream = {name: "public"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getPublicStream, {params: {}, data: {}}])
                })

                it("tag stream with no contents", () => {
                    store.state.stream = {name: "tag"}
                    const target = mount(prototype, {store, propsData: {tag: "eggs"}})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getTagStream, {params: {name: "eggs"}, data: {}}])
                })

                it("profile all stream with no contents", () => {
                    store.state.stream = {name: "profile_all"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getProfileAll, {params: {id: 5}, data: {}}])
                })

                it("profile pinned stream with no contents", () => {
                    store.state.stream = {name: "profile_pinned"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getProfilePinned, {params: {id: 5}, data: {}}])
                })

            })

            context("store.dispatch with contents", () => {
                beforeEach(() => {
                    store.state.contentIds = ["1", "2"]
                    store.state.contents = {1: {through: "3"}, 2: {through: "4"}}
                    store.state.applicationStore = {profile: {id: 5}}
                })

                it("followed stream with contents", () => {
                    store.state.stream = {name: "followed"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getFollowedStream, {params: {lastId: "4"}, data: {}}])
                })

                it("public stream with contents", () => {
                    store.state.stream = {name: "public"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getPublicStream, {params: {lastId: "4"}, data: {}}])
                })

                it("tag stream with contents", () => {
                    store.state.stream = {name: "tag"}
                    const target = mount(prototype,
                        {store, propsData: {tag: "eggs"}})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getTagStream, {params: {name: "eggs", lastId: "4"}, data: {}}])
                })

                it("profile all stream with contents", () => {
                    store.state.stream = {name: "profile_all"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getProfileAll, {params: {id: 5, lastId: "4"}, data: {}}])
                })

                it("profile pinned stream with contents", () => {
                    store.state.stream = {name: "profile_pinned"}
                    const target = mount(prototype, {store})
                    target.instance().loadStream()
                    store.dispatch.getCall(0).args.should
                        .eql([streamStoreOperations.getProfilePinned, {params: {id: 5, lastId: "4"}, data: {}}])
                })
            })
        })
    })
})

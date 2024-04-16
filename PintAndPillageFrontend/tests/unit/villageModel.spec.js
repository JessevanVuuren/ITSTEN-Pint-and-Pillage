import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import VillageModal from "@/components/ui/modals/VillageModal.vue";
import CombatModal from "@/components/ui/modals/CombatModal.vue";
import ScoutModal from "@/components/ui/modals/ScoutModal.vue";
import village from "@/views/Village.vue";

let villageModalWrapper;
let store;
let getters;
let localVue;
let properties;


beforeAll(() => {
    localVue = createLocalVue()
    localVue.component('CombatModal', CombatModal)
    localVue.component('ScoutModal', ScoutModal)
    localVue.use(Vuex)
})

beforeEach(() => {
    properties = {
        name: "SuperVillage",
        villageOwnerName: "Derp",
        points: 1000,
        userId: 1
    }

    getters = {
        village: () => {
            return require("./mockData/village.json")[0]
        },
    }

    store = new Vuex.Store({
        getters,
    })

    villageModalWrapper = shallowMount(VillageModal, {
        propsData: {properties:properties},
        store,
        localVue,
    });
});

afterAll(() => {
    villageModalWrapper.destroy()
})

describe('VillageModel', () => {
    it ("should display village data when opened in world map", async () => {
        //Arrage
        const expectedName = "SuperVillage";
        const expectedPlayer = "Player: Derp";
        const expectedPoints = "Points: 1000";

        //Act & Assert
        expect(villageModalWrapper.find("#villageFrameName").text()).toBe(expectedName);
        expect(villageModalWrapper.find("#villageFramePlayer").text()).toBe(expectedPlayer);
        expect(villageModalWrapper.find("#villageFramePoints").text()).toBe(expectedPoints);
    })

    it ("should be unable to pillage village when your the owner", async () => {
        //Arrange
        properties.userId = 18
        const expectedOutput = false;

        //Act
        // return false means userID = villageID
        const boolean = villageModalWrapper.vm.checkForOwnVillage()

        //Assert
        expect(boolean).toBe(expectedOutput);
    })
});
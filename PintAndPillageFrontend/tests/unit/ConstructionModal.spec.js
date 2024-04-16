import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";

import ConstructionModal from "../../src/components/ui/modals/ConstructingModal"
import BuildingListItem from "@/components/ui/BuildingListItem.vue";

let constructionModalWrapper;
let store;
let getters;
let localVue;

beforeAll(() => {
    localVue = createLocalVue()
    localVue.component('BuildingListItem', BuildingListItem)
    localVue.use(Vuex)
})

beforeEach(() => {
    getters = {
        village: () => {
            return require("./mockData/village.json")[0]
        },
    }

    store = new Vuex.Store({
        getters,
    })

    constructionModalWrapper = shallowMount(ConstructionModal, {
        store,
        localVue,
    });
});

afterAll(() => {
    constructionModalWrapper.destroy()
})

describe('ConstructionModal', () => {
    it ("should display can be build buildings correctly when opened", async () => {
        //Arrange
        const expectedNumChildren = 9;

        //Act
        const buildingList = constructionModalWrapper.findAll("#buildingListItem");
        const actualNumChild = buildingList.length;

        //Assert
        expect(actualNumChild).toBe(expectedNumChildren);
    })
});
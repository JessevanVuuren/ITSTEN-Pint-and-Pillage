import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import ResourcesModal from "../../src/components/ui/modals/ResourcesModal";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";



let resourceModalWrapper;
let store;
let getters;
let localVue;

beforeAll(() => {
    localVue = createLocalVue()
    localVue.component('LevelUpBuilding', LevelUpBuilding)
    localVue.use(Vuex)
})

beforeEach(() => {
    getters = {
        building: () => () => {
                return require("./mockData/test_building_data.json")
            }
    }

    store = new Vuex.Store({
        getters
    })

    resourceModalWrapper = shallowMount(ResourcesModal, {

        store,
        localVue,
    });
});

afterAll(() => {
    resourceModalWrapper.destroy()
})

describe('ResourcesModal', () => {
    it('should displays buildingName correctly when created', async () => {
        //Arrange
        const expectedText = "Mine - Lv 0"

        //Act
        const actualText = resourceModalWrapper.find("#buildingName").text() //html

        //Assert
        expect(actualText).toBe(expectedText)
    });

    it('should displays resources per hour correctly when displayed to screen', async () => {
        //Arrange
        const expectedText = "1000000 Stone / Hour"

        //Act
        const actualText = resourceModalWrapper.find("#buildingDescription").text()

        //Assert
        expect(actualText).toBe(expectedText)
    });
});
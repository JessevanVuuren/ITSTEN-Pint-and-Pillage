import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import LevelUpBuilding from "../../src/components/ui/LevelUpBuilding";
import TimeFrame from "../../src/components/ui/TimeFrame";
import PopulationFrame from "../../src/components/ui/PopulationFrame";
import ResourceItem from "../../src/components/ui/ResourceItem.vue";

let resourceModalWrapper;
let store;
let getters;
let state;
let localVue;

beforeAll(() => {
    localVue = createLocalVue()
    localVue.component('TimeFrame', TimeFrame)
    localVue.component('PopulationFrame', PopulationFrame)
    localVue.component('ResourceItem', ResourceItem)
    localVue.use(Vuex)
})

beforeEach(() => {
    state = {
        village: {
            data: {
                villageResources: {
                    "Wood": 10000,
                    "Hop": 5,
                    "Stone": 10000,
                    "Beer": 10000
                }
            }
        }
    }

    getters = {
        building: () => () => {
            return require("./mockData/building_can_be_updated.json")
        }
    }

    store = new Vuex.Store({
        getters,
        state
    })

    resourceModalWrapper = shallowMount(LevelUpBuilding, {
        store,
        localVue,
    });

    resourceModalWrapper.setData({
        checkAvailability: true
    })
});

afterAll(() => {
    resourceModalWrapper.destroy()
})

describe('LevelUpBuilding', () => {
    it('should displays buildingName correctly when created', async () => {
        const can_be_updated_result = resourceModalWrapper.vm.canBeLeveledUp();

        expect(can_be_updated_result).toBe(true)
    });
});


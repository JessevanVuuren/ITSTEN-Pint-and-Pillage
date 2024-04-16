import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import WorldMap from "@/components/WorldMap.vue";
import {dragscroll} from "vue-dragscroll";


let WorldMapWrapper;
let store;
let getters;
let localVue;

beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.directive("dragscroll", dragscroll)
})

beforeEach(() => {
    getters = {
        village: () => {
            return require("./mockData/village.json")[0]
        },
        villageList: () => {
            return require("./mockData/village.json")
        },
        SettleableSpots: () => {
            return require("./mockData/settlespots.json")["validPositions"]
        },
        showSettleTiles: () => {
            return true;
        }
    }

    store = new Vuex.Store({
        getters,
        actions: {
            getWorldmap: () =>  new Promise((resolve, reject) => {
                resolve({data: require("./mockData/world.json")})
            })
        }
    })

    WorldMapWrapper = shallowMount(WorldMap, {
        store,
        localVue,
    });
});

afterAll(() => {
    WorldMapWrapper.destroy()
})

describe('WorldMap', () => {
    it("should display villages when world map is opened", async () => {
        //Arrange
        const expectedOutput = 2;

        //Act
        const allVillages = WorldMapWrapper.findAll("#worldMapVillage")

        //Assert
        expect(allVillages.length).toBe(expectedOutput);
    })

    it("should display settable spots when world map is opened", async () => {
        //Arrange
        const expectedOutput = 6;

        //Act
        const allVillages = WorldMapWrapper.findAll(".SettleableTile")

        //Assert
        expect(allVillages.length).toBe(expectedOutput);
    })
});
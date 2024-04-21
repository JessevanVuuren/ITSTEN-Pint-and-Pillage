package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.entity.buildings.Building;
import nl.duckstudios.pintandpillage.entity.buildings.TradingPost;
import nl.duckstudios.pintandpillage.model.ResourceType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;

public class TradingPostTest {

    TradingPost tradingPost;

    @BeforeEach
    void TradingPost() {
        tradingPost = new TradingPost();
    }

    @Test
    void Should_beOfInstanceBuilding_when_Instantiated() {
        assertThat(tradingPost, instanceOf(Building.class));
    }

    @Test
    void Should_returnName_when_getName() {
        String expectedOutput = "TradingPost";
        assertThat(tradingPost.getName(), is(expectedOutput));
    }

    @Test
    void Should_haveRecourseCost_when_Instantiated() {
        int expectedWood = 100;
        int expectedStone = 40;

        int actualWood = tradingPost.getResourcesRequiredLevelUp().get(ResourceType.Wood.name());
        int actualStone = tradingPost.getResourcesRequiredLevelUp().get(ResourceType.Stone.name());

        assertThat(expectedStone, is(actualStone));
        assertThat(expectedWood, is(actualWood));
    }

    @Test
    void Should_increaseRecourseCost_when_LevelUp() {
        int expectedWood = 120;
        int expectedStone = 80;

        tradingPost.setLevel(1);
        tradingPost.updateBuilding();

        int actualWood = tradingPost.getResourcesRequiredLevelUp().get(ResourceType.Wood.name());
        int actualStone = tradingPost.getResourcesRequiredLevelUp().get(ResourceType.Stone.name());

        assertThat(expectedStone, is(actualStone));
        assertThat(expectedWood, is(actualWood));
    }

    @Test
    void Should_haveConstructionTime_when_Instantiated() {
        long expectedOutput = 50;

        long actualOutput = tradingPost.getConstructionTimeSeconds();

        assertThat(expectedOutput, is(actualOutput));
    }

    @Test
    void Should_increaseConstructionTime_when_LevelUp() {
        long expectedOutput = 90;

        tradingPost.setLevel(1);
        tradingPost.updateBuilding();
        
        long actualOutput = tradingPost.getConstructionTimeSeconds();

        assertThat(expectedOutput, is(actualOutput));
    }
}

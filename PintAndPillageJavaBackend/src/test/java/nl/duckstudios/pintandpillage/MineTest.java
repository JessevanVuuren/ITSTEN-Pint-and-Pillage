package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.Exceptions.BuildingConditionsNotMetException;
import nl.duckstudios.pintandpillage.entity.Village;
import nl.duckstudios.pintandpillage.entity.buildings.Mine;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest

public class MineTest {
    @Test
    void Shoud_produceMoreRecources_when_upgradingAMine(){
        //Arrange
        Mine mine = new Mine();
        Village village = mock(Village.class);
        mine.setVillage(village);

        int level = 1;
        int expectedOutput = (int)(20 + 12 * Math.pow(level, 1.2));

        Map<String, Integer> villageResources = new HashMap<>();
        villageResources.put("Wood", 200);

        //Act
        when(village.getVillageResources()).thenReturn(villageResources);
        when(village.hasEnoughPopulation(anyInt())).thenReturn(true);

        mine.levelUp();
        mine.setLevelupFinishedTime(LocalDateTime.now().minusSeconds(1));
        mine.updateBuildingState();

        //Assert
        assertThat(mine.getResourcesPerHour(), is(expectedOutput));
    }

    @Test
    void Shoud_notBeAbleToLevelUp_when_NotEnoughResources(){
        //Arrange
        Mine mine = new Mine();
        Village village = mock(Village.class);
        mine.setVillage(village);

        Map<String, Integer> villageResources = new HashMap<>();
        villageResources.put("Wood", 2);

        //Act
        when(village.getVillageResources()).thenReturn(villageResources);


        assertThrows(BuildingConditionsNotMetException.class, () -> {
            mine.levelUp();
        });
    }

    @Test
    void Shoud_notBeAbleToLevelUp_when_NotEnoughPopulation(){
        //Arrange
        Mine mine = new Mine();
        Village village = mock(Village.class);
        mine.setVillage(village);

        Map<String, Integer> villageResources = new HashMap<>();
        villageResources.put("Wood", 200);

        //Act
        when(village.getVillageResources()).thenReturn(villageResources);
        when(village.hasEnoughPopulation(anyInt())).thenReturn(false);


        assertThrows(BuildingConditionsNotMetException.class, () -> {
            mine.levelUp();
        });
    }


    @Test
    void Should_inceaseCost_when_upgradingAMine() {
        // Arrange
        Mine mine = new Mine();
        int level = 1;
        int expectedCostIncrease = level * 25 + 25;

        // Act
        mine.setLevel(level);
        mine.updateBuilding();

        // Assert
        assertThat(expectedCostIncrease, is(mine.getResourcesRequiredLevelUp().get("Wood")));
    }

    @Test
    void Should_inceaseTimeToBuild_when_upgradingAMine() {
        // Arrange
        Mine mine = new Mine();
        int level = 1;
        long expectedCostTime = 12 + ((30 + (level - 1) * 2L) * (long) Math.pow(level, 1.6));

        // Act
        mine.setLevel(level);
        mine.updateBuilding();

        // Assert
        assertThat(expectedCostTime, is(mine.getConstructionTimeSeconds()));
    }
}

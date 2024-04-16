package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.entity.Coord;
import nl.duckstudios.pintandpillage.entity.Village;
import nl.duckstudios.pintandpillage.entity.VillageUnit;
import nl.duckstudios.pintandpillage.entity.buildings.*;
import nl.duckstudios.pintandpillage.model.BuildPosition;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.mock;

@SpringBootTest
public class VillageTest {

    @Test
    void Should_increaseWood_when_buildALumberyard() {
        //Arrage
        int expectedOutput = 20;
        Village village = new Village();
        Lumberyard lumberyard = new Lumberyard();

        //Act
        lumberyard.setLastCollected(LocalDateTime.now());
        village.createBuilding(lumberyard);

        //Assert
        assertThat(expectedOutput, is(village.getResourcesPerHour().get("Wood")));
    }

    @Test
    void Should_increaseStone_when_buildAMine(){
        //Arrange
        int expectedOutput = 20;
        Village village = new Village();
        Mine mine = new Mine();

        //Act
        mine.setLastCollected(LocalDateTime.now());
        village.createBuilding(mine);

        //Assert
        assertThat(expectedOutput, is(village.getResourcesPerHour().get("Stone")));
    }

    @Test
    void Should_increaseHop_when_buildAFarm() {
        //Arrange
        int expectedOutput = 20;
        Village village = new Village();
        Farm farm = new Farm();

        //Act
        farm.setLastCollected(LocalDateTime.now());
        village.createBuilding(farm);

        //Assert
        assertThat(expectedOutput, is(village.getResourcesPerHour().get("Hop")));
    }

    @Test
    void Should_increaseBeer_when_buildATavern() {
        //Arrange
        int expectedOutput = 10;
        Village village = new Village();
        Tavern tavern = new Tavern();

        //Act
        tavern.setLastCollected(LocalDateTime.now());
        village.createBuilding(tavern);

        //Assert
        assertThat(expectedOutput, is(village.getResourcesPerHour().get("Beer")));
    }

    @Test
    void Should_increaseStorage_when_buildAStorage() {
        //Arrange
        int exceptedOutput = 601;
        Storage storage = new Storage();
        Village village = new Village();

        //Act
        village.createBuilding(storage);

        //Assert
        assertThat(exceptedOutput, is(village.getResourceLimit()));
    }

    @Test
    void Shoud_increaseDefence_when_buildADefenceTower() {
        //Arrange
        int exceptedOutput = 100;
        Village village = new Village();
        DefenceTower defenceTower = new DefenceTower();

        //Act
        village.createBuilding(defenceTower);

        //Assert
        assertThat(exceptedOutput, is(village.getTotalDefence()));
    }


    @Test
    void Should_logAttach_when_fightWonOrLost() {
        //Arrange
        String expectedOutput = "Fight won!";
        Village village = new Village();

        //Act
        village.addToCombatLog(LocalDateTime.now(), expectedOutput);

        //Assert
        assertThat(expectedOutput, is(village.getCombatLog().get(0).getMessage()));
    }


    @Test
    void Should_onlyBuildHarbor_when_TileNextToWater() {
        Village village = new Village();
        Coord coord = new Coord(11,10);
        String buildingName = "Harbor";
        boolean validPlace;
        BuildPosition[] buildPositions = village.getValidBuildPositions();

        validPlace = false;
        for (BuildPosition buildPosition : buildPositions) {
            if (buildPosition.position.getX() == coord.getX() && buildPosition.position.getY() == coord.getY() && Objects.equals(buildPosition.allowedBuilding, buildingName)) {
                validPlace = true;
            }
        }

        assertThat(validPlace, is(true));
    }

    @Test
    void Should_onlyBuildWall_when_TileZeroZero() {
        Village village = new Village();
        Coord coord = new Coord(0,0);
        String buildingName = "Wall";
        boolean validPlace;
        BuildPosition[] buildPositions = village.getValidBuildPositions();

        validPlace = false;
        for (BuildPosition buildPosition : buildPositions) {
            if (buildPosition.position.getX() == coord.getX() && buildPosition.position.getY() == coord.getY() && Objects.equals(buildPosition.allowedBuilding, buildingName)) {
                validPlace = true;
            }
        }

        assertThat(validPlace, is(true));
    }
}

















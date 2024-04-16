package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.Exceptions.NoEmptyVillageSpotFoundException;
import nl.duckstudios.pintandpillage.entity.Coord;
import nl.duckstudios.pintandpillage.entity.Village;
import nl.duckstudios.pintandpillage.entity.WorldMap;
import nl.duckstudios.pintandpillage.model.Tile;
import nl.duckstudios.pintandpillage.model.TileType;
import nl.duckstudios.pintandpillage.model.WorldVillage;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.LinkedList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@SpringBootTest
public class WorldMapTest {

    @Test
    void Should_findEmpySpot_when_called() {
        //Arrange
        WorldMap worldMap = new WorldMap(123, 10, 10, 5);
        WorldVillage village = mock(WorldVillage.class);

        List<WorldVillage> villages = new LinkedList<>();
        villages.add(village);
        worldMap.setVillages(villages);

        village.position = new Coord(0, 0);

        //Act
        Coord emptySpot = worldMap.findEmptySpot();

        //Assert
        assertThat(emptySpot, is(notNullValue()));
    }

    @Test
    void Should_returnValidEmpySpot_when_callFindEmpySpot() {
        //Arrange
        WorldMap worldMap = new WorldMap(123, 10, 10, 5);
        WorldVillage village = mock(WorldVillage.class);

        List<WorldVillage> villages = new LinkedList<>();
        villages.add(village);
        worldMap.setVillages(villages);

        village.position = new Coord(0, 0);

        //Act
        Coord emptySpot = worldMap.findEmptySpot();

        //Assert
        assertThat(worldMap.isValidToBuildNewVillage(emptySpot), is(true));
    }

    @Test
    void Should_notBeValidVillageSpot_when_isWaterTile() {
        // Arrange
        WorldMap worldMap = new WorldMap(123, 10, 10, 5);
        Tile[][] tiles = worldMap.getWorldTiles();
        Tile waterTile = mock(Tile.class);

        for (int i = 0; i < tiles.length; i++) {
            for (int j = 0; j < tiles[i].length; j++) {
                if (tiles[i][j].tileType == TileType.Water) {
                    waterTile = tiles[i][j];
                }
            }
        }

        // Act & Assert
        assertThat(waterTile.tileType, is(TileType.Water));
        assertThat(worldMap.isValidToBuildNewVillage(new Coord(waterTile.x, waterTile.y)), is(false));

    }
}

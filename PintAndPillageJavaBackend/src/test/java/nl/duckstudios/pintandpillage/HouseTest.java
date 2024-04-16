package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.entity.buildings.House;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

@SpringBootTest
public class HouseTest {
    @Test
    void Should_increasePopulation_When_buildACity() {
        //Arrage
        int level = 1;
        int expectedOutput = 21;
        House house = new House();
        house.setLevel(level); // Set level directly on the spy

        // Act
        house.updateBuilding();

        //Assert
        assertThat(expectedOutput, is(house.getPopulationCapacity()));
    }
}

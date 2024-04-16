package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.entity.buildings.Barracks;
import nl.duckstudios.pintandpillage.model.UnitType;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

@SpringBootTest
public class BarracksTest {
    @Test
    void Should_changeBeerAndPeopleInVikings_when_buildABarrack(){
        //Arrange
        Barracks barracks = new Barracks();

        //Act

        //Assert
        assertThat(UnitType.Spear, is(barracks.getUnitsUnlockedAtLevel().get(0).unitType));
        assertThat(UnitType.Axe, is(barracks.getUnitsUnlockedAtLevel().get(1).unitType));
        assertThat(UnitType.Shield, is(barracks.getUnitsUnlockedAtLevel().get(2).unitType));
        assertThat(UnitType.Bow, is(barracks.getUnitsUnlockedAtLevel().get(3).unitType));
        assertThat(UnitType.Jarl, is(barracks.getUnitsUnlockedAtLevel().get(4).unitType));
    }

}

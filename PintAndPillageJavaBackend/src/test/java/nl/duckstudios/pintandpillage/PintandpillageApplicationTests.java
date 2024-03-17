package nl.duckstudios.pintandpillage;

import nl.duckstudios.pintandpillage.Exceptions.ProductionConditionsNotMetException;
import nl.duckstudios.pintandpillage.entity.buildings.Building;
import nl.duckstudios.pintandpillage.entity.buildings.ProductionBuilding;
import nl.duckstudios.pintandpillage.entity.production.Unit;
import nl.duckstudios.pintandpillage.helper.UnitFactory;
import nl.duckstudios.pintandpillage.model.UnitType;
import nl.duckstudios.pintandpillage.model.Unlock;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.channels.MulticastChannel;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
class PintandpillageApplicationTests {


	@Test()
	void Should_ProductionConditionsNotMetException_When_level_is_to_low() {
		// Arrange
		int spear_level = 4, current_level = 1;

		ProductionBuilding productionBuilding = mock(ProductionBuilding.class, CALLS_REAL_METHODS);
		UnitFactory unitFactory = new UnitFactory();
		Unit spear = unitFactory.getUnit("Spear");
		Unlock unlock = new Unlock(UnitType.Spear, spear_level);
		List<Unlock> unlockList = new ArrayList<>();
		unlockList.add(unlock);
		productionBuilding.setUnitsUnlockedAtLevel(unlockList);

		// Act
		when(productionBuilding.getlevel()).thenReturn(current_level);

		// Assert
		assertThrows(ProductionConditionsNotMetException.class, () -> {
			productionBuilding.produceUnit(spear, 1);
		});
	}
}

package nl.duckstudios.pintandpillage.entity.buildings;

import lombok.Getter;
import nl.duckstudios.pintandpillage.model.ResourceType;

import java.util.HashMap;

public class TradingPost extends Building{

    @Getter
    private String name = "TradingPost";

    public TradingPost() {
        updateBuilding();
    }

    @Override
    public void updateBuilding() {
        super.setConstructionTimeSeconds(super.getLevel() * 40L + 50);
        setRecoursesRequiredAtGivenLevel(super.getLevel());
    }

    private void setRecoursesRequiredAtGivenLevel(int level) {
        HashMap<String, Integer> recourses = new HashMap<>();
        recourses.put(ResourceType.Wood.name(), level * 20 + 100);
        recourses.put(ResourceType.Stone.name(), level * 40 + 40);
        super.setResourcesRequiredLevelUp(recourses);
    }

}

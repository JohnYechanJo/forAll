package project.forAll.domain.space;

import lombok.Getter;

@Getter
public enum PlaceKitchenFeat {

    Open("Open"),
    Face("Face"),
    Close("Close"),
    NotSpecified("Not Specified");

    private final String name;

    PlaceKitchenFeat(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static PlaceKitchenFeat parse(final String kitFeatStr) {
        for (final PlaceKitchenFeat kitchenFeat : values()) {
            if (kitchenFeat.getName().equals(kitFeatStr)) {
                return kitchenFeat;
            }
        }
        return NotSpecified;
    }
}

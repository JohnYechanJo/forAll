package project.forAll.domain.place;

import lombok.Getter;

@Getter
public enum KitchenFeat {

    Open("Open"),
    Face("Face"),
    Close("Close"),
    NotSpecified("Not Specified");

    private final String name;

    KitchenFeat(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static KitchenFeat parse(final String kitFeatStr) {
        for (final KitchenFeat kitchenFeat : values()) {
            if (kitchenFeat.getName().equals(kitFeatStr)) {
                return kitchenFeat;
            }
        }
        return NotSpecified;
    }
}

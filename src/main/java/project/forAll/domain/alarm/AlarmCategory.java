package project.forAll.domain.alarm;

import lombok.Getter;
import project.forAll.domain.board.Category;

@Getter
public enum AlarmCategory {

    CHEF("Chef"),
    SPACE("Space"),
    RESERVATION("Reservation"),
    CHAT("Chat"),
    NotSpecified("Not Specified");

    private final String name;

    AlarmCategory(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static AlarmCategory parse(final String categoryStr) {
        for (final AlarmCategory category : values()) {
            if (category.getName().equals(categoryStr)) {
                return category;
            }
        }
        return NotSpecified;
    }
}

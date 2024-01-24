package project.forAll.domain.chat;

import lombok.Getter;
import project.forAll.domain.space.BookingPayWay;

@Getter
public enum ChatRoomCategory {
    Reservation("Reservation"),
    Board("Board"),
    ServiceCenter("Service Center"),
    NotSpecified("Not Specified");

    private final String name;

    ChatRoomCategory(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static ChatRoomCategory parse(final String categoryStr) {
        for (final ChatRoomCategory category : values()) {
            if (category.getName().equals(categoryStr)) {
                return category;
            }
        }
        return NotSpecified;
    }
}

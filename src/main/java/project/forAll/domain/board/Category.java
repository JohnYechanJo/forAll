package project.forAll.domain.board;

import lombok.Getter;
import project.forAll.domain.space.BookingPayWay;
@Getter
public enum Category {

    Popup("Popup"),
    Chat("Chat"),
    Recipe("Recipe"),
    NotSpecified("Not Specified");

    private final String name;

    Category(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static Category parse(final String categoryStr) {
        for (final Category category : values()) {
            if (category.getName().equals(categoryStr)) {
                return category;
            }
        }
        return NotSpecified;
    }
}

package project.forAll.domain.space;

import lombok.Getter;

@Getter
public enum ReservationState {

    PENDING("Pending"),
    APPROVE("Approve"),
    READY("Ready"),
    FINISH("Finish"),
    NotSpecified("Not Specified");

    private final String name;

    ReservationState(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static ReservationState parse(final String stateStr) {
        for (final ReservationState state : values()) {
            if (state.getName().equals(stateStr)) {
                return state;
            }
        }
        return NotSpecified;
    }
}
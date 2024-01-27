// package가 space로 되어있는데 reservation이 맞지 않나요..?
// package project.forAll.domain.reservation;
package project.forAll.domain.space;

import lombok.Getter;

@Getter
public enum ReservationCancelState {

    // 대기중
    PENDING("Pending"),
    // 승인
    APPROVE("Approve"),
    // 거절
    REJECT("Reject"),
    NotSpecified("Not Specified");

    private final String name;

    ReservationCancelState(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static ReservationCancelState parse(final String stateStr) {
        for (final ReservationCancelState state : values()) {
            if (state.getName().equals(stateStr)) {
                return state;
            }
        }
        return NotSpecified;
    }
}
// package가 space로 되어있는데 reservation이 맞지 않나요..?
// package project.forAll.domain.reservation;
package project.forAll.domain.reservation;

import lombok.Getter;

@Getter
public enum ReservationState {

    // 대기중
    PENDING("Pending"),
    // 승인
    APPROVE("Approve"),
    // 거절
    REJECT("Reject"),
    // 취소
    CANCEL("Cancel"),
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
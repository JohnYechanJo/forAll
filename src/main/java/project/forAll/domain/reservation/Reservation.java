package project.forAll.domain.reservation;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.ReservationCancelState;
import project.forAll.domain.reservation.ReservationState;
import project.forAll.domain.space.Space;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Reservation extends BassDomain {
    @Id
    @GeneratedValue
    @Column(name = "reservation_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "space_id")
    private Space space;

    // 대관 날짜
    private String rentDay;
    // 트라이얼 날짜
    private String trialDay;
    // 셰프 수
    private int chefNum;
    // 예약 상태
    private ReservationState state = ReservationState.PENDING;
    // 예약 취소 상태 (사용자가 취소를 요청했을 때만 발동)
    private ReservationCancelState cancelState = ReservationCancelState.NotSpecified;
}

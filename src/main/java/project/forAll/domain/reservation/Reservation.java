package project.forAll.domain.reservation;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.ReservationState;
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

    private String rentDay; // 대관 날짜
    private String trialDay; // 트라이얼 날짜
    private int chefNum; // 셰프 수
    private ReservationState state = ReservationState.PENDING; // 예약 상태
}

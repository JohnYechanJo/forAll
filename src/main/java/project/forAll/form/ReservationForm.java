package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter @Setter
@NoArgsConstructor
public class ReservationForm {
    private Long id;
    private String member;
    private Long space;

    private String rentDay; // 대관 날짜
    private String trialDay; // 트라이얼 날짜
    private Integer chefNum; // 셰프 수

    private String address; // 주소
    private String name; // 이름
    private String state; // 상태
    private Integer rentStartHour; // 대관 시작 시간
    private Integer rentEndHour; // 대관 종료 시간
    private Integer priceSet; // 가격
}

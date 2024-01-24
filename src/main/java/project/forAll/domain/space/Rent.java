package project.forAll.domain.space;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.member.Member;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Rent {

    @Id @GeneratedValue
    @Column(name = "rent_id")
    private Long id;

    // 대관 가능일
    private String ableDate;
    // 이용가능시작시간
    private Integer ableStartTime;
    // 이용가능종료시간
    private Integer ableFinTime;
    // 주차 여부
    private String ableParking;
    // 엘리베이터 여부
    private Boolean haveElevator;
    // 테이블 수
    private Integer tableNum;
    // 좌석 수
    private Integer seatNum;
    // 가격 설정
    private Integer priceSet;
    // 트라이얼 가능 여부
    private Boolean ableTrial;
    // 재료 새벽배달 가능 여부
    private Boolean ableEarlyDeliver;
    // 워크인 가능 여부
    private Boolean ableWorkIn;
    // 미장 가능 여부
    private Boolean ableMiseen;
    // 미장 이용가능시작시간
    private Integer ableMiseenStartTime;
    // 미장 이용가능종료시간
    private Integer ableMiseenFinTime;
}

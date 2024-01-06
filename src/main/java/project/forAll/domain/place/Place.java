package project.forAll.domain.place;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Place extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "place_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 공간명
    private String name;
    // 공간 한줄소개
    private String spaceBrief;
    // 공간 소개
    private String spaceIntro;
    // 주방 특성
    private KitchenFeat kitchenFeat;
    // 주소
    private String address;
    // 위치정보
    private String addressBrief;
    // 웹사이트
    private String website;
    // 대표 이미지
    private Image mainImage;
}

package project.forAll.domain.space;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitImage;
import project.forAll.domain.space.image.MenuImage;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Place extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "place_id")
    // Place, Rent, Kitchen이 공통의 id 값을 갖고 있어야 할 것이다
    // 공간등록할 때 마지막 단계의 등록완료를 누르기 전에는 create만 해뒀다가 등록완료 누르는 순간 Place, Rent, Kitchen 동시에 save
    // 공통의 id 값을 가진다는 게 부족하다고 생각한다면 SpaceName(공간명 변수)을 Place, Rent, Kitchen 각각에 넣어
    // 공통의 id와 공통의 SpaceName까지 확인하는 방식으로 사용할 수도 있겠다 (이 경우 SpaceName이 중복되지 않도록 해야겠다)
    // 일단 Space 엔티티를 중간에 추가
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallImage_id")
    private HallImage hallImage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kitImage_id")
    private KitImage kitImage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MenuImage_id")
    private MenuImage menuImage;

    // 공간명
    private String name;
    // 공간 한줄소개
    private String spaceBrief;
    // 공간 소개
    private String spaceIntro;
    // 주방 특성
    private PlaceKitchenFeat kitchenFeat;
    // 주소
    private String address;
    // 위치정보
    private String addressBrief;
    // 웹사이트
    private String website;
    // 대표 이미지
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mainImage_id")
    private Image mainImage;
}

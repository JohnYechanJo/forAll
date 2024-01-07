package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.Image;
import project.forAll.domain.space.PlaceKitchenFeat;

@Getter @Setter
@NoArgsConstructor
public class PlaceForm {

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
    // image를 form으로 만들 수 있는지 정확히는 모르겠습니다...
    private Image mainImage;

    public PlaceForm(final String name, final String spaceBrief, final String spaceIntro, final String kitchenFeat,
                     final String address, final String addressBrief, final String website, final Image mainImage) {
        setName(name);
        setSpaceBrief(spaceBrief);
        setSpaceIntro(spaceIntro);
        setKitchenFeat(PlaceKitchenFeat.parse(kitchenFeat));
        setAddress(address);
        setAddressBrief(addressBrief);
        setWebsite(website);
        setMainImage(mainImage);
    }
}

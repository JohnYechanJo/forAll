package project.forAll.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Image;
import project.forAll.domain.space.Place;
import project.forAll.form.PlaceForm;
import project.forAll.form.SpaceForm;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class SpaceServiceTest {

    @Autowired SpaceService spaceService;
    @Autowired ImageService imageService;

    @Before
    public void setup(){
        spaceService.deleteAll();
    }

//    @Test
//    public void 공간등록() throws Exception {
//        // Given
//        PlaceForm pf = new PlaceForm("오스테리아 로에로", "이탈리아 전통 가정식을 제공하는 와인바",
//                "\"오스테리아 로에로\"는 이탈리아 전통 가정식을 제공하는 아름다운 와인바입니다. 이 공간은 고급스러운 분위기와 함께 " +
//                        "실내에서 편안하게 즐길 수 있는 와인 선택이 풍부한 곳입니다. 신선한 재료로 만든 다양한 이탈리아 요리와 " +
//                        "특별히 고른 와인 목록은 고객들에게 특별한 경험을 선사합니다. 로맨틱한 분위기 속에서 친구, 가족, 연인과 함께 " +
//                        "맛있는 음식과 훌륭한 와인을 즐기며 소중한 시간을 보낼 수 있는 공간입니다.", "Face",
//                "서울특별시 강남구 역삼동 123-45번지", "성수역 4번출구 도보 1분 거리", "forall@instagram.com",
//                "");
//        Place place = spaceService.createPlace(pf);
//
//        // When
//        Long placeId = spaceService.savePlace(place);
//
//        // Then
//        Place getPlace = spaceService.findPlaceById(placeId);
//
//        assertEquals("", "오스테리아 로에로", getPlace.getName());
//    }

    @Test
    public void 빈공간등록() throws Exception{
        // Given
        SpaceForm sf = new SpaceForm();

        // When
        spaceService.build(sf);

        // Then
        assertEquals(spaceService.count(), 1);
    }
}

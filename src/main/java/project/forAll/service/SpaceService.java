package project.forAll.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.space.Kitchen;
import project.forAll.domain.space.Place;
import project.forAll.domain.space.Rent;
import project.forAll.domain.space.Space;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitchenImage;
import project.forAll.domain.space.image.MenuImage;
import project.forAll.repository.SpaceRepository;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
// It imports HttpSecurityConfiguration
@EnableWebSecurity
public class SpaceService {

    private final SpaceRepository spaceRepository;

    /**
     * 공간등록
     */
    @Transactional
    public Long savePlace(Place place) {
        spaceRepository.savePlace(place);
        return place.getId();
    }
    @Transactional
    public Long saveHallImage(HallImage hallImage) {
        spaceRepository.saveHallImage(hallImage);
        return hallImage.getId();
    }
    @Transactional
    public Long saveKitchenImage(KitchenImage kitchenImage) {
        spaceRepository.saveKitchenImage(kitchenImage);
        return kitchenImage.getId();
    }
    @Transactional
    public Long saveMenuImage(MenuImage menuImage) {
        spaceRepository.saveMenuImage(menuImage);
        return menuImage.getId();
    }
    @Transactional
    public Long saveRent(Rent rent) {
        spaceRepository.saveRent(rent);
        return rent.getId();
    }
    @Transactional
    public Long saveKitchen(Kitchen kitchen) {
        spaceRepository.saveKitchen(kitchen);
        return kitchen.getId();
    }

    /**
     * 본인 공간검색
     */
    @Transactional
    public List<Space> findSpaces() {
        return spaceRepository.findSpaceAll();
    }

    /**
     * 공간정보 검색
     */
    @Transactional
    public Place findPlaceById(Long id) { return spaceRepository.findPlaceById(id); }
    @Transactional
    public HallImage findHallImageById(Long id) { return spaceRepository.findHallImageById(id); }
    @Transactional
    public KitchenImage findKitchenImageById(Long id) { return spaceRepository.findKitchenImageById(id); }
    @Transactional
    public MenuImage findMenuImageById(Long id) { return spaceRepository.findMenuImageById(id); }
    @Transactional
    public Rent findRentById(Long id) { return spaceRepository.findRentById(id); }
    @Transactional
    public Kitchen findKitchenById(Long id) { return spaceRepository.findKitchenById(id); }

//    @Transactional
//    public void deleteSpace(Long id) {
//        spaceRepository.deleteSpaceById(id);
//    }

    // createSpaceInfo 추가해야함
}

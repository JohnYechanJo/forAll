package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Kitchen;
import project.forAll.domain.space.Place;
import project.forAll.domain.space.Rent;
import project.forAll.domain.space.Space;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitchenImage;
import project.forAll.domain.space.image.MenuImage;
import project.forAll.repository.MemberRepository;
import project.forAll.repository.space.KitchenRepository;
import project.forAll.repository.space.PlaceRepository;
import project.forAll.repository.space.RentRepository;
import project.forAll.repository.space.SpaceRepository;
import project.forAll.repository.space.image.HallImageRepository;
import project.forAll.repository.space.image.KitchenImageRepository;
import project.forAll.repository.space.image.MenuImageRepository;

import java.util.Optional;

@Component
@Transactional(readOnly = true)
@EnableWebSecurity
public class SpaceService extends Service {

    @Autowired private SpaceRepository spaceRepository;
    @Autowired private PlaceRepository placeRepository;
    @Autowired private HallImageRepository hallImageRepository;
    @Autowired private KitchenImageRepository kitchenImageRepository;
    @Autowired private MenuImageRepository menuImageRepository;
    @Autowired private RentRepository rentRepository;
    @Autowired private KitchenRepository kitchenRepository;

    @Override protected JpaRepository getRepository() {
        return spaceRepository;
    }

    /**
     * saveSpaceInfo
     */
    @Transactional
    public Long savePlace(Place place) {
        placeRepository.save(place);
        return place.getId();
    }

    @Transactional
    public Long saveHallImage(HallImage hallImage) {
        hallImageRepository.save(hallImage);
        return hallImage.getId();
    }

    @Transactional
    public Long saveKitchenImage(KitchenImage kitchenImage) {
        kitchenImageRepository.save(kitchenImage);
        return kitchenImage.getId();
    }

    @Transactional
    public Long saveMenuImage(MenuImage menuImage) {
        menuImageRepository.save(menuImage);
        return menuImage.getId();
    }

    @Transactional
    public Long saveRent(Rent rent) {
        rentRepository.save(rent);
        return rent.getId();
    }

    @Transactional
    public Long saveKitchen(Kitchen kitchen) {
        kitchenRepository.save(kitchen);
        return kitchen.getId();
    }

    /**
     *
     */
    @Transactional
    public Place findPlaceById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        return findSpace.getPlace();
    }

    @Transactional
    public HallImage findHallImageById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        Place findPlace = findSpace.getPlace();
        // return findPlace.getHallImage();
    }
}

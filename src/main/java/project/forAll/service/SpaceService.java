package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.space.*;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitImage;
import project.forAll.domain.space.image.MenuImage;
import project.forAll.repository.space.*;
import project.forAll.repository.space.image.HallImageRepository;
import project.forAll.repository.space.image.KitImageRepository;
import project.forAll.repository.space.image.MenuImageRepository;

import java.util.Optional;

@Component
@Transactional(readOnly = true)
@EnableWebSecurity
public class SpaceService extends Service {

    @Autowired private SpaceRepository spaceRepository;
    @Autowired private PlaceRepository placeRepository;
    @Autowired private HallImageRepository hallImageRepository;
    @Autowired private KitImageRepository kitImageRepository;
    @Autowired private MenuImageRepository menuImageRepository;
    @Autowired private RentRepository rentRepository;
    @Autowired private KitchenRepository kitchenRepository;
    @Autowired private BookingRepository bookingRepository;

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
    public Long saveKitchenImage(KitImage kitImage) {
        kitImageRepository.save(kitImage);
        return kitImage.getId();
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

    @Transactional
    public Long saveBooking(Booking booking) {
        bookingRepository.save(booking);
        return booking.getId();
    }

    /**
     * findSpaceInfoById
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
        return findPlace.getHallImage();
    }

    @Transactional
    public KitImage findKitImageById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        Place findPlace = findSpace.getPlace();
        return findPlace.getKitImage();
    }

    @Transactional
    public MenuImage findMenuImageById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        Place findPlace = findSpace.getPlace();
        return findPlace.getMenuImage();
    }

    @Transactional
    public Rent findRentById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        return findSpace.getRent();
    }

    @Transactional
    public Kitchen findKitchenById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        return findSpace.getKitchen();
    }

    @Transactional
    public Booking findBookingById(Long id) {
        Space findSpace = spaceRepository.findById(id).orElseThrow();
        return findSpace.getBooking();
    }
}

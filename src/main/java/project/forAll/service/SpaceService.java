package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.*;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitImage;
import project.forAll.domain.space.image.MenuImage;
import project.forAll.form.SpaceForm;
import project.forAll.repository.ImageRepository;
import project.forAll.repository.space.*;
import project.forAll.repository.space.image.HallImageRepository;
import project.forAll.repository.space.image.KitImageRepository;
import project.forAll.repository.space.image.MenuImageRepository;

import java.util.ArrayList;
import java.util.List;
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
    @Autowired private ImageService imageService;
    @Autowired private MemberService memberService;

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

    @Transactional
    public Space build(SpaceForm sf){
        final Space space = new Space();

        Member member = memberService.findByLoginId(sf.getUserId());
        space.setMember(member);

        final Place place = new Place();
        place.setName(sf.getName());
        place.setSpaceBrief(sf.getSpaceBrief());
        place.setSpaceIntro(sf.getSpaceIntro());
        place.setKitchenFeat(PlaceKitchenFeat.parse(sf.getKitchenFeat()));
        place.setAddress(sf.getAddress());
        place.setAddressBrief(sf.getAddressBrief());
        place.setWebsite(sf.getWebsite());
        Image mainImage = imageService.findById(sf.getMainImage());
        place.setMainImage(mainImage);

        final HallImage hallImage = new HallImage();
        Image hallRight = imageService.findById(sf.getHallRight());
        Image hallLeft = imageService.findById(sf.getHallLeft());
        Image hallFront = imageService.findById(sf.getHallFront());
        Image hallBack = imageService.findById(sf.getHallBack());
        Image hallEntire = imageService.findById(sf.getHallEntire());
        List<Image> hallExtra = imageService.findListByIds(sf.getHallExtra());
        hallImage.setHallRight(hallRight);
        hallImage.setHallLeft(hallLeft);
        hallImage.setHallFront(hallFront);
        hallImage.setHallBack(hallBack);
        hallImage.setHallEntire(hallEntire);
        hallImage.setHallExtra(hallExtra);
        saveHallImage(hallImage);
        place.setHallImage(hallImage);

        final KitImage kitImage = new KitImage();
        Image kitRight = imageService.findById(sf.getKitRight());
        Image kitLeft = imageService.findById(sf.getKitLeft());
        Image kitFront = imageService.findById(sf.getKitFront());
        Image kitBack = imageService.findById(sf.getKitBack());
        Image kitEntire = imageService.findById(sf.getKitEntire());
        List<Image> kitExtra = imageService.findListByIds(sf.getKitExtra());
        kitImage.setKitRight(kitRight);
        kitImage.setKitLeft(kitLeft);
        kitImage.setKitFront(kitFront);
        kitImage.setKitBack(kitBack);
        kitImage.setKitEntire(kitEntire);
        kitImage.setKitExtra(kitExtra);
        saveKitchenImage(kitImage);
        place.setKitImage(kitImage);

        List<Image> menuImage = imageService.findListByIds(sf.getMenu());
        place.setMenuImage(menuImage);
        savePlace(place);
        space.setPlace(place);

        final Rent rent = new Rent();
        rent.setAbleDate(sf.getAbleDate());
        rent.setAbleStartTime(sf.getAbleStartHour());
        rent.setAbleFinTime(sf.getAbleFinHour());
        rent.setFloorNum(sf.getFloorNum());
        rent.setAbleParking(sf.getAbleParking());
        rent.setHaveElevator(sf.getHaveElevator());
        rent.setTableNum(sf.getTableNum());
        rent.setSeatNum(sf.getSeatNum());
        rent.setPriceSet(sf.getPriceSet());
        rent.setAbleTrial(sf.getAbleTrial());
        rent.setAbleEarlyDeliver(sf.getAbleEarlyDeliver());
        rent.setAbleWorkIn(sf.getAbleWorkIn());
        rent.setAbleDate(sf.getAbleDate());
        saveRent(rent);
        space.setRent(rent);

        final Kitchen kitchen = new Kitchen();
        kitchen.setFireholeNum(sf.getFireholeNum());
        kitchen.setEquip(sf.getEquip());
        kitchen.setEquipExtra(sf.getEquipExtra());
        List<Image> plateImage = imageService.findListByIds(sf.getPlateImage());
        kitchen.setPlateImage(plateImage);
        kitchen.setPlateNum(sf.getPlateNum());
        List<Image> cupImage = imageService.findListByIds(sf.getCupImage());
        kitchen.setCupImage(cupImage);
        kitchen.setCupNum(sf.getCupNum());
        List<Image> cutleryImage = imageService.findListByIds(sf.getCutleryImage());
        kitchen.setCutleryImage(cutleryImage);
        kitchen.setCutleryNum(sf.getCutleryNum());
        List<Image> vatImage = imageService.findListByIds(sf.getVatImage());
        kitchen.setVatImage(vatImage);
        kitchen.setVatNum(sf.getVatNum());
        saveKitchen(kitchen);
        space.setKitchen(kitchen);

        final Booking booking = new Booking();
        booking.setPayWay(BookingPayWay.parse(sf.getPayWay()));
        booking.setCompanyName(sf.getCompanyName());
        booking.setCeoName(sf.getCeoName());
        booking.setBizNum(sf.getBusinessNum());
        Image bizImage = imageService.findById(sf.getBusinessImage());
        booking.setBizImage(bizImage);
        booking.setBizAddr(sf.getBusinessAddress());
        booking.setPayEmail(sf.getPayEmail());
        booking.setPayPhoneNum(sf.getPayPhoneNum());
        saveBooking(booking);
        space.setBooking(booking);

        save(space);
        return space;
    }
}

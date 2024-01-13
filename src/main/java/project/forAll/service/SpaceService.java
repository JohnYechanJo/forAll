package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.*;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitImage;
import project.forAll.domain.space.image.MenuImage;
import project.forAll.form.SpaceForm;
import project.forAll.repository.space.*;
import project.forAll.repository.space.image.HallImageRepository;
import project.forAll.repository.space.image.KitImageRepository;
import project.forAll.repository.space.image.MenuImageRepository;

import java.util.List;

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
    public Space findByMember(Member member) {
        List<Space> spaces = spaceRepository.findByMember(member);
        if (spaces.isEmpty()) return null;
        return spaces.get(0);
    }

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
        Image mainImage = imageService.findByImageName(sf.getMainImage());
        place.setMainImage(mainImage);

        final HallImage hallImage = new HallImage();
        Image hallRight = imageService.findByImageName(sf.getHallRight());
        Image hallLeft = imageService.findByImageName(sf.getHallLeft());
        Image hallFront = imageService.findByImageName(sf.getHallFront());
        Image hallBack = imageService.findByImageName(sf.getHallBack());
        Image hallEntire = imageService.findByImageName(sf.getHallEntire());
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
        Image kitRight = imageService.findByImageName(sf.getKitRight());
        Image kitLeft = imageService.findByImageName(sf.getKitLeft());
        Image kitFront = imageService.findByImageName(sf.getKitFront());
        Image kitBack = imageService.findByImageName(sf.getKitBack());
        Image kitEntire = imageService.findByImageName(sf.getKitEntire());
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
        Image bizImage = imageService.findByImageName(sf.getBusinessImage());
        booking.setBizImage(bizImage);
        booking.setBizAddr(sf.getBusinessAddress());
        booking.setPayEmail(sf.getPayEmail());
        booking.setPayPhoneNum(sf.getPayPhoneNum());
        booking.setBankName(sf.getBankName());
        booking.setAccountNum(sf.getAccountNum());
        booking.setAccountHolder(sf.getAccountHolder());
        saveBooking(booking);
        space.setBooking(booking);
        space.setPublic(sf.getIsPublic());

        save(space);
        return space;
    }
    @Transactional
    public SpaceForm of(Space space){
        final SpaceForm sf = new SpaceForm();

        sf.setUserId(space.getMember().getLoginId());

        final Place place = space.getPlace();
        sf.setName(place.getName());
        sf.setSpaceBrief(place.getSpaceBrief());
        sf.setSpaceIntro(place.getSpaceIntro());
        sf.setKitchenFeat(place.getKitchenFeat().toString());
        sf.setAddress(place.getAddress());
        sf.setAddressBrief(place.getAddressBrief());
        sf.setWebsite(place.getWebsite());
        sf.setMainImage(imageService.getImageName(place.getMainImage()));

        final HallImage hallImage = place.getHallImage();
        sf.setHallRight(imageService.getImageName(hallImage.getHallRight()));
        sf.setHallLeft(imageService.getImageName(hallImage.getHallLeft()));
        sf.setHallFront(imageService.getImageName(hallImage.getHallFront()));
        sf.setHallBack(imageService.getImageName(hallImage.getHallBack()));
        sf.setHallEntire(imageService.getImageName(hallImage.getHallEntire()));
        sf.setHallExtra(imageService.getImagesNames(hallImage.getHallExtra()));

        final KitImage kitImage = place.getKitImage();
        sf.setKitRight(imageService.getImageName(kitImage.getKitRight()));
        sf.setKitLeft(imageService.getImageName(kitImage.getKitLeft()));
        sf.setKitFront(imageService.getImageName(kitImage.getKitFront()));
        sf.setKitBack(imageService.getImageName(kitImage.getKitBack()));
        sf.setKitEntire(imageService.getImageName(kitImage.getKitEntire()));
        sf.setKitExtra(imageService.getImagesNames(kitImage.getKitExtra()));

        sf.setMenu(imageService.getImagesNames(place.getMenuImage()));

        final Rent rent = space.getRent();
        sf.setAbleDate(rent.getAbleDate());
        sf.setAbleStartHour(rent.getAbleStartTime());
        sf.setAbleFinHour(rent.getAbleFinTime());
        sf.setFloorNum(rent.getFloorNum());
        sf.setAbleParking(rent.getAbleParking());
        sf.setHaveElevator(rent.getHaveElevator());
        sf.setTableNum(rent.getTableNum());
        sf.setSeatNum(rent.getSeatNum());
        sf.setPriceSet(rent.getPriceSet());
        sf.setAbleTrial(rent.getAbleTrial());
        sf.setAbleEarlyDeliver(rent.getAbleEarlyDeliver());
        sf.setAbleWorkIn(rent.getAbleWorkIn());
        sf.setAbleDrink(rent.getAbleDrink());

        final Kitchen kitchen = space.getKitchen();
        sf.setFireholeNum(kitchen.getFireholeNum());
        sf.setEquip(kitchen.getEquip());
        sf.setEquipExtra(kitchen.getEquipExtra());
        sf.setPlateImage(imageService.getImagesNames(kitchen.getPlateImage()));
        sf.setPlateNum(kitchen.getPlateNum());
        sf.setCupImage(imageService.getImagesNames(kitchen.getCupImage()));
        sf.setCupNum(kitchen.getCupNum());
        sf.setCutleryImage(imageService.getImagesNames(kitchen.getCutleryImage()));
        sf.setCutleryNum(kitchen.getCutleryNum());
        sf.setVatImage(imageService.getImagesNames(kitchen.getVatImage()));
        sf.setVatNum(kitchen.getVatNum());

        final Booking booking = space.getBooking();
        sf.setPayWay(booking.getPayWay().toString());
        sf.setCompanyName(booking.getCompanyName());
        sf.setCeoName(booking.getCeoName());
        sf.setBusinessNum(booking.getBizNum());
        sf.setBusinessImage(imageService.getImageName(booking.getBizImage()));
        sf.setBusinessAddress(booking.getBizAddr());
        sf.setPayEmail(booking.getPayEmail());
        sf.setPayPhoneNum(booking.getPayPhoneNum());
        sf.setBankName(booking.getBankName());
        sf.setAccountNum(booking.getAccountNum());
        sf.setAccountHolder(booking.getAccountHolder());

        sf.setIsPublic(space.isPublic());

        return sf;
    }
}

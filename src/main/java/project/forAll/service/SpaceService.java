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

    @Transactional
    public Space build(SpaceForm sf){
        final Space space = new Space();
        if(sf.getId() != null) space.setId(sf.getId());
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

        List<Image> hallImage = imageService.findListByIds(sf.getHallImage());
        place.setHallImage(hallImage);
        List<Image> kitImage = imageService.findListByIds(sf.getKitImage());
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
        rent.setAbleMiseen(sf.getAbleMiseen());
        rent.setAbleMiseenStartTime(sf.getAbleMiseenStartTime());
        rent.setAbleMiseenFinTime(sf.getAbleMiseenFinTime());
        saveRent(rent);
        space.setRent(rent);

        final Kitchen kitchen = new Kitchen();
        kitchen.setFireholeNum(sf.getFireholeNum());
        kitchen.setCapacity(sf.getCapacity());
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

        return space;
    }
    @Transactional
    public SpaceForm of(Space space){
        final SpaceForm sf = new SpaceForm();
        sf.setId(space.getId());
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

        sf.setHallImage(imageService.getImagesNames(place.getHallImage()));
        sf.setKitImage(imageService.getImagesNames(place.getKitImage()));
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
        sf.setAbleMiseen(rent.getAbleMiseen());
        sf.setAbleMiseenStartTime(rent.getAbleMiseenStartTime());
        sf.setAbleMiseenFinTime(rent.getAbleFinTime());

        final Kitchen kitchen = space.getKitchen();
        sf.setFireholeNum(kitchen.getFireholeNum());
        sf.setCapacity(kitchen.getCapacity());
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

    @Transactional
    public Space rebuild(SpaceForm sf){
        final Space space = (Space) findById(sf.getId());

        final Place place = space.getPlace();
        place.setName(sf.getName());
        place.setSpaceBrief(sf.getSpaceBrief());
        place.setSpaceIntro(sf.getSpaceIntro());
        place.setKitchenFeat(PlaceKitchenFeat.parse(sf.getKitchenFeat()));
        place.setAddress(sf.getAddress());
        place.setAddressBrief(sf.getAddressBrief());
        place.setWebsite(sf.getWebsite());
        Image mainImage = imageService.findByImageName(sf.getMainImage());
        place.setMainImage(mainImage);

        List<Image> hallImage = imageService.findListByIds(sf.getHallImage());
        place.setHallImage(hallImage);
        List<Image> kitImage = imageService.findListByIds(sf.getKitImage());
        place.setKitImage(kitImage);
        List<Image> menuImage = imageService.findListByIds(sf.getMenu());
        place.setMenuImage(menuImage);
        savePlace(place);
        space.setPlace(place);

        final Rent rent = space.getRent();
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
        rent.setAbleMiseen(sf.getAbleMiseen());
        rent.setAbleMiseenStartTime(sf.getAbleMiseenStartTime());
        rent.setAbleMiseenFinTime(sf.getAbleMiseenFinTime());
        saveRent(rent);
        space.setRent(rent);

        final Kitchen kitchen = space.getKitchen();
        kitchen.setFireholeNum(sf.getFireholeNum());
        kitchen.setCapacity(sf.getCapacity());
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

        final Booking booking = space.getBooking();
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

        return space;
    }
}

package project.forAll.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.forAll.domain.space.Kitchen;
import project.forAll.domain.space.Place;
import project.forAll.domain.space.Rent;
import project.forAll.domain.space.Space;
import project.forAll.domain.space.image.HallImage;
import project.forAll.domain.space.image.KitchenImage;
import project.forAll.domain.space.image.MenuImage;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SpaceRepository {

    private final EntityManager em;

    /**
     * saveSpaceInfo
     */
    public void savePlace(Place place) { em.persist(place); }
    public void saveHallImage(HallImage hallImage) { em.persist(hallImage); }
    public void saveKitchenImage(KitchenImage kitchenImage) { em.persist(kitchenImage); }
    public void saveMenuImage(MenuImage menuImage) { em.persist(menuImage); }
    public void saveRent(Rent rent) { em.persist(rent); }
    public void saveKitchen(Kitchen kitchen) { em.persist(kitchen); }

    /**
     * findSpaceInfoById
     */
    // public Space findSpaceById(Long id) { return em.find(Space.class, id); }
    public Place findPlaceById(Long id) { return em.find(Place.class, id); }
    public HallImage findHallImageById(Long id) { return em.find(HallImage.class, id); }
    public KitchenImage findKitchenImageById(Long id) { return em.find(KitchenImage.class, id); }
    public MenuImage findMenuImageById(Long id) { return em.find(MenuImage.class, id); }
    public Rent findRentById(Long id) { return em.find(Rent.class, id); }
    public Kitchen findKitchenById(Long id) { return em.find(Kitchen.class, id); }

    public List<Space> findSpaceAll() {
        return em.createQuery("select s from Space s " +
                        "join fetch s.member m", Space.class)
                .getResultList();
    }

    // deleteSpace 코드
}

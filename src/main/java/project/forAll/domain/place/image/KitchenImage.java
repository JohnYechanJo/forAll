package project.forAll.domain.place.image;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.place.Image;
import project.forAll.domain.place.Place;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class KitchenImage extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "kitchenImage_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    // 주방 우측면
    private Image kitRight;
    // 주방 좌측면
    private Image kitLeft;
    // 주방 정면
    private Image kitFront;
    // 주방 후면
    private Image kitBack;
    // 주방 전체샷
    private Image kitEntire;
    // 주방 추가사진
    private List<Image> kitExtra = new ArrayList<>();

//    public addImage(Image image) {
//        this.kitExtra.add(image);
//        image.set(this);
//    }
}

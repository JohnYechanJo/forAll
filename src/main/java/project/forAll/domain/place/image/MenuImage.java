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
public class MenuImage extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "menuImage_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    // 메뉴사진 1
    private Image menu1;
    // 메뉴사진 2
    private Image menu2;
    // 메뉴사진 3
    private Image menu3;
    // 메뉴사진 4
    private Image menu4;
    // 메뉴 추가사진
    private List<Image> menuExtra = new ArrayList<>();

//    public addImage(Image image) {
//        this.menuExtra.add(image);
//        image.set(this);
//    }
}

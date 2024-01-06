package project.forAll.domain.space.image;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;
import project.forAll.domain.space.Place;

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
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu1_id")
    private Image menu1;
    // 메뉴사진 2
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu2_id")
    private Image menu2;
    // 메뉴사진 3
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu3_id")
    private Image menu3;
    // 메뉴사진 4
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu4_id")
    private Image menu4;
    // 메뉴 추가사진
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "menuExtra_id")
    private List<Image> menuExtra = new ArrayList<>();

//    public addImage(Image image) {
//        this.menuExtra.add(image);
//        image.set(this);
//    }
}

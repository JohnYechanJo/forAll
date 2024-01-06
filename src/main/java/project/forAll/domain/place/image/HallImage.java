package project.forAll.domain.place.image;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;
import project.forAll.domain.place.Image;
import project.forAll.domain.place.Place;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class HallImage extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "hallImage_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    // 홀 우측면
    private Image hallRight;
    // 홀 좌측면
    private Image hallLeft;
    // 홀 정면
    private Image hallFront;
    // 홀 후면
    private Image hallBack;
    // 홀 전체샷
    private Image hallEntire;
    // 홀 추가사진
    private List<Image> hallExtra = new ArrayList<>();

//    public addImage(Image image) {
//        this.hallExtra.add(image);
//        image.set(this);
//    }
}

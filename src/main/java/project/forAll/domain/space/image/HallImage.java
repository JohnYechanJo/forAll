package project.forAll.domain.space.image;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class HallImage extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "hallImage_id")
    private Long id;

    // 홀 우측면
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallRight_id")
    private Image hallRight;
    // 홀 좌측면
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallLeft_id")
    private Image hallLeft;
    // 홀 정면
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallFront_id")
    private Image hallFront;
    // 홀 후면
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallBack_id")
    private Image hallBack;
    // 홀 전체샷
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallEntire_id")
    private Image hallEntire;
    // 홀 추가사진
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallExtra_id")
    private List<Image> hallExtra = new ArrayList<>();

//    public addImage(Image image) {
//        this.hallExtra.add(image);
//        image.set(this);
//    }
}

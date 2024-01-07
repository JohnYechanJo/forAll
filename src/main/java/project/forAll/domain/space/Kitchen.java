package project.forAll.domain.space;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class Kitchen extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "kitchen_id")
    private Long id;

    // 화구
    private Integer fireholeNum;
    // 주방기계
    private String equip;
    // 추가 사용가능 기계
    private String equipExtra;
    // 앞접시 이미지
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "plateImage_id")
    private List<Image> plateImage;
}

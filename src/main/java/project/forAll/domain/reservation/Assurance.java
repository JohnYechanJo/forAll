package project.forAll.domain.reservation;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class Assurance extends BassDomain {
    @Id
    @GeneratedValue
    @Column(name = "assurance_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    // 대관 준비 주방 이미지
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "assurance_ready_kitImage_id")
    private List<Image> readyKitImage;
    // 대관 준비 홀 이미지
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "assurance_ready_hallImage_id")
    private List<Image> readyHallImage;
    // 대관 준비 기타 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image readyAdditionalImage;

    private String readyRecord; // 대관 진행 중 기록

    // 대관 마무리 주방 이미지
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "assurance_fin_kitImage_id")
    private List<Image> finKitImage;
    // 대관 마무리 홀 이미지
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "assurance_fin_hallImage_id")
    private List<Image> finHallImage;
    // 대관 마무리 기타 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image finAdditionalImage;

    private String finRecord; // 대관 진행 중 기록


}

package project.forAll.domain.space;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "spaces")
@Getter @Setter
public class Space extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "space_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rent_id")
    private Rent rent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kitchen_id")
    private Kitchen kitchen;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private String closeGuide;
    // 마감 사진들
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "closeImage_id")
    private List<Image> closeImage = new ArrayList<>();

    // 공간 펜딩 여부
    private SpacePending spacePending;
}

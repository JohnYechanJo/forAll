package project.forAll.domain.place;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.member.Member;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Rent {

    @Id @GeneratedValue
    @Column(name = "place_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}

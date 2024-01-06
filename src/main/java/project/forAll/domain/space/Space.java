package project.forAll.domain.space;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.member.Member;

import javax.persistence.*;

@Entity
@Table(name = "spaces")
@Getter @Setter
public class Space {

    @Id @GeneratedValue
    @Column(name = "space_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}

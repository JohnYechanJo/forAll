package project.forAll.domain.member;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class ChefProfile extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "chefProfile_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    // 경력
    @ElementCollection
    private List<String> career;
    // 보건증 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image certificatePhoto;
    // 은행명
    private String accountBank;
    // 계좌번호
    private String accountNum;
    // 예금주
    private String accountHolder;
}

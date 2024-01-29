package project.forAll.domain.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;
import project.forAll.util.StringListConverter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Profile extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "profile_id")
    private Long id;

    //사용자
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 한 줄 소개
    private String introduction;

    // 헷갈림 방지로 picture에서 profilePhoto로 변수명 변경
    // 프로필 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image profilePhoto;

    // 세부 소개
    private String detailIntroduction;

    // MBTI
    private String mbti;
    // 요리
    @ElementCollection
    private List<String> cook;

    // 요리재료
    @ElementCollection
    private List<String> cookItem;

}

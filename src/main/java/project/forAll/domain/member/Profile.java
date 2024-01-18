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
    // 세부 소개
    private String detailIntroduction;
    // 경력
    @ElementCollection
    private List<String> career;
    // 프로필 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image picture;
    // 프로필 사진 설명
    private String pictureExplain;
    // MBTi
    private String mbti;
    // 요리
    @ElementCollection
    private List<String> cook;
    // 관심사
    @ElementCollection
    private List<String> interest;
    // 보건증 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image certificate;
}

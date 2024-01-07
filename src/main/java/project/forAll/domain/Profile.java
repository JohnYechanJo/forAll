package project.forAll.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Member;
import project.forAll.util.StringListConverter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Profile {

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
    // 관심사
    @ElementCollection
    private List<String> interest;
}

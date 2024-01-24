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
<<<<<<< HEAD
    // 헷갈림 방지로 picture에서 profilePhoto로 변수명 변경
    // 프로필 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image profilePhoto;
=======
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
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
    // MBTI
    private String mbti;
    // 요리
    @ElementCollection
    private List<String> cook;
<<<<<<< HEAD
    // 요리재료
    @ElementCollection
    private List<String> cookItem;
=======
    // 관심사
    @ElementCollection
    private List<String> interest;
    // 보건증 사진
    @OneToOne(fetch = FetchType.LAZY)
    private Image certificate;
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
}

package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class ProfileForm {

    //사용자
    private String userId;
    // 한 줄 소개
    private String introduction;
    // 세부 소개
    private String detailIntroduction;
    // 경력
    private List<String> career;
    // 프로필 사진
    private String picture;
    //프로필 사진 설명
    private String pictureExplain;
    //MBIT
    private String mbti;
    // 요리
    private List<String> cook;
    // 관심사
    private List<String> interest;

}

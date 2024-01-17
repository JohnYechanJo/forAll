package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.Profile;

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
    // 보건증 사진
    private String certificate;

    public static ProfileForm of(Profile profile){
        final ProfileForm pf = new ProfileForm();
        pf.setUserId(profile.getMember().getLoginId());
        pf.setIntroduction(profile.getIntroduction());
        pf.setDetailIntroduction(profile.getDetailIntroduction());
        pf.setCareer(profile.getCareer());
        pf.setPicture(profile.getPicture() == null? null : profile.getPicture().getImageName());
        pf.setPictureExplain(profile.getPictureExplain());
        pf.setMbti(profile.getMbti());
        pf.setCook(profile.getCook());
        pf.setInterest(profile.getInterest());
        pf.setCertificate(profile.getCertificate() == null? null : profile.getCertificate().getImageName());

        return pf;
    }

}

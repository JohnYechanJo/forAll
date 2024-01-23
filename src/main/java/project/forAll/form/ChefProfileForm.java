package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.ChefProfile;
import project.forAll.domain.member.Profile;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class ChefProfileForm {

    private Long id;
    // 경력
    private List<String> career;
    // 보건증 사진
    private String certificatePhoto;
    // 은행명
    private String accountBank;
    // 계좌번호
    private String accountNum;
    // 예금주
    private String accountHolder;

    public static ChefProfileForm cf(ChefProfile chefProfile){
        final ChefProfileForm cf = new ChefProfileForm();
        // cf.setId(chefProfile.getId());
        cf.setCareer(chefProfile.getCareer());
        cf.setCertificatePhoto(chefProfile.getCertificatePhoto() == null? null : chefProfile.getCertificatePhoto().getImageName());
        cf.setAccountBank(chefProfile.getAccountBank());
        cf.setAccountNum(chefProfile.getAccountNum());
        cf.setAccountHolder(chefProfile.getAccountHolder());

        return cf;
    }
}
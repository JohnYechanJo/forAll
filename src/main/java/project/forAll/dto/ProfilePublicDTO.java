package project.forAll.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ProfilePublicDTO {
    // 고유 id
    private Long id;
    // 한 줄 소개
    private String introduction;
    // 프로필 사진
    private String profilePhoto;
    // MBTI
    private String mbti;
    // 요리
    private List<String> cook;
    // 요리재료
    private List<String> cookItem;
    // 경력
    private List<String> career;
}

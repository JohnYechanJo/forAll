package project.forAll.domain.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.BassDomain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor
public class KakaoMember extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "kakaoMember_id")
    private Long id;

    // 현재 받아올 수 있는 정보가 profile_nickname과 profile_image 밖에 없음
    // String nickname;

    @Builder
    public KakaoMember(Long id, String nickname) {
        this.id = id;
        // this.nickname = nickname;
    }
}

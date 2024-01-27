package project.forAll.domain.member;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.board.Article;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Member extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinColumn(name = "article_id")
//    private Article article;

    // ADMIN 계정 구분
    private IsAdmin isAdmin;
    // 로그인 ID
    private String loginId;
    // 로그인 PW
    private String loginPw;
    // 이름
    private String name;
    // 이메일
    private String email;
    // 전화번호
    // @Pattern(regexp = "^\\d{10,11}$", message = "Phone number should be 10 or 11 digits")
    private String phoneNum;
    // 생년월일
    // @Pattern(regexp = "^\\d{8}$", message = "Birthday should be 8 digits")
    private String birthday;
    // 성별
    private Gender gender;


    // 셰프 펜딩 여부
    private ChefPending chefPending = ChefPending.NOTCREATED;

}

package project.forAll.domain.board;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;
import project.forAll.domain.member.Member;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Article extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "article_id")
    private Long id;

    // 제목
    private String title;
    // 내용
    @Column(length = 1000)
    private String content;
    // 생성일시 (수정일시)
    private String writtenAt;
    // 카테고리
    private Category category;
    // 생성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "written_by_member_id")
    private Member writtenBy;

    // 첨부사진들
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "postImage_id")
    private List<Image> postImage = new ArrayList<>();

    @ElementCollection
    private List<Long> recommend;
    @NotNull
    //삭제 여부
    private boolean deleted = false;

}

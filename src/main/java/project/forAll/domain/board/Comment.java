package project.forAll.domain.board;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.board.Article;
import project.forAll.domain.member.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Comment extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    // 내용
    private String text;
    // 생성일시 (수정일시)
    private LocalDateTime writtenAt;
//    // 수정일시
//    private LocalDateTime modifiedAt;
    // 생성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "written_by_member_id")
    private Member writtenBy;
}

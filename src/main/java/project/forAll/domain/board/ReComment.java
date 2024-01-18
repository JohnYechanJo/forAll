package project.forAll.domain.board;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;

import javax.persistence.*;
@Entity
@Getter @Setter
public class ReComment extends BassDomain {
    @Id
    @GeneratedValue
    @Column(name = "recomment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    // 내용
    private String text;
    // 생성일시 (수정일시)
    private String writtenAt;
    // 생성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "written_by_member_id")
    private Member writtenBy;
}

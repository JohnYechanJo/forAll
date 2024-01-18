package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Member;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class CommentForm {

    private Long id;
    // 글 아이디
    private Long articleId;
    // 내용
    private String text;
    // 생성일시 (수정일시)
    private String writtenAt;
    // 생성자
    private String userId;

    //대댓글
    private List<ReCommentForm> recomments;
}

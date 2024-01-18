package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class ReCommentForm {
    private Long id;
    // 댓글 아이디
    private Long commentId;
    // 내용
    private String text;
    // 생성일시 (수정일시)
    private String writtenAt;
    // 생성자
    private String userId;
}

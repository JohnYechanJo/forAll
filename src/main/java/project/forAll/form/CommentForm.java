package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Member;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
public class CommentForm {

    // 내용
    private String text;
//    // 생성일시 (수정일시)
//    private LocalDateTime writtenAt;
    // 생성자
    private Member member;

    public CommentForm(final String text, final Member member) {
        setText(text);
//        setWrittenAt(writtenAt);
        setMember(member);
    }
}

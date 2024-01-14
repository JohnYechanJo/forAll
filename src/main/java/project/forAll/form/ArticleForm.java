package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Member;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
public class ArticleForm {

    // 제목
    private String title;
    // 내용
    private String content;
    // 생성일시 (수정일시)
    // private LocalDateTime writtenAt;
//    // 수정일시
//    private LocalDateTime modifiedAt;
    // 생성자
    private Member member;

    public ArticleForm(final String title, final String content, final Member member) {
        setTitle(title);
        setContent(content);
//        setWrittenAt(writtenAt);
        setMember(member);
    }
}
package project.forAll.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Comment;
import project.forAll.domain.board.ReComment;
import project.forAll.domain.member.Member;

import java.util.List;

public interface ReCommentRepository extends JpaRepository<ReComment, Long> {
    List<ReComment> findByComment(Comment comment);
    List<ReComment> findByWrittenBy(Member member);
}

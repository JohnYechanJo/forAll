package project.forAll.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Comment;
import project.forAll.domain.member.Member;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticle(Article article);
    List<Comment> findByWrittenBy(Member member);
}

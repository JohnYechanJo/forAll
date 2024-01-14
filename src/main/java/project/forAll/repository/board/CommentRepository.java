package project.forAll.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}

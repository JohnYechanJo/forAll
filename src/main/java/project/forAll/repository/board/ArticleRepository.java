package project.forAll.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.board.Article;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}

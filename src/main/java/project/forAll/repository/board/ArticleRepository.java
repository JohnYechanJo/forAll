package project.forAll.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Category;
import project.forAll.domain.member.Member;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByWrittenBy(Member member);
    List<Article> findByCategory(Category category);
}

package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.board.Article;
import project.forAll.domain.member.Member;
import project.forAll.form.ArticleForm;
import project.forAll.repository.board.ArticleRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Transactional(readOnly = true)
public class ArticleService extends Service {

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    protected JpaRepository getRepository() {
        return articleRepository;
    }

    @Transactional
    public Long saveArticle(Article article) {
        articleRepository.save(article);
        return article.getId();
    }

//    public List<Article> findAllArticles() {
//        return articleRepository.findAll();
//    }


    @Transactional
    public Optional<Article> findArticleById(Long id) { return articleRepository.findById(id); }


    /**
     * ArticleForm으로 article 생성
     * @param af
     * @return article
     */
    @Transactional
    public Article createArticle(final ArticleForm af) {
        final Article article = new Article();
        article.setTitle(af.getTitle());
        article.setContent(af.getContent());
        article.setWrittenAt(LocalDateTime.now());
        article.setWrittenBy(af.getMember());

        return article;

    }

    /**
     * Article 수정
     * @param id, title, content, createdAt, modifiedAt, member
     * @return article
     */
    @Transactional
    public Article updateArticle(Long id, String title, String content) {
        Article article = articleRepository.findById(id).orElseThrow();
        article.setTitle(title);
        article.setContent(content);
        article.setWrittenAt(LocalDateTime.now());
        articleRepository.flush();

        return article;
    }

    /**
     * Article 삭제
     * @param id
     */
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}

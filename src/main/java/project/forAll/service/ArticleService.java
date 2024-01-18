package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Category;
import project.forAll.domain.board.Comment;
import project.forAll.domain.member.Member;
import project.forAll.form.ArticleForm;
import project.forAll.form.CommentForm;
import project.forAll.repository.board.ArticleRepository;
import project.forAll.repository.board.CommentRepository;
import project.forAll.repository.board.ReCommentRepository;
import project.forAll.util.ZoneTime;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@Transactional(readOnly = true)
public class ArticleService extends Service {

    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private ImageService imageService;

    @Override
    protected JpaRepository getRepository() {
        return articleRepository;
    }

    @Transactional
    public Long saveArticle(Article article) {
        save(article);
        return article.getId();
    }


    @Transactional
    public Optional<Article> findArticleById(Long id) { return articleRepository.findById(id); }


    /**
     * ArticleForm으로 article 생성
     * @param af
     * @return article
     */
    @Transactional
    public Article build(final ArticleForm af) {
        final Article article = new Article();
        if (af.getId() != null) article.setId(af.getId());
        article.setTitle(af.getTitle());
        article.setContent(af.getContent());
        article.setWrittenAt(af.getWrittenAt());
        article.setCategory(Category.parse(af.getCategory()));
        article.setWrittenBy(memberService.findByLoginId(af.getUserId()));
        article.setPostImage(imageService.findListByIds(af.getPostImage()));

        return article;
    }

    @Transactional
    public ArticleForm of(final Article article){
        final ArticleForm form = new ArticleForm();
        form.setId(article.getId());
        form.setTitle(article.getTitle());
        form.setContent(article.getContent());
        form.setWrittenAt(article.getWrittenAt());
        form.setUserId(article.getWrittenBy().getLoginId());
        form.setCategory(article.getCategory().toString());
        form.setPostImage(imageService.getImagesNames(article.getPostImage()));
        final List<Comment> comments = commentService.findByArticle(article.getId());
        form.setComments(comments.stream().map(comment -> commentService.of(comment)).toList());

        return form;
    }

    /**
     * Article 삭제
     * @param id
     */
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    /**
     * 유저의 로그인 아이디가 주어졌을 때, 해당 유저의 모든 글을 불러옴
     * @param userId 로그인 아이디
     */
    @Transactional
    public List<Article> findByUserId(String userId){
        final Member member = memberService.findByLoginId(userId);
        return articleRepository.findByWrittenBy(member);
    }
    @Transactional
    public List<Article> findByCategory(String category){
        return articleRepository.findByCategory(Category.parse(category));
    }
}

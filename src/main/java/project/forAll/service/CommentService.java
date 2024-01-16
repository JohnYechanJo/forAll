package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Comment;
import project.forAll.domain.board.ReComment;
import project.forAll.domain.member.Member;
import project.forAll.form.CommentForm;
import project.forAll.repository.board.CommentRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@Transactional(readOnly = true)
public class CommentService extends Service {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private ReCommentService recommentService;

    @Override
    protected JpaRepository getRepository() {
        return commentRepository;
    }

    @Transactional
    public Long saveComment(Comment comment) {
        save(comment);
        return comment.getId();
    }

    @Transactional
    public Optional<Comment> findCommentById(Long id) { return commentRepository.findById(id); }


    /**
     * CommentForm으로 comment 생성
     * @param cf
     * @return comment
     */
    @Transactional
    public Comment build(final CommentForm cf) {
        final Comment comment = new Comment();
        if (cf.getId() != null) comment.setId(cf.getId());
        comment.setArticle((Article) articleService.findById(cf.getArticleId()));
        comment.setText(cf.getText());
        comment.setWrittenAt(cf.getWrittenAt());
        comment.setWrittenBy(memberService.findByLoginId(cf.getUserid()));

        return comment;
    }

    @Transactional
    public CommentForm of(final Comment comment){
        final CommentForm form = new CommentForm();
        form.setId(comment.getId());
        form.setArticleId(comment.getArticle().getId());
        form.setText(comment.getText());
        form.setWrittenAt(comment.getWrittenAt());
        form.setUserid(comment.getWrittenBy().getLoginId());

        final List<ReComment> recomments = recommentService.findByComment(comment.getId());
        form.setRecomments(recomments.stream().map(recomment -> recommentService.of(recomment)).toList());

        return form;
    }
    @Transactional
    public List<Comment> findByArticle(final Long articleId){
        final Article article = (Article) articleService.findById(articleId);
        return commentRepository.findByArticle(article);
    }

    /**
     * Comment 삭제
     * @param id
     */
    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}

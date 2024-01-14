package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.board.Comment;
import project.forAll.domain.member.Member;
import project.forAll.form.CommentForm;
import project.forAll.repository.board.CommentRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
@Transactional(readOnly = true)
public class CommentService extends Service {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    protected JpaRepository getRepository() {
        return commentRepository;
    }

    @Transactional
    public Long saveComment(Comment comment) {
        commentRepository.save(comment);
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
    public Comment createComment(final CommentForm cf) {
        final Comment comment = new Comment();
        comment.setText(cf.getText());
        comment.setWrittenAt(LocalDateTime.now());
        comment.setWrittenBy(cf.getMember());

        return comment;
    }

    /**
     * Comment 수정
     * @param id, content, createdAt, modifiedAt, member
     * @return comment
     */
    @Transactional
    public Comment updateComment(Long id, String text, Member member) {
        Comment comment = commentRepository.findById(id).orElseThrow();
        comment.setText(text);
        comment.setWrittenAt(LocalDateTime.now());
        comment.setWrittenBy(member);
        commentRepository.flush();

        return comment;
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

package project.forAll.controller.api.board;

import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.common.reflection.XMember;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.api.APIController;
import project.forAll.domain.board.Comment;
import project.forAll.domain.board.ReComment;
import project.forAll.domain.member.Member;
import project.forAll.form.CommentForm;
import project.forAll.form.ReCommentForm;
import project.forAll.service.MemberService;
import project.forAll.service.ReCommentService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class APIReCommentController extends APIController {

    private final ReCommentService recommentService;
    private final MemberService memberService;

    /**
     * id에 해당하는 recomment 객체를 반환
     *
     * @param id recomment의 id
     * @return recomment 객체
     */
    @GetMapping("/recomments/{id}")
    public ResponseEntity getReComment(@PathVariable("id") final Long id){
        final ReComment recomment = (ReComment) recommentService.findById(id);

        return recomment == null ? new ResponseEntity(errorResponse("No recomment found for id " + id), HttpStatus.NOT_FOUND)
                : new ResponseEntity(recomment, HttpStatus.OK);
    }

    /**
     * 대댓글 등록 페이지
     * @param rcf
     * @return commentId
     */
    @PostMapping("/recomments")
    public ResponseEntity createReComment(@RequestBody final ReCommentForm rcf){
        try{
            final ReComment recomment = recommentService.build(rcf);
            recommentService.save(recomment);

            return new ResponseEntity(Long.toString(recomment.getId()), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not create recomment : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/recomments")
    public ResponseEntity editRecomment(@RequestBody final ReCommentForm form, HttpServletRequest request){
        try{
            final ReComment savedRecomment = (ReComment) recommentService.findById(form.getId());
            if (savedRecomment == null) throw new Exception("No recomment " + form.getId());

            final ReComment recomment = recommentService.build(form);
            recommentService.save(recomment);

            return new ResponseEntity(recomment, HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not update recomment : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/recomments/comment/{id}")
    public ResponseEntity getCommentReComments(@PathVariable(value = "id") final Long commentId){
        try{
            final List<ReComment> recomments = recommentService.findByComment(commentId);
            final List<ReCommentForm> rcfs = recomments.stream().map(recomment -> recommentService.of(recomment, null)).toList();

            return new ResponseEntity(rcfs, HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get comment recomments : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/recomments/recommend")
    public ResponseEntity recommendRecomment(@RequestParam Long recommentId, @RequestParam String userId){
        try{
            final ReComment reComment = (ReComment) recommentService.findById(recommentId);
            final Long userLongId = memberService.findByLoginId(userId).getId();
            List<Long> recommends = reComment.getRecommend();
            if(recommends.contains(userLongId)) recommends.remove(userLongId);
            else recommends.add(userLongId);
            reComment.setRecommend(recommends);
            recommentService.save(reComment);
            return new ResponseEntity(Integer.toString(reComment.getRecommend().size()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not recommend recomment : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}

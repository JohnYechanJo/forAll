package project.forAll.controller.api.board;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.api.APIController;
import project.forAll.domain.board.Comment;
import project.forAll.form.CommentForm;
import project.forAll.service.CommentService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APICommentController extends APIController {

    private final CommentService commentService;

    /**
     * id에 해당하는 comment 객체를 반환
     *
     * @param id comment의 id
     * @return comment 객체
     */
    @GetMapping("/comments/{id}")
    public ResponseEntity getComment(@PathVariable("id") final Long id){
        final Comment comment = (Comment) commentService.findById(id);

        return comment == null ? new ResponseEntity(errorResponse("No commnt found for id " + id), HttpStatus.NOT_FOUND)
                : new ResponseEntity(comment, HttpStatus.OK);
    }

    /**
     * 게시글 등록 페이지
     * @param cf
     * @return commentId
     */
    @PostMapping("/comments/")
    public ResponseEntity createComment(@RequestBody final CommentForm cf){
        try{
            final Comment comment = commentService.createComment(cf);
            final Long commentId = commentService.saveComment(comment);

            return new ResponseEntity(Long.toString(commentId), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not create comment : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

//    @PutMapping("/comments")
//    public ResponseEntity editcomment(@RequestBody final CommentForm form, HttpServletRequest request){
//        try{
//            // commentForm으로부터 comment을 받아오는 코드를 잘 모르겠어서 수정 부탁드려요!
//            final Comment savedcomment = commentService.findById(form.getId());
//            if (savedcomment == null) throw new Exception("No comment " + form.getId());
//
//            final Comment comment = commentService.createComment(form);
//            comment.setId(savedcomment.getId());
//            commentService.save(comment);
//
//            return new ResponseEntity(comment, HttpStatus.OK);
//        } catch(final Exception e) {
//            return new ResponseEntity(errorResponse("Could not update comment : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
//        }
//    }
}

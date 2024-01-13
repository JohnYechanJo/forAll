package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;
import project.forAll.form.SpaceForm;
import project.forAll.service.MemberService;
import project.forAll.service.SpaceService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class APISpaceController extends APIController {

    private final SpaceService spaceService;
    private final SessionManager sessionManager;
    private final MemberService memberService;

    @PostMapping("/space")
    public ResponseEntity createSpace(@RequestBody final SpaceForm sf, HttpServletRequest request, HttpServletResponse response){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(sf.getUserId())) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);

            final Space space = spaceService.build(sf);

            return new ResponseEntity(Long.toString(space.getId()), HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not create space : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/space/{id}")
    public ResponseEntity getSpace(@PathVariable(value = "id") final String userId,HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(userId)) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);
            final Member savedMember = memberService.findByLoginId(userId);
            if (savedMember == null) throw new Exception("No member with loginId " + userId);

            final Space space = spaceService.findByMember(savedMember);

            return new ResponseEntity(spaceService.of(space), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get space : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }
}

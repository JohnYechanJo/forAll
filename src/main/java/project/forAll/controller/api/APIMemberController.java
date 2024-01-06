package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.domain.member.Member;
import project.forAll.form.MemberForm;
import project.forAll.service.MemberService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APIMemberController extends APIController {

    private final MemberService memberService;
    private final SessionManager sessionManager;

    /**
     * id에 해당하는 member 객체를 반환
     *
     * @param id member의 id
     * @return member 객체
     */
    @GetMapping("/members/{id}")
    public ResponseEntity getMember(@PathVariable("id") final Long id){
        final Member member = (Member) memberService.findById(id);

        return member == null ? new ResponseEntity(errorResponse("No user found for id " + id), HttpStatus.NOT_FOUND)
            : new ResponseEntity(member, HttpStatus.OK);
    }

    /**
     * 주어진 memberForm에 맞춰 member 생성 후, db에 저장
     * @param mf memberForm
     * @return response (success - 생성된 memberId 반환)
     *                  (fail - 에러 메시지 반환)
     */
    @PostMapping("/members")
    public ResponseEntity createMember(@RequestBody final MemberForm mf){
        try{
            final Member member = memberService.createMember(mf);

            final Long memberId = memberService.saveMember(member);
            return new ResponseEntity(Long.toString(memberId), HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not create member : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/members/checkId/{id}")
    public ResponseEntity checkDuplicatedLoginId(@PathVariable("id") final String id){
        try{
            memberService.validateDuplicateLoginId(id);
            return new ResponseEntity(id, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Duplicated id : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/members/checkEmail/{email}")
    public ResponseEntity checkDuplicatedEmail(@PathVariable("email") final String email){
        try{
            memberService.validateDuplicateEmail(email);
            return new ResponseEntity(email, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Duplicated email : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/members")
    public ResponseEntity editMember(@RequestBody final MemberForm form, HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(form.getLoginId())) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);

            final Member savedMember = memberService.findByLoginId(form.getLoginId());
            if (savedMember == null) throw new Exception("No member with loginId " + form.getLoginId());

            final Member member = memberService.createMember(form);
            member.setId(savedMember.getId());
            memberService.save(member);

            return new ResponseEntity(member, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not update Member : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/members/{id}/{pw}")
    public ResponseEntity checkIdAndPw(@PathVariable final String id, @PathVariable final String pw){
        try{
            final Member member = memberService.findByLoginIdAndLoginPw(id, pw);
            if (member == null) return new ResponseEntity(errorResponse("Wrong password"), HttpStatus.BAD_REQUEST);
            else return new ResponseEntity(member, HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Wrong password"), HttpStatus.BAD_REQUEST);
        }
    }


}

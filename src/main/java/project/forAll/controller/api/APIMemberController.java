package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.domain.Member;
import project.forAll.form.MemberForm;
import project.forAll.service.MemberService;

@RestController
@RequiredArgsConstructor
public class APIMemberController extends APIController {

    private final MemberService memberService;

    /**
     * id에 해당하는 member 객체를 반환
     *
     * @param id member의 id
     * @return member 객체
     */
    @GetMapping("/members/{id}")
    public ResponseEntity getMember(@PathVariable("id") final Long id){
        final Member member = memberService.findById(id);

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
        final Member member = memberService.build(mf);
        try{
            Long memberId = memberService.saveMember(member);
            return new ResponseEntity(memberId, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not create member : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}

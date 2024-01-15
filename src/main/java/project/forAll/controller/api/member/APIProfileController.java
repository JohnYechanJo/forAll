package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.member.Profile;
import project.forAll.domain.member.Member;
import project.forAll.form.ProfileForm;
import project.forAll.service.MemberService;
import project.forAll.service.ProfileService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APIProfileController extends APIController {

    private final ProfileService profileService;
    private final SessionManager sessionManager;
    private final MemberService memberService;

    @PostMapping("profile")
    public ResponseEntity createProfile(@RequestBody final ProfileForm pf, HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(pf.getUserId())) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);
            final Member savedMember = memberService.findByLoginId(pf.getUserId());
            if (savedMember == null) throw new Exception("No member with loginId " + pf.getUserId());

            final Profile profile = profileService.build(pf);
            profileService.save(profile);

            return new ResponseEntity(Long.toString(profile.getId()), HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not create profile : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}

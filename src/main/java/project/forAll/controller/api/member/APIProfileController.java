package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.member.Profile;
import project.forAll.domain.member.Member;
import project.forAll.dto.MemberPublicDTO;
import project.forAll.dto.ProfilePublicDTO;
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

    @PostMapping("/profile")
    public ResponseEntity createProfile(@RequestBody final ProfileForm pf, HttpServletRequest request){
        try {
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(pf.getUserId())) return new ResponseEntity(errorResponse("Session Disabled"),
                    HttpStatus.SERVICE_UNAVAILABLE);
            final Member savedMember = memberService.findByLoginId(pf.getUserId());
            if (savedMember == null) throw new Exception("No member with loginId " + pf.getUserId());

            final Profile profile = profileService.build(pf);
            profileService.save(profile);

            return new ResponseEntity(Long.toString(profile.getId()), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not create profile : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity getProfile(@PathVariable(value = "id") String userId, HttpServletRequest request){
        try {
            final Member savedMember = memberService.findByLoginId(userId);
            if (savedMember == null) throw new Exception("No member with loginId " + userId);

            final Profile profile = profileService.findByMember(savedMember);
            return new ResponseEntity(ProfileForm.pf(profile), HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not get profile : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity editProfile(@RequestBody final ProfileForm form, HttpServletRequest request){
        try {
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(form.getUserId())) return new ResponseEntity(errorResponse("Session Disabled"),
                    HttpStatus.SERVICE_UNAVAILABLE);

            final Member savedMember = memberService.findByLoginId(form.getUserId());
            if (savedMember == null) throw new Exception("No member with loginId " + form.getUserId());
            final Profile savedprofile = profileService.findByMember(savedMember);

            final Profile profile = profileService.build(form);
            profile.setId(savedprofile.getId());
            memberService.save(profile);

            return new ResponseEntity(ProfileForm.pf(profile), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not update Member : "+ e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // session 확인할 필요 없어서 해당 코드 제거
    @GetMapping("/profile/{id}")
    public ResponseEntity getProfileForPublic(@PathVariable("id") final Long id){
        final Profile profile = (Profile) profileService.findById(id);

        if (profile == null) return new ResponseEntity(errorResponse("No profile found for id " + id),
                HttpStatus.NOT_FOUND);

        // Convert Member to MemberPublicDTO
        ProfilePublicDTO profilePublicDTO = profileService.convertToProfilePublicDTO(profile);

        return new ResponseEntity(profilePublicDTO, HttpStatus.OK);
    }
}

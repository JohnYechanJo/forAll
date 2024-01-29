package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.member.ChefPending;
import project.forAll.domain.member.ChefProfile;
import project.forAll.domain.member.Member;
import project.forAll.domain.member.Profile;
import project.forAll.dto.ChefProfilePublicDTO;
import project.forAll.dto.ProfilePublicDTO;
import project.forAll.form.ChefProfileForm;
import project.forAll.form.ProfileForm;
import project.forAll.service.ChefProfileService;
import project.forAll.service.MemberService;
import project.forAll.service.ProfileService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APIChefProfileController extends APIController {

    private final ChefProfileService chefProfileService;
    private final ProfileService profileService;
    private final MemberService memberService;
    private final SessionManager sessionManager;

    @PostMapping("/chefProfile")
    public ResponseEntity createChefProfile(@RequestBody final ChefProfileForm cf, HttpServletRequest request){
        try {
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(cf.getUserId()))
                return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);
            final Member savedMember = memberService.findByLoginId(cf.getUserId());
            if (savedMember == null) throw new Exception("No member with loginId " + cf.getUserId());

            final ChefProfile chefProfile = chefProfileService.build(cf);
            chefProfileService.save(chefProfile);
            savedMember.setChefPending(ChefPending.PENDING);
            memberService.save(savedMember);
            return new ResponseEntity(Long.toString(chefProfile.getId()), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not create profile : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/chefProfile/user/{id}")
    public ResponseEntity getChefProfile(@PathVariable(value = "id") String userId, HttpServletRequest request){
        try {
            final Member savedMember = memberService.findByLoginId(userId);
            if (savedMember == null) throw new Exception("No member with loginId " + userId);

            final ChefProfile chefProfile = chefProfileService.findByMember(savedMember);
            return new ResponseEntity(ChefProfileForm.cf(chefProfile), HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not get profile : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/chefProfile")
    public ResponseEntity editProfile(@RequestBody final ChefProfileForm form, HttpServletRequest request){
        try {
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(form.getUserId())) return new ResponseEntity(errorResponse("Session Disabled"),
                    HttpStatus.SERVICE_UNAVAILABLE);

            final Member savedMember = memberService.findByLoginId(form.getUserId());
            if (savedMember == null) throw new Exception("No member with loginId " + form.getUserId());
            final ChefProfile savedChefProfile = chefProfileService.findByMember(savedMember);

            final ChefProfile chefProfile = chefProfileService.build(form);
            chefProfile.setId(savedChefProfile.getId());
            chefProfileService.save(chefProfile);
            savedMember.setChefPending(ChefPending.PENDING);
            memberService.save(savedMember);

            return new ResponseEntity(ChefProfileForm.cf(chefProfile), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not update Member : "+ e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/chefProfile/public/{id}")
    public ResponseEntity getChefProfileForPublic(@PathVariable("id") final Long id){
        final ChefProfile chefProfile = (ChefProfile) chefProfileService.findById(id);

        if (chefProfile == null) return new ResponseEntity(errorResponse("No chefprofile found for id " + id),
                HttpStatus.NOT_FOUND);

        // Convert Member to MemberPublicDTO
        ChefProfilePublicDTO chefProfilePublicDTO = chefProfileService.convertToChefProfilePublicDTO(chefProfile);

        return new ResponseEntity(chefProfilePublicDTO, HttpStatus.OK);
    }
}

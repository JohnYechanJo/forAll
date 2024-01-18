package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;
import project.forAll.form.SpaceForm;
import project.forAll.repository.space.SpaceRepository;
import project.forAll.service.MemberService;
import project.forAll.service.SpaceService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class APISpaceController extends APIController {

    private final SpaceService spaceService;
    private final SpaceRepository spaceRepository;
    private final SessionManager sessionManager;
    private final MemberService memberService;

    @PostMapping("/space")
    public ResponseEntity createSpace(@RequestBody final SpaceForm sf, HttpServletRequest request, HttpServletResponse response){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(sf.getUserId())) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);

            final Space space = spaceService.build(sf);
            spaceService.save(space);

            return new ResponseEntity(Long.toString(space.getId()), HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not create space : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * space id에 해당하는 space 정보를 불러온다
     * @param spaceId spaceId
     * @return space id에 해당하는 space 정보
     */
    @GetMapping("/space/{id}")
    public ResponseEntity getSpace(@PathVariable(value = "id") final Long spaceId){
        try{
            final Space space = (Space) spaceService.findById(spaceId);
            return new ResponseEntity(spaceService.of(space), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get space : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * 모든 공개 가능한 space data를 가져온다
     * @return ispublic이 true로 설정된 space data들
     */
    @GetMapping("/space/isPublic")
    public ResponseEntity getPublicSpaces(){
        try{
            List<Space> spaces = spaceRepository.findByIsPublic(true);
            if (spaces == null) return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
            else{
                List<SpaceForm> spaceForms = spaces.stream().map(space -> spaceService.of(space)).toList();
                return new ResponseEntity(spaceForms, HttpStatus.OK);
            }

        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not get public spaces : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * User가 등록한 space의 id에 대한 list를 받아온다.
     * @param userId
     * @param request
     * @return space id list
     */
    @GetMapping("/space/userSpace/{id}")
    public ResponseEntity getUserSpaces(@PathVariable(value ="id") final String userId, HttpServletRequest request ){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(userId)) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);
            final Member savedMember = memberService.findByLoginId(userId);
            if (savedMember == null) throw new Exception("No member with loginId " + userId);

            List<Space> spaces = spaceRepository.findByMember(savedMember);
            if (spaces == null) return new ResponseEntity(new ArrayList<>(), HttpStatus.OK);
            else{
                List<Long> spaceIds = spaces.stream().map(space -> space.getId()).toList();
                return new ResponseEntity(spaceIds, HttpStatus.OK);
            }
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not get user spaces : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/space")
    public ResponseEntity editSpace(@RequestBody final SpaceForm form, HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(form.getUserId()))
                return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);

            final Member savedMember = memberService.findByLoginId(form.getUserId());
            if (savedMember == null) throw new Exception("No member with loginId " + form.getUserId());

            final Space space = spaceService.rebuild(form);
            spaceService.save(space);
            return new ResponseEntity(Long.toString(space.getId()), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not edit Space : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}

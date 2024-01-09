package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.SessionManager;
import project.forAll.domain.space.Space;
import project.forAll.form.SpaceForm;
import project.forAll.service.SpaceService;
import project.forAll.web.SessionConst;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class APISpaceController extends APIController {

    private final SpaceService spaceService;
    private final SessionManager sessionManager;

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
}

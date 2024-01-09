package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.forAll.controller.SessionManager;
import project.forAll.domain.Image;
import project.forAll.domain.member.AuthenticationData;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;
import project.forAll.domain.space.image.KitImage;
import project.forAll.service.AuthenticationDataService;
import project.forAll.service.ImageService;
import project.forAll.service.MemberService;
import project.forAll.service.SpaceService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class APIImageController extends APIController{

    private final ImageService imageService;
    private final SessionManager sessionManager;
    private final MemberService memberService;

    @PostMapping("/image/upload")
    public ResponseEntity upload(@RequestPart(value="file") MultipartFile file,@RequestPart(value ="loginId") String userId, HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            if (!loginId.equals(userId)) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);
            final Member savedMember = memberService.findByLoginId(userId);
            if (savedMember == null) throw new Exception("No member with loginId " + userId);
            if (file == null) return new ResponseEntity("file is null", HttpStatus.BAD_GATEWAY);

            Long imageId = imageService.saveImage(file);
            return new ResponseEntity(Long.toString(imageId), HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not upload Image : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}

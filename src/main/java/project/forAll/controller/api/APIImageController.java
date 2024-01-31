package project.forAll.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.dto.ImageSaveDto;
import project.forAll.service.ImageService;
import project.forAll.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class APIImageController extends APIController{

    private final ImageService imageService;
    private final SessionManager sessionManager;
    private final MemberService memberService;

    @PostMapping("/image/upload")
    public ResponseEntity upload(@ModelAttribute ImageSaveDto imageSaveDto){
    //public ResponseEntity upload(@ModelAttribute ImageSaveDto imageSaveDto, @RequestPart(value ="loginId") String userId, HttpServletRequest request){
        try{
            //String loginId = (String) sessionManager.getSession(request);
            //if (!loginId.equals(userId)) return new ResponseEntity(errorResponse("Session Disabled"), HttpStatus.SERVICE_UNAVAILABLE);
            //final Member savedMember = memberService.findByLoginId(userId);
            //if (savedMember == null) throw new Exception("No member with loginId " + userId);
            //if (file == null) return new ResponseEntity("file is null", HttpStatus.BAD_GATEWAY);

            //String imageName = imageService.saveImage(file);
            List<String> imageNames = imageService.saveImages(imageSaveDto);
//            for(MultipartFile multipartFile : imageSaveDto.getImages()) {
//                String value = imageService.saveImage(multipartFile);
//            }
            return new ResponseEntity(imageNames, HttpStatus.OK);
            //return new ResponseEntity(imageNames, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not upload Image : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity getImage(@PathVariable(value="id") String imageName){
        try{
            String path = "forAll/src/main/resources/static/upload/";
            Resource resource = new FileSystemResource(path + imageName + ".png");
            return new ResponseEntity(resource, HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not get Image : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}

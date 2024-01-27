package project.forAll.controller.api.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.member.ChefPending;
import project.forAll.domain.member.Member;
import project.forAll.domain.reservation.Reservation;
import project.forAll.domain.reservation.ReservationState;
import project.forAll.domain.space.Space;
import project.forAll.domain.space.SpacePending;
import project.forAll.dto.admin.*;
import project.forAll.repository.ReservationRepository;
import project.forAll.repository.member.MemberRepository;
import project.forAll.repository.space.SpaceRepository;
import project.forAll.service.MemberService;
import project.forAll.service.ReservationService;
import project.forAll.service.SpaceService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class APIAdminController extends APIController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final SessionManager sessionManager;
    private final SpaceRepository spaceRepository;
    private final SpaceService spaceService;
    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

    @PostMapping("/admin/login")
    public ResponseEntity loginAdmin(@RequestBody final AdminMemberDto adminMemberDto, HttpServletRequest request,
                                     HttpServletResponse response) {

        Member adminLoginMember = memberService.findByLoginIdAndLoginPw(adminMemberDto.getLoginId(),
                adminMemberDto.getLoginPw());

        try {
            if ((adminLoginMember == null) | !(adminLoginMember.getIsAdmin().toString().equals("ADMIN")))
                throw new Exception(adminLoginMember.getLoginId());

            sessionManager.createSession(adminLoginMember.getLoginId(), response);

            return new ResponseEntity(adminLoginMember, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not find admin member : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/admin/logout")
    public void logoutAdmin(HttpServletRequest request) {
        sessionManager.expire(request);

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
    @GetMapping("/admin/reservation/{id}")
    public ResponseEntity getReservation(@PathVariable Long id){
        final Reservation reservation = (Reservation) reservationService.findById(id);
        return new ResponseEntity(AdminReservationDTO.build(reservation), HttpStatus.OK);
    };
    @GetMapping("/admin/spaceList/{state}")
    public ResponseEntity getSpaceList(@PathVariable String state){
        try{
            List<Space> spaces = spaceRepository.findBySpacePending(SpacePending.parse(state));
            return new ResponseEntity(spaces.stream().map(space -> spaceService.of(space)).toList(), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get space list : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/admin/chefList/{state}")
    public ResponseEntity getChefList(@PathVariable String state){
        try{
            List<Member> members = memberRepository.findByChefPending(ChefPending.parse(state));
            return new ResponseEntity(members.stream().map(member -> memberService.convertToMemberPublicDTO(member)).toList(), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get chef list : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/admin/reservationList/{state}")
    public ResponseEntity getReservationList(@PathVariable String state){
        try{
            List<Reservation> reservations = reservationRepository.findByState(ReservationState.parse(state));
            return new ResponseEntity(reservations.stream().map(reservation -> reservationService.of(reservation)).toList(), HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get reservation list : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/admin/space")
    public void confirmSpace(@RequestBody AdminSpaceConfirmDTO dto){
        final Space space = (Space) spaceService.findById(dto.getId());
        space.setSpacePending(dto.getState());
        spaceService.save(space);
    }
    @PostMapping("/admin/chef")
    public void confirmChef(@RequestBody AdminChefConfirmDTO dto){
        final Member member = (Member) memberService.findById(dto.getId());
        member.setChefPending(dto.getState());
        spaceService.save(member);
    }
    @PostMapping("/admin/reservation")
    public void confirmReservation(@RequestBody AdminReservationConfirmDTO dto){
        final Reservation reservation = (Reservation) reservationService.findById(dto.getId());
        reservation.setState(dto.getState());
        spaceService.save(reservation);
    }
}

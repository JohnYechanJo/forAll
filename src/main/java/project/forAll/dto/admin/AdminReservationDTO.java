package project.forAll.dto.admin;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.reservation.Reservation;
import project.forAll.domain.space.Space;

@Getter @Setter
public class AdminReservationDTO {
    private Long id; // 아이디
    private String image; // 사진
    private String address; // 주소
    private String name; // 이름
    private String rentDay; // 대관 날짜
    private String trialDay; // 트라이얼 날짜
    private Integer chefNum; // 셰프 수
    private Integer rentStartHour; // 대관 시작 시간
    private Integer rentEndHour; // 대관 종료 시간
    private Integer priceSet; // 가격
    private String cancelReason; // 취소 사유
    private String cancelTime; // 취소 시간

    public static AdminReservationDTO build(Reservation reservation){
        final AdminReservationDTO dto = new AdminReservationDTO();
        dto.setId(reservation.getId());
        dto.setImage(reservation.getSpace().getPlace().getMainImage().getImageName());
        dto.setAddress(reservation.getSpace().getPlace().getAddress());
        dto.setName(reservation.getSpace().getPlace().getName());
        dto.setRentDay(reservation.getRentDay());
        dto.setTrialDay(reservation.getTrialDay());
        dto.setChefNum(reservation.getChefNum());
        dto.setRentStartHour(reservation.getSpace().getRent().getAbleStartTime());
        dto.setRentEndHour(reservation.getSpace().getRent().getAbleFinTime());
        dto.setPriceSet(reservation.getSpace().getRent().getPriceSet());

        dto.setCancelReason(reservation.getCancelReason());
        dto.setCancelTime(reservation.getCancelTime());
        return dto;
    }
}

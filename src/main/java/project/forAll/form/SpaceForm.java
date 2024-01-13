package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class SpaceForm {
    // 유저 loginId
    private String userId;
    // 공간명
    private String name;
    // 공간 한줄소개
    private String spaceBrief;
    // 공간 소개
    private String spaceIntro;
    // 주방 특성
    private String kitchenFeat;
    // 주소
    private String address;
    // 위치정보
    private String addressBrief;
    // 웹사이트
    private String website;
    // 대표 이미지
    private String mainImage;

    // 홀 우측면
    private String hallRight;
    // 홀 좌측면
    private String hallLeft;
    // 홀 정면
    private String hallFront;
    // 홀 후면
    private String hallBack;
    // 홀 전체샷
    private String hallEntire;
    // 추가사진
    private List<String> hallExtra;

    // 주방 우측면
    private String kitRight;
    // 주방 좌측면
    private String kitLeft;
    // 주방 정면
    private String kitFront;
    // 주방 후면
    private String kitBack;
    // 주방 전체샷
    private String kitEntire;
    // 추가사진
    private List<String> kitExtra;

    // db에도 메뉴 1,2,3,4로 저장해야 하는가?
    // 메뉴
    private List<String> menu;

    // 대관 가능일
    private String ableDate;
    // 이용가능 시작시간
    private Integer ableStartHour;
    // 이용가능 종료시간
    private Integer ableFinHour;
    // 공간 층수
    private String floorNum;
    // 주차 여부
    private String ableParking;
    // 엘리베이터 여부
    private Boolean haveElevator;
    // 테이블 수
    private Integer tableNum;
    // 좌석 수
    private Integer seatNum;
    // 가격 설정
    private Integer priceSet;
    // 트라이얼 가능 여부
    private Boolean ableTrial;
    // 재료 새벽배달 가능 여부
    private Boolean ableEarlyDeliver;
    // 워크인 가능 여부
    private Boolean ableWorkIn;
    // 주류판매 가능 여부
    private Boolean ableDrink;

    // 화구
    private Integer fireholeNum;
    // 주방기계
    private String equip;
    // 추가 사용가능 기계
    private String equipExtra;
    // 앞접시 이미지
    private List<String> plateImage;
    // 앞접시 수
    private Integer plateNum;
    // 컵 이미지
    private List<String> cupImage;
    // 컵 수
    private Integer cupNum;
    // 커트러리 이미지
    private List<String> cutleryImage;
    // 커트러리 수
    private Integer cutleryNum;
    // 밧드 이미지
    private List<String> vatImage;
    // 밧드 수
    private Integer vatNum;

    // 결제 방식
    private String payWay;
    // 상호명
    private String companyName;
    // 대표명
    private String ceoName;
    // 사업자 등록번호
    private String businessNum;
    // 사업자 등록증
    private String businessImage;
    // 사업자 주소
    private String businessAddress;
    // 정산용 이메일
    private String payEmail;
    // 정산용 연락처
    private String payPhoneNum;
    // 은행명
    private String bankName;
    // 계좌번호
    private String accountNum;
    // 예금주
    private String accountHolder;


}

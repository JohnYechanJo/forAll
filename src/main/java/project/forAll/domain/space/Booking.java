package project.forAll.domain.space;

import lombok.Getter;
import lombok.Setter;
import project.forAll.domain.BassDomain;
import project.forAll.domain.Image;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Booking extends BassDomain {

    @Id
    @GeneratedValue
    @Column(name = "book_id")
    private Long id;

    // 결제 방식
    private BookingPayWay payWay;
    // 상호명
    private String companyName;
    // 대표명
    private String ceoName;
    // 사업자 등록번호
    private String bizNum;
    // 사업자 등록증
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bizImage_id")
    private Image bizImage;
    // 사업자 주소
    private String bizAddr;
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

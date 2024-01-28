package project.forAll.domain.alarm;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Alarm extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "alarm_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // "셰프 등록", "공간 등록", "예약 확정", "대관", "채팅", "고객센터" 중 하나
    private String alarmInfo;

    // 알림 날짜 + 시간
    private String alarmAt;
}

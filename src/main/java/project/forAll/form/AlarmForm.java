package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Gender;
import project.forAll.domain.member.Member;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter @Setter
@NoArgsConstructor
public class AlarmForm {

    // 고유 id
    private Long id;
    // 유저
    private String memberId;
    // "셰프 등록", "공간 등록", "예약 확정", "대관", "채팅", "고객센터" 중 하나
    private String alarmInfo;
    // 알림 날짜 + 시간
    private String alarmAt;
}

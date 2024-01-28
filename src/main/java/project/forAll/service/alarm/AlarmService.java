package project.forAll.service.alarm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.alarm.Alarm;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Category;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.chat.ChatRoomCategory;
import project.forAll.domain.member.Member;
import project.forAll.form.AlarmForm;
import project.forAll.form.ArticleForm;
import project.forAll.repository.alarm.AlarmRepository;
import project.forAll.service.MemberService;
import project.forAll.service.Service;
import project.forAll.util.ZoneTime;

import java.util.List;

@Component
@Transactional(readOnly = true)
public class AlarmService extends Service {

    @Autowired private MemberService memberService;
    @Autowired private AlarmRepository alarmRepository;
    @Autowired private ZoneTime zoneTime;

    @Override protected JpaRepository getRepository() {
        return alarmRepository;
    }

    @Transactional
    public List<Alarm> findAlarmByUserId(String userId){
        Member member = memberService.findByLoginId(userId);

        return alarmRepository.findByMember(member);
    }

    @Transactional
    public Long saveAlarm(Alarm alarm) {
        save(alarm);
        return alarm.getId();
    }

    @Transactional
    public Alarm build(final AlarmForm af) {
        final Alarm alarm = new Alarm();
        if (af.getId() != null) alarm.setId(af.getId());
        alarm.setMember(memberService.findByLoginId(af.getMemberId()));
        alarm.setAlarmInfo(af.getAlarmInfo());
        alarm.setAlarmAt(af.getAlarmAt());

        return alarm;
    }
}

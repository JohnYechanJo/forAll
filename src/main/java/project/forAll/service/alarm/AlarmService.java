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

        return alarmRepository.findByMemberAndUserChecked(member, false);
    }

    @Transactional
    public Long saveAlarm(Alarm alarm) {
        save(alarm);
        return alarm.getId();
    }

    @Transactional
    public AlarmForm of(final Alarm alarm){
        final AlarmForm form = new AlarmForm();
        form.setId(alarm.getId());
        form.setMemberId(alarm.getMember().getLoginId());
        form.setCategory(alarm.getCategory().toString());
        form.setAlarmInfo(alarm.getAlarmInfo());
        form.setAlarmAt(alarm.getAlarmAt().toString());

        return form;
    }
}

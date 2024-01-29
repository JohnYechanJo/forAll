package project.forAll.repository.alarm;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.alarm.Alarm;
import project.forAll.domain.member.Member;
import project.forAll.domain.space.Space;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByMemberAndUserChecked(Member member, Boolean userChecked);
}

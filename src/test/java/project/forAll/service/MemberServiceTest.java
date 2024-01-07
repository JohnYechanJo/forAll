package project.forAll.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.member.Member;
import project.forAll.form.MemberForm;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired MemberService memberService;

    @Before
    public void setup(){
        memberService.deleteAll();
    }
    @Test
    public void 회원가입() throws Exception {

        // Given
        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member = memberService.createMember(mf);

        // When
        Long memberId = memberService.saveMember(member);

        // Then
        Member getMember = memberService.findMemberById(memberId).orElseThrow();

        assertEquals("Member는 Male", "Male", getMember.getGender().toString());
        assertEquals("Member의 전화번호 일치", "01010101010", getMember.getPhoneNum());
    }

    @Test
    public void 중복_회원_ID_예외() throws Exception {

        // Given
        MemberForm mf1 = new MemberForm("forall", "forall1230", "천승범", "forall1@gmail.com",
                "01010101010", "20010101", "Male");
        MemberForm mf2 = new MemberForm("forall", "forall1230", "천승범", "forall2@gmail.com",
                "01010101010", "20010101", "Male");
        Member member1 = memberService.createMember(mf1);
        Member member2 = memberService.createMember(mf2);

        // When
        memberService.saveMember(member1);

        // Then
        assertThrows(IllegalStateException.class, () -> {
            memberService.saveMember(member2);
        });
    }

    @Test
    public void 중복_회원_이메일_예외() throws Exception {

        // Given
        MemberForm mf1 = new MemberForm("forall1", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        MemberForm mf2 = new MemberForm("forall2", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member1 = memberService.createMember(mf1);
        Member member2 = memberService.createMember(mf2);

        // When
        memberService.saveMember(member1);

        // Then
        assertThrows(IllegalStateException.class, () -> {
            memberService.saveMember(member2);
        });
    }

    @Test
    public void 정보수정() throws Exception {

        // Given
        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member = memberService.createMember(mf);
        Long memberId = memberService.saveMember(member);

        // When
        memberService.updateMember(memberId, "forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20020202", "Female");

        // Then
        Member getMember = memberService.findMemberById(memberId).orElseThrow();

        assertEquals("Male -> Female", "Female", getMember.getGender().toString());
        assertEquals("20010101 -> 20020202", "20020202", getMember.getBirthday());
    }

    @Test
    public void 회원탈퇴() {

        // Given
        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member = memberService.createMember(mf);
        Long memberId = memberService.saveMember(member);

        // When
        memberService.delete(member);

        // Then
        assertEquals("Member 삭제", 0, memberService.count());
    }
}
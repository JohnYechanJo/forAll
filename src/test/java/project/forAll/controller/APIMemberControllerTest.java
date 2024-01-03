package project.forAll.controller;


import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import project.forAll.domain.Member;
import project.forAll.domain.enums.Gender;
import project.forAll.domain.enums.MemberRole;
import project.forAll.form.MemberForm;
import project.forAll.repository.MemberRepository;
import project.forAll.service.MemberService;
import project.forAll.util.TestUtil;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class APIMemberControllerTest {

    private MockMvc mvc;
    @PersistenceContext EntityManager em;
    @Autowired private WebApplicationContext context;
    @Autowired private MemberService memberService;
    @Autowired private MemberRepository memberRepository;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
    }
    @Test
    public void getMemberTest() throws Exception {
        Member member = createMember("Owner", "forall", "forall1230", "천승범",
                "20010101", "010101-01-010101", "남자", "forall@gmail.com",
                "01010101010");
        Long memberId = memberService.saveMember(member);

        mvc.perform(MockMvcRequestBuilders.get("/api/v1/members/"+memberId))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/v1/members/"+(memberId+1)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void createMemberTest() throws Exception {
        final MemberForm mf = new MemberForm("Owner", "forall", "forall1230", "천승범",
                "20010101", "010101-01-010101", "남자", "forall@gmail.com",
                "01010101010");

        final String memberId = mvc.perform(MockMvcRequestBuilders.post("/api/v1/members")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.asJsonString(mf)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        final Member member = memberService.getMemberById(Long.parseLong(memberId)).orElseThrow();

        Assert.assertEquals(member.getLoginId(), mf.getLoginId());
    }

    private Member createMember(String role, String loginId, String loginPw, String name, String birthday,
                                String businessNum, String gender, String email, String phoneNum) {
        Member member = new Member();
        member.setRole(MemberRole.parse(role));
        member.setLoginId(loginId);
        member.setLoginPw(loginPw);
        member.setName(name);
        member.setBirthday(birthday);
        member.setBusinessNum(businessNum);
        member.setGender(Gender.parse(gender));
        member.setEmail(email);
        member.setPhoneNum(phoneNum);
        em.persist(member);
        return member;
    }
}

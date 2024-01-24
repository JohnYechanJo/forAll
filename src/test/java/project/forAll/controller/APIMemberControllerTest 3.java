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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import project.forAll.domain.member.Member;
import project.forAll.form.MemberForm;
import project.forAll.repository.member.MemberRepository;
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
        memberService.deleteAll();
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
    }
    @Test
    public void getMemberTest() throws Exception {
        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member = memberService.createMember(mf);
        Long memberId = memberService.saveMember(member);

        mvc.perform(MockMvcRequestBuilders.get("/api/v1/members/"+memberId))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/v1/members/"+(memberId+1)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void createMemberTest() throws Exception {
        final MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");

        final String memberId = mvc.perform(MockMvcRequestBuilders.post("/api/v1/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(TestUtil.asJsonString(mf)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        final Member member = (Member) memberService.findById(Long.parseLong(memberId));

        Assert.assertEquals(member.getLoginId(), mf.getLoginId());
    }

    @Test
    public void editMemberTest() throws Exception {
        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member = memberService.createMember(mf);
        Long memberId = memberService.saveMember(member);

        MemberForm mf2 = new MemberForm("forall123", "forall1230", "천승범", "forall123@gmail.com",
                "01010101010", "20010101", "Male");

        mvc.perform(MockMvcRequestBuilders.put("/api/v1/members")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.asJsonString(mf2)))
                .andExpect(status().isOk());

        Member updatedMember = memberService.findByLoginId("forall");

        Assert.assertEquals(updatedMember.getLoginPw(), "forall1231");

    }
}

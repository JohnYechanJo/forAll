package project.forAll.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import project.forAll.domain.member.Member;
import project.forAll.form.MemberForm;
import project.forAll.service.MemberService;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@AutoConfigureMockMvc
// @TestPropertySource(locations = "classpath:application.yml")
public class APISmsControllerTest {
    private MockMvc mvc;

    @Autowired private WebApplicationContext context;
    @Autowired private MemberService memberService;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void 문자인증() throws Exception {
        // Given
        MemberForm mf = new MemberForm("Owner", "forall1", "forall1230", "천승범",
                "20010101", "010101-01-010101", "Male", "forall12@gmail.com",
                "01049969685");
        Member member = memberService.build(mf);
        Long memberId = memberService.saveMember(member);

        // When
        Member getMember = memberService.getMemberById(memberId).orElseThrow();

        // Then
        mvc.perform(MockMvcRequestBuilders.post("/api/v1/send-one")
                .param("to", getMember.getPhoneNum()))
                .andExpect(status().isOk());
    }
}

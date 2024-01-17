package project.forAll.service;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.member.AuthenticationData;
import project.forAll.repository.AuthenticationDataRepository;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class AuthenticationDataServiceTest {

    @Autowired AuthenticationDataService service;
    @Autowired AuthenticationDataRepository repository;

    @Before
    public void setup() { service.deleteAll();}

    @Test
    public void 인증번호생성() throws Exception{
        // Given
        final String phoneNum = "01012345678";
        final String authenticationNum = "123456";

        // When
        Long dataId = service.saveData(phoneNum,authenticationNum);

        // Then
        AuthenticationData ad = repository.findByPhoneNum(phoneNum).get(0);

        assertEquals("Member의 인증번호 일치", "123456", ad.getAuthenticationNum());
    }

    @Test
    public void 인증번호확인() throws Exception{
        // Given
        final String phoneNum = "01012345678";
        final String authenticationNum = "123456";

        // When
        Long dataId = service.saveData(phoneNum,authenticationNum);

        // Then
        service.checkData("01012345678","123456",500L);

        assertThrows(IllegalStateException.class, () -> {
            service.checkData("01012345679","123457",500L);
        });

        assertThrows(IllegalStateException.class, () -> {
            service.checkData("01012345678","123457",500L);
        });

        assertThrows(IllegalStateException.class, () -> {
            service.checkData("01012345678","123457",0L);
        });
    }
}

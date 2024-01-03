package project.forAll.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.AuthenticationData;
import project.forAll.repository.AuthenticationDataRepository;
import project.forAll.util.ZoneTime;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

@Component
@Transactional
public class AuthenticationDataService extends Service {
    @Autowired
    private ZoneTime zoneTime;
    @Autowired
    private AuthenticationDataRepository authenticationDataRepository;

    @Override
    protected JpaRepository getRepository(){
        return authenticationDataRepository;
    }

    public Long saveData(final String phoneNum, final String authenticationNum){
        // 생성 이전에 존재하는 phonenum에 해당하는 인증번호 data 제거
        List<AuthenticationData> ads = authenticationDataRepository.findByPhoneNum(phoneNum);
        for (AuthenticationData ad: ads){
            delete(ad);
        }
        final AuthenticationData ad = new AuthenticationData();
        ad.setPhoneNum(phoneNum);
        ad.setAuthenticationNum(authenticationNum);
        ad.setTime(zoneTime.now());

        save(ad);
        return ad.getId();
    }

    /**
     * phoneNum에 해당하는 인증번호가 authenticationNum과 일치하는지 확인
     * 인증번호 생성 시간으로부터 흐른 시간이 avaliableSecond보다 작은지 확인
     *
     * @param phoneNum
     * @param authenticationNum
     * @param avaliableSecond
     */
    public void checkData(final String phoneNum, final String authenticationNum, final Long avaliableSecond){
        List<AuthenticationData> ads = authenticationDataRepository.findByPhoneNum(phoneNum);
        if (ads.isEmpty()){
            throw new IllegalStateException("인증번호가 생성되지 않았습니다");
        }
        final AuthenticationData ad = ads.get(0);
        if (!Objects.equals(ad.getAuthenticationNum(), authenticationNum)){
            throw new IllegalStateException("인증번호가 일치하지 않습니다");
        }
        if (zoneTime.passedSecond(ad.getTime()) > avaliableSecond){
            throw new IllegalStateException("유효기간이 지난 인증번호입니다.");
        }
    }

}

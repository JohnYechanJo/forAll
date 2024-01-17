package project.forAll.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.forAll.domain.member.AuthenticationData;

import java.util.List;

public interface AuthenticationDataRepository extends JpaRepository<AuthenticationData, Long> {

    List<AuthenticationData> findByPhoneNum(String phoneNum);
}

package project.forAll.util;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class User {

    private String userId;
    private String username;

    // 생성자, 게터, 세터 등 필요한 메서드 추가
}
package project.forAll.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Image extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "image_id")
    private Long id;

    // 원래 이미지 이름
    private String originName;
    // 같은 이름을 가진 이미지의 충돌을 막기 위한 random uuid 저장 변수
    private String imageName;
}

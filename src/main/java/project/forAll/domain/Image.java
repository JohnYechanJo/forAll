package project.forAll.domain;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "image_id")
    private Long id;

    private String originName; // 이미지 파일의 본래 이름

    private String imageName; // 이미지 파일이 S3에 저장될때 사용되는 이름

    //private String accessUrl; // S3 내부 이미지에 접근할 수 있는 URL

//    public Image(String originName) {
//        this.originName = originName;
//        this.imageName = getFileName(originName);
//        this.accessUrl = "";
//    }

    // 이미지 파일의 확장자를 추출하는 메소드
//    public String extractExtension(String originName) {
//        int index = originName.lastIndexOf('.');
//
//        return originName.substring(index, originName.length());
//    }
//
//    // 이미지 파일의 이름을 저장하기 위한 이름으로 변환하는 메소드
//    public String getFileName(String originName) {
//        return UUID.randomUUID() + "." + extractExtension(originName);
//    }
}
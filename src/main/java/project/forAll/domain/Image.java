package project.forAll.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Image extends BassDomain{
    @Id @GeneratedValue
    @Column(name = "image_id")
    private Long id;

    private String originName;
    private String imageName;
}

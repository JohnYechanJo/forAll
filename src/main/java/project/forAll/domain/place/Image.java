package project.forAll.domain.place;

import lombok.Getter;
import project.forAll.domain.BassDomain;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
public class Image extends BassDomain {

    @Id @GeneratedValue
    @Column(name = "image_id")
    private Long id;
}

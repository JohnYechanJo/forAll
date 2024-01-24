package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class AssuranceForm {
    private Long id;
    private Long reservation;
    private List<String> readyKitImage;
    private List<String> readyHallImage;
    private String readyAdditionalImage;
    private String readyRecord;
    private List<String> finKitImage;
    private List<String> finHallImage;
    private String finAdditionalImage;
    private String finRecord;
}

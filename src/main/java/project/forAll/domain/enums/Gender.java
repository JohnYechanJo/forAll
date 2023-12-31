package project.forAll.domain.enums;

import lombok.Getter;

@Getter
public enum Gender {

    Male("Male"),
    Female("Female"),
    NotSpecified("Not Specified");

    private final String name;

    Gender(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static Gender parse(final String genderStr) {
        for (final Gender gender : values()) {
            if (gender.getName().equals(genderStr)) {
                return gender;
            }
        }
        return NotSpecified;
    }
}

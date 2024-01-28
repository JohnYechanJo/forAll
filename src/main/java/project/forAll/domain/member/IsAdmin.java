package project.forAll.domain.member;

import lombok.Getter;

@Getter
public enum IsAdmin {

    Admin("Admin"),
    User("User"),
    NotSpecified("Not Specified");

    private final String name;

    IsAdmin(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static IsAdmin parse(final String isAdminStr) {
        for (final IsAdmin isAdmin : values()) {
            if (isAdmin.getName().equals(isAdminStr)) {
                return isAdmin;
            }
        }
        return NotSpecified;
    }
}

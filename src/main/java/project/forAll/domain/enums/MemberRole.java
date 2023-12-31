package project.forAll.domain.enums;


import lombok.Getter;

@Getter
public enum MemberRole {

    Customer("Customer"),
    Owner("Owner"),
    NotSpecified("Not Specified");

    private final String name;

    MemberRole(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static MemberRole parse(final String memberRoleStr) {
        for (final MemberRole memberRole : values()) {
            if (memberRole.getName().equals(memberRoleStr)) {
                return memberRole;
            }
        }
        return NotSpecified;
    }
}

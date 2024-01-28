package project.forAll.domain.member;

import lombok.Getter;

@Getter
public enum ChefPending {

    PENDING("Pending"),
    APPROVE("Approve"),
    REJECT("Reject"),
    NOTCREATED("Not Created"),
    NotSpecified("Not Specified");

    private final String name;

    ChefPending(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static ChefPending parse(final String pendingStr) {
        for (final ChefPending pending : values()) {
            if (pending.getName().equals(pendingStr)) {
                return pending;
            }
        }
        return NotSpecified;
    }
}

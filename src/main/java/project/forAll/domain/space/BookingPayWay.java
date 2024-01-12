package project.forAll.domain.space;

import lombok.Getter;

@Getter
public enum BookingPayWay {

    QuickPay("QuickPay"),
    ConfirmPay("ConfirmPay"),
    NotSpecified("Not Specified");

    private final String name;

    BookingPayWay(final String name) {this.name = name;}

    /** enum 을 String 으로 변환 **/
    @Override
    public String toString(){return getName();}

    /** string 을 enum 으로 변환 **/
    public static BookingPayWay parse(final String payWayStr) {
        for (final BookingPayWay payWay : values()) {
            if (payWay.getName().equals(payWayStr)) {
                return payWay;
            }
        }
        return NotSpecified;
    }
}
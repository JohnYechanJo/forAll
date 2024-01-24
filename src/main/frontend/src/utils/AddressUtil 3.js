export const AddressUtil = {
    extraction: (address) => {
        if (!address) return "주소 미정";
        const city = address.includes("서울") ? "서울특별시 " : "";
        return city + address.split(",")[0].split(" ").filter((i) => i.includes("동"))
    }
}
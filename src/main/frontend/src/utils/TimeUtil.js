export const TimeUtil = {
    now: () => new Date().toJSON(),
    getDiffSecond: (json) => {
        const from = new Date(json).getTime();
        const now = new Date().getTime();
        return Math.floor((now - from)/1000);
    },
    getDiffStr: (json) => {
        const from = new Date(json).getTime();
        const now = new Date().getTime();
        const sec = Math.floor((now - from)/1000);
        if (sec < 10) return "방금전";
        else if (sec < 60) return sec+"초 전";
        else if (sec < 60*60) return Math.floor(sec / 60)+"분 전";
        else if (sec < 24*60*60) return Math.floor(sec / 60 / 60) + "시간 전";
        else return Math.floor(sec / 60 / 60 / 24) + "일 전";
    }
}
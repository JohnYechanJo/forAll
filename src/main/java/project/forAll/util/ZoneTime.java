package project.forAll.util;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.Temporal;

@NoArgsConstructor
@Component
public class ZoneTime {

    public ZonedDateTime now(){
        return ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
    }

    public Long passedSecond(Temporal time){
        Duration passedTime = Duration.between(time, now());
        return passedTime.getSeconds();
    }
}

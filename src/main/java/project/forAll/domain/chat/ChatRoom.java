package project.forAll.domain.chat;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import project.forAll.domain.BassDomain;
import project.forAll.domain.member.Member;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
public class ChatRoom extends BassDomain {
    @Id
    @GeneratedValue
    @Column(name = "chatRoom_id")
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Member> users;

}


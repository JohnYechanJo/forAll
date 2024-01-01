package project.forAll.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.forAll.domain.Member;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    private final EntityManager em;

    public void save(Member member) {
        em.persist(member);
    }

    public Member findById(Long id) {
        return em.find(Member.class, id);
    }

    /* 필요할 수도 있어서 남겨놓습니다
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }
     */

    public List<Member> findByLoginId(String loginId) {
        return em.createQuery("select m from Member m where m.loginId = :loginId",
                Member.class)
                .setParameter("loginId", loginId)
                .getResultList();
    }

    /* 이메일 입력이 선택이라 이메일 중복은 확인할 필요 없지 않을까요..?
    public List<Member> findByEmail(String email) {
        return em.createQuery("select m from Member m where m.email = :email",
                        Member.class)
                .setParameter("email", email)
                .getResultList();
    }
     */

    // Member 삭제
    public void deleteById(Long id) {
        // Custom delete query using EntityManager
        em.createQuery("DELETE FROM Member m WHERE m.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
}

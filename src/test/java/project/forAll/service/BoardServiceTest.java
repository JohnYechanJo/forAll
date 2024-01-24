<<<<<<< HEAD
<<<<<<< HEAD
//package project.forAll.service;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//import project.forAll.domain.board.Article;
//import project.forAll.domain.board.Comment;
//import project.forAll.domain.member.Member;
//import project.forAll.form.ArticleForm;
//import project.forAll.form.CommentForm;
//import project.forAll.form.MemberForm;
//import project.forAll.repository.board.ArticleRepository;
//import project.forAll.repository.member.MemberRepository;
//
//import java.time.LocalDateTime;
//
//import static org.junit.Assert.*;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@Transactional
//public class BoardServiceTest {
//
//    @Autowired MemberService memberService;
//    @Autowired ArticleService articleService;
//    @Autowired CommentService commentService;
//
//    @Before
//    public void setup(){
//        memberService.deleteAll();
//        articleService.deleteAll();
//        commentService.deleteAll();
//    }
//
//    @Test
//    public void 게시글작성() throws Exception {
//
//        // Given
//        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
//                "01010101010", "20010101", "Male");
//        Member member = memberService.createMember(mf);
//
//        // When
//        ArticleForm af = new ArticleForm("안녕하세요", "For ALL입니다.", member);
//        Article article = articleService.createArticle(af);
//        Long articleId = articleService.saveArticle(article);
//
//        // Then
//        Article getArticle = articleService.findArticleById(articleId).orElseThrow();
//
//        assertEquals("게시글 제목 작성 확인", "안녕하세요", getArticle.getTitle());
//        assertEquals("게시글 내용 작성 확인", "For ALL입니다.", getArticle.getContent());
//        assertNotNull(getArticle.getWrittenAt());
//    }
=======
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)
package project.forAll.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import project.forAll.domain.board.Article;
import project.forAll.domain.board.Comment;
import project.forAll.domain.member.Member;
import project.forAll.form.ArticleForm;
import project.forAll.form.CommentForm;
import project.forAll.form.MemberForm;
import project.forAll.repository.board.ArticleRepository;
import project.forAll.repository.member.MemberRepository;

import java.time.LocalDateTime;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BoardServiceTest {

    @Autowired MemberService memberService;
    @Autowired ArticleService articleService;
    @Autowired CommentService commentService;

    @Before
    public void setup(){
        memberService.deleteAll();
        articleService.deleteAll();
        commentService.deleteAll();
    }

    @Test
    public void 게시글작성() throws Exception {

        // Given
        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
                "01010101010", "20010101", "Male");
        Member member = memberService.createMember(mf);

        // When
        ArticleForm af = new ArticleForm("안녕하세요", "For ALL입니다.", member);
        Article article = articleService.createArticle(af);
        Long articleId = articleService.saveArticle(article);

        // Then
        Article getArticle = articleService.findArticleById(articleId).orElseThrow();

        assertEquals("게시글 제목 작성 확인", "안녕하세요", getArticle.getTitle());
        assertEquals("게시글 내용 작성 확인", "For ALL입니다.", getArticle.getContent());
        assertNotNull(getArticle.getWrittenAt());
    }
<<<<<<< HEAD
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)

    // 게시글수정, 댓글작성 모두 아래 오류 발생
    // Batch update returned unexpected row count from update [0]; actual row count: 4; expected: 1;
//    @Test
//    public void 게시글수정() throws Exception {
//
//        // Given
//        MemberForm mf = new MemberForm("forall", "forall1230", "천승범", "forall@gmail.com",
//                "01010101010", "20010101", "Male");
//        Member member = memberService.createMember(mf);
//        memberService.saveMember(member);
//        ArticleForm af = new ArticleForm("안녕하세요", "For ALL입니다.", member);
//        Article article = articleService.createArticle(af);
//        Long articleId = articleService.saveArticle(article);
//
//        // When
//        articleService.updateArticle(articleId, "안녕", "나는 For ALL 개발자야!");
//
//        // Then
//        Article getArticle = articleService.findArticleById(articleId).orElseThrow();
//
//        assertEquals("게시글 제목 수정 확인", "안녕", getArticle.getTitle());
//        assertEquals("게시글 내용 수정 확인", "나는 For ALL 개발자야!", getArticle.getContent());
//    }
//
//    @Test
//    public void 댓글작성() {
//
//        // Given
//        MemberForm mf1 = new MemberForm("forall1", "forall1230", "송근일", "forall1@gmail.com",
//                "01010101010", "20010101", "Male");
//        Member member1 = memberService.createMember(mf1);
//        memberService.saveMember(member1);
//        MemberForm mf2 = new MemberForm("forall2", "forall1230", "조예찬", "forall2@gmail.com",
//                "01010101010", "20010101", "Male");
//        Member member2 = memberService.createMember(mf2);
//        memberService.saveMember(member2);
//        ArticleForm af = new ArticleForm("안녕하세요", "For ALL입니다.", member1);
//        Article article = articleService.createArticle(af);
//        Long articleId = articleService.saveArticle(article);
//        CommentForm cf = new CommentForm("반갑습니다", member2);
//        Comment comment = commentService.createComment(cf);
//        Long commentId = commentService.saveComment(comment);
//
//        // When
//        Comment getComment = commentService.findCommentById(commentId).orElseThrow();
//
//        // Then
//        assertEquals("댓글 내용 확인", "For ALL입니다.", getComment.getText());
//    }

<<<<<<< HEAD
<<<<<<< HEAD
//}
=======
}
>>>>>>> 087f6a3 ([01.24 예찬] 메뉴사진, 트라이얼, 새벽배달, 워크인, 미장 모달 구현 중+ModalStyles 세가지로 구분)
=======
}
>>>>>>> e9549e8 ([01.25 예찬] 모달 정보 수정 구현 완료)

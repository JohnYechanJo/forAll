package project.forAll.controller.api.board;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.forAll.controller.SessionManager;
import project.forAll.controller.api.APIController;
import project.forAll.domain.board.Article;
import project.forAll.form.ArticleForm;
import project.forAll.service.ArticleService;
import project.forAll.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class APIArticleController extends APIController {

    private final ArticleService articleService;
    private final SessionManager sessionManager;
    private final MemberService memberService;

    /**
     * id에 해당하는 article 객체를 반환
     *
     * @param id article의 id
     * @return article 객체
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity getArticle(@PathVariable("id") final Long id, HttpServletRequest request){
        try{
            final Article article = (Article) articleService.findById(id);

            String loginId = (String) sessionManager.getSession(request);
            final ArticleForm form = articleService.of(article, loginId);
            if (loginId != null) {
                Long userId = memberService.findByLoginId(loginId).getId();
                form.setRecommendAble(article.getRecommend().contains(userId));
            }
            return new ResponseEntity(form, HttpStatus.OK);


        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get article with id " + id + ": " + e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 게시글 등록 페이지
     * @param af
     * @return articleId
     */
    @PostMapping("/articles")
    public ResponseEntity createArticle(@RequestBody final ArticleForm af) {
        try {
            final Article article = articleService.build(af);
            final Long articleId = articleService.saveArticle(article);

            return new ResponseEntity(Long.toString(articleId), HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not create article : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/articles")
    public ResponseEntity editArticle(@RequestBody final ArticleForm form, HttpServletRequest request){
        try{
            // ArticleForm으로부터 Article을 받아오는 코드를 잘 모르겠어서 수정 부탁드려요!
            final Article savedArticle = (Article) articleService.findById(form.getId());
            if (savedArticle == null) throw new Exception("No article " + form.getId());

            final Article article = articleService.build(form);
            articleService.save(article);

            return new ResponseEntity(article, HttpStatus.OK);
        } catch(final Exception e) {
            return new ResponseEntity(errorResponse("Could not update Article : "+ e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/articles/user/{id}")
    public ResponseEntity getUserArticles(@PathVariable(value = "id") final String userId, HttpServletRequest request){
        try{
            String loginId = (String) sessionManager.getSession(request);
            final List<Article> articles = articleService.findByUserId(userId);
            final List<ArticleForm> afs = articles.stream().map(article -> articleService.of(article, loginId)).toList();

            return new ResponseEntity(afs, HttpStatus.OK);
        }catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get user articles : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/articles/category/{category}")
    public ResponseEntity getCategoryArticles(@PathVariable final String category){
        try{
            final List<Article> articles = articleService.findByCategory(category);
            final List<ArticleForm> afs = articles.stream().map(article -> articleService.of(article,null)).toList();
            return new ResponseEntity(afs, HttpStatus.OK);
        } catch (final Exception e){
            return new ResponseEntity(errorResponse("Could not get category articles : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/articles/recommend")
    public ResponseEntity recommendArticle(@RequestParam Long articleId, @RequestParam String userId){
        try{
            final Article article = (Article) articleService.findById(articleId);
            final Long userLongId = memberService.findByLoginId(userId).getId();
            List<Long> recommends = article.getRecommend();
            if (recommends.contains(userLongId)) recommends.remove(userLongId);
            else recommends.add(userLongId);
            article.setRecommend(recommends);
            articleService.save(article);
            return new ResponseEntity(Integer.toString(article.getRecommend().size()), HttpStatus.OK);
        }catch(final Exception e){
            return new ResponseEntity(errorResponse("Could not recommend article : " + e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }
}

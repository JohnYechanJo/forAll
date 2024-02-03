package project.forAll.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController implements ErrorController {

    @RequestMapping(value = {"/", "/error"})
    public String forward(){
        return "forward:/index.html";
    }

    @GetMapping(value = {"/error"})
    public String redirectRoot(){
        return "forward:/index.html";
    }
}

package project.forAll.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value = {"", "/login"})
    public String forward(){
        return "forward:/index.html";
    }
}

package com.ssafy.fullcourse.spark;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Slf4j
@RestController
@RequestMapping("/spark")
@RequiredArgsConstructor
public class SparkController {

    private final WordCountService wordCountService;

    @GetMapping("/wordcount")
    public Map<String, Long> count(@RequestParam(value = "content", required = false) String words) {

        Komoran komoran = new Komoran(DEFAULT_MODEL.LIGHT); //Full, Light
        komoran.setUserDic("src/main/java/com/ssafy/fullcourse/spark/user.dic"); // UserDic 경로지정
        KomoranResult analyzeResultList = komoran.analyze(words);

        System.out.println("Plane Text : " + words);
        System.out.println("getNouns : "+analyzeResultList.getNouns());
        System.out.println("getPlaneText : "+analyzeResultList.getPlainText());
        System.out.println("getList : "+analyzeResultList.getList());
        System.out.println("getMorphesByTags : "+analyzeResultList.getMorphesByTags("NP", "NNP", "JKB"));

        List<String> wordList = Arrays.asList(words.split(","));
        return wordCountService.getCount(wordList);
    }
}

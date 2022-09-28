package com.ssafy.fullcourse.spark;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Slf4j
@RestController
@RequestMapping("/spark")
@RequiredArgsConstructor
public class SparkController {

    private final WordCountService wordCountService;

    @GetMapping("/wordcount")
    public List<Map.Entry<String, Long>> count() {

        String str = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\SSAFY\\Desktop/insta.txt"));

            String st;
            while((st = br.readLine()) != null) {
                str += st;
            }

            br.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(str);


        Komoran komoran = new Komoran(DEFAULT_MODEL.FULL); //Full, Light
        komoran.setUserDic("src/main/java/com/ssafy/fullcourse/spark/user.dic"); // UserDic 경로지정
        KomoranResult analyzeResultList = komoran.analyze(str);

//        System.out.println("Plane Text : " + str);
//        System.out.println("getNouns : "+analyzeResultList.getNouns());
//        System.out.println("getPlaneText : "+analyzeResultList.getPlainText());
//        System.out.println("getList : "+analyzeResultList.getList());
//        System.out.println("getMorphesByTags : "+ analyzeResultList.getMorphesByTags("NNP", "JKB"));

        List<String> wordList = Arrays.asList(analyzeResultList.getMorphesByTags("NNP").toString().split(","));

        return wordCountService.getCount(wordList);
    }
}

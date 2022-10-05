package com.ssafy.fullcourse.spark;

import com.ssafy.fullcourse.global.util.RedisUtil;
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
import java.util.stream.Collectors;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Slf4j
@RestController
@RequestMapping("/wordcloud")
@RequiredArgsConstructor
public class SparkController {

    private final WordCountService wordCountService;
    private final RedisUtil redisUtil;

    @GetMapping("/count")
    public void count() {
        Komoran komoran = new Komoran(DEFAULT_MODEL.FULL); //Full, Light
        komoran.setUserDic("C:\\dev\\FullCourse\\backend\\src\\main\\java\\com\\ssafy\\fullcourse\\spark\\user.dic"); // UserDic 경로지정

        String str = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader("C:\\dev\\FullCourse\\backend\\src\\main\\java\\com\\ssafy\\fullcourse\\spark\\wordcloud.txt"));
            br.readLine();

            String st;

            while((st = br.readLine()) != null) {
                String place = st;
                String content = br.readLine();
                System.out.println(place);
                System.out.println(content);

                KomoranResult analyzeResultList = komoran.analyze(content);
                System.out.println("getMorphesByTags : "+ analyzeResultList.getMorphesByTags("NNP"));
                List<String> wordList = Arrays.asList(analyzeResultList.getMorphesByTags("NNP").toString().split(","));
                HashMap<String, Long> map = wordCountService.getCount(wordList);
                redisUtil.setStringHash(place, map);
            }

            br.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(str);
    }

    @GetMapping("/{place}")
    public Map<Object, Object> getWordCloud(@PathVariable String place) {
        return redisUtil.getStringHash(place.trim());
    }
}

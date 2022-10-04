package com.ssafy.fullcourse.spark;

import lombok.RequiredArgsConstructor;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class WordCountService {

    private final JavaSparkContext sc;

    public HashMap<String,Long> getCount(List<String> wordList) {
        JavaRDD<String> words = sc.parallelize(wordList);
        Map<String, Long> wordCounts = words.countByValue();
//        System.out.println("test22 : " + wordCounts);


        List<Map.Entry<String, Long>> result = new ArrayList<>(wordCounts.entrySet());
        Collections.sort(result, new Comparator<Map.Entry<String, Long>>() {
            @Override
            public int compare(Map.Entry<String, Long> o1, Map.Entry<String, Long> o2) {
                return o2.getValue().compareTo(o1.getValue());
            }
        });

        HashMap<String, Long> map = new HashMap<>();
        for(int i = 0; i < result.size(); i++) {
            if(map.size() >= 40) break;

            if(result.get(i).getKey().trim().length()==1) continue;
            map.put(result.get(i).getKey().trim(), result.get(i).getValue());
        }

        return map;
    }
}

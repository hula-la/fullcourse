package com.ssafy.fullcourse.spark;

import lombok.RequiredArgsConstructor;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class WordCountService {

    private final JavaSparkContext sc;

    public List<Map.Entry<String, Long>> getCount(List<String> wordList) {
        JavaRDD<String> words = sc.parallelize(wordList);
        Map<String, Long> wordCounts = words.countByValue();

        List<Map.Entry<String, Long>> result = new ArrayList<>(wordCounts.entrySet());
        Collections.sort(result, new Comparator<Map.Entry<String, Long>>() {
            @Override
            public int compare(Map.Entry<String, Long> o1, Map.Entry<String, Long> o2) {
                return o2.getValue().compareTo(o1.getValue());
            }
        });

//
//        List<String> keySet = new ArrayList<>(wordCounts.keySet());
//        keySet.sort((o1, o2) -> wordCounts.get(o2).compareTo(wordCounts.get(o1)));
//
//        Map<String, Long> result = new HashMap<>();
//        for (String key : keySet) {
//            result.put(key, wordCounts.get(key));
//        }

        return result;
    }
}

package com.ssafy.fullcourse.recommendation;

import com.ssafy.fullcourse.domain.place.application.ActivityService;
import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class CosineSimilarityService {
    private final ActivityService activityService;

    public ActivityDetailRes[] similarPlaceRecommender(long selectedIdx, int num) throws Exception {
        HashMap<Integer, Integer[]> integerListHashMap = readCSV();

        Integer[] selectedIdxGenre = integerListHashMap.get(selectedIdx);
        int movieNum = selectedIdxGenre.length;

        HashMap<Integer,Double> similarity = new HashMap<>();

        integerListHashMap.forEach((idx, list) -> {
            if (idx==selectedIdx) return;
            similarity.put(idx,cosineSimilarity(selectedIdxGenre,list));
        } );

        List<Entry<Integer, Double>> list_entries = new ArrayList<>(similarity.entrySet());

        // 비교함수 Comparator 를 사용하여 오름차순으로 정렬
        Collections.sort(list_entries, new Comparator<Entry<Integer, Double>>() {
            // compare로 값을 비교
            public int compare(Entry<Integer, Double> obj1, Entry<Integer, Double> obj2) {
                // 오름 차순 정렬
                return -obj1.getValue().compareTo(obj2.getValue());
            }
        });

        ActivityDetailRes[] activityDetailResArr = new ActivityDetailRes[Math.min(num, movieNum)];

        for (int i = 0; i < activityDetailResArr.length; i++) {
            Entry entry = list_entries.get(i);
            Long placeId = (Long) entry.getKey();
            System.out.println(entry.getKey() + " : " + entry.getValue());
            activityDetailResArr[i] = activityService.getActivityDetail(placeId);
        }

        return activityDetailResArr;

    }
    public HashMap<Integer,Integer[]> readCSV(){
        HashMap<Integer,Integer[]> csvList = new HashMap<>();
        File csv = new File("movie.csv");
        BufferedReader br;
        String line="";

        try {
            br = new BufferedReader(new FileReader(csv));
            br.readLine();
            while((line=br.readLine())!=null){
                String[] aline = line.split(",");
                int idx = Integer.parseInt(aline[0]);
                Integer[] arr = Stream.of(Arrays.copyOfRange(aline,1,aline.length)).mapToInt(Integer::parseInt).boxed().toArray(Integer[]::new);

                csvList.put(idx,arr);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return csvList;
    }


    public double cosineSimilarity(Integer[] vectorA, Integer[] vectorB) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;
        for (int i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += Math.pow(vectorA[i], 2);
            normB += Math.pow(vectorB[i], 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

}
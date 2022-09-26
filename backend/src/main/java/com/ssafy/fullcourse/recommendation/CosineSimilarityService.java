package com.ssafy.fullcourse.recommendation;

import com.opencsv.CSVWriter;
import com.ssafy.fullcourse.domain.place.application.ActivityService;
import com.ssafy.fullcourse.domain.place.application.TravelService;
import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
import com.ssafy.fullcourse.domain.place.repository.ActivityRepository;
import com.ssafy.fullcourse.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class CosineSimilarityService {
    private final TravelService travelService;

    private final TravelTagCsvService travelTagCsvService;

    private final RedisUtil redisUtil;

    public TravelDetailRes[] similarPlaceRecommender(long selectedIdx, int num) throws Exception {

        // 비교함수 Comparator 를 사용하여 오름차순으로 정렬
//        Collections.sort(list_entries, new Comparator<Entry<Long, Double>>() {
//            // compare로 값을 비교
//            public int compare(Entry<Long, Double> obj1, Entry<Long, Double> obj2) {
//                // 오름 차순 정렬
//                return -obj1.getValue().compareTo(obj2.getValue());
//            }
//        });
//
//        TravelDetailRes[] travelDetailResArr = new TravelDetailRes[Math.min(num, movieNum)];
//
//        for (int i = 0; i < travelDetailResArr.length; i++) {
//            Entry entry = list_entries.get(i);
//            Long placeId = (Long) entry.getKey();
//            System.out.println(entry.getKey() + " : " + entry.getValue());
//            travelDetailResArr[i] = travelService.getTravelDetail(placeId);
//        }
//
//        return travelDetailResArr;
        return null;

    }

    public void similarityConverter(String fileName) throws Exception {
        HashMap<Long, Integer[]> integerListHashMap = travelTagCsvService.readCSV("movie.csv");
        int movieNum = integerListHashMap.size();

        Long[] movieArr = integerListHashMap.keySet().toArray(new Long[0]);
        float[][] similarity = new float[movieNum][movieNum];
//        HashMap<Long,HashMap<Long,Float>> similarityRedis = new HashMap<>();

        for(int i=0;i<movieNum;i++){
            Integer[] targetVector = integerListHashMap.get(movieArr[i]);

//            Redis 저장
            HashMap<Long,Float> similarityMap = new HashMap<>();

            for (int j = 0; j < movieNum; j++) {
                if (i==j) similarity[i][j]=0;
                Integer[] comparedVector = integerListHashMap.get(movieArr[j]);
                similarity[i][j] = cosineSimilarity(targetVector,comparedVector);

                similarityMap.put(movieArr[j],similarity[i][j]);

            }
            redisUtil.setHashData(movieArr[i],similarityMap);
        }

        writeCSV("other.csv",movieArr,similarity);

//        레디스에 저장


//        System.out.println(redisUtil.getHashData("test","asdf"));
    }

    public void writeCSV(String fileName, Long[] header, float[][] similarity) throws Exception{
        File csv = new File(fileName);
        BufferedWriter bw = null;

        try {
            bw = new BufferedWriter(new FileWriter(csv, true));

//         헤더 저장
            bw.write(",");
            String headerStr = Arrays.toString(header)
                    .replaceAll("\\s+", "");
            bw.write(headerStr.substring(1, headerStr.length() - 1));

            bw.newLine(); // 개행

            for (int i = 0; i < similarity.length; i++) {
                String dataStr = Arrays.toString(similarity[i])
                        .replaceAll("\\s+", "");

                bw.write(header[i]+",");
                bw.write(dataStr.substring(1, dataStr.length() - 1));
                bw.newLine();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        } finally {
            try {
                if(bw != null){
                    bw.flush();
                    bw.close();
                }
            } catch (IOException e){
                e.printStackTrace();
            }
        }
    }




    public float cosineSimilarity(Integer[] vectorA, Integer[] vectorB) {
        float dotProduct = 0.0F;
        float normA = 0.0F;
        float normB = 0.0F;
        for (int i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += Math.pow(vectorA[i], 2);
            normB += Math.pow(vectorB[i], 2);
        }
        return (float) (dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)));
    }

}
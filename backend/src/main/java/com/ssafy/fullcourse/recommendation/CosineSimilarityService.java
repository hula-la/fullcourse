package com.ssafy.fullcourse.recommendation;

import com.opencsv.CSVWriter;
import com.ssafy.fullcourse.domain.place.application.ActivityService;
import com.ssafy.fullcourse.domain.place.application.TravelService;
import com.ssafy.fullcourse.domain.place.dto.ActivityDetailRes;
import com.ssafy.fullcourse.domain.place.dto.TravelDetailRes;
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
    private final TravelService travelService;

    public TravelDetailRes[] similarPlaceRecommender(long selectedIdx, int num) throws Exception {
        HashMap<Long, Integer[]> integerListHashMap = readCSV("movie.csv");

        Integer[] selectedIdxGenre = integerListHashMap.get(selectedIdx);
        System.out.println(Arrays.toString(selectedIdxGenre));
        int movieNum = selectedIdxGenre.length;

        HashMap<Long,Double> similarity = new HashMap<>();

        integerListHashMap.forEach((idx, list) -> {
            if (idx==selectedIdx) return;
            similarity.put(idx,cosineSimilarity(selectedIdxGenre,list));
        } );

        List<Entry<Long, Double>> list_entries = new ArrayList<>(similarity.entrySet());

        // 비교함수 Comparator 를 사용하여 오름차순으로 정렬
        Collections.sort(list_entries, new Comparator<Entry<Long, Double>>() {
            // compare로 값을 비교
            public int compare(Entry<Long, Double> obj1, Entry<Long, Double> obj2) {
                // 오름 차순 정렬
                return -obj1.getValue().compareTo(obj2.getValue());
            }
        });

        TravelDetailRes[] travelDetailResArr = new TravelDetailRes[Math.min(num, movieNum)];

        for (int i = 0; i < travelDetailResArr.length; i++) {
            Entry entry = list_entries.get(i);
            Long placeId = (Long) entry.getKey();
            System.out.println(entry.getKey() + " : " + entry.getValue());
            travelDetailResArr[i] = travelService.getTravelDetail(placeId);
        }

        return travelDetailResArr;

    }
    public double[][] similarityConverter() throws Exception {
        HashMap<Long, Integer[]> integerListHashMap = readCSV("movie.csv");
        int movieNum = integerListHashMap.size();

        Long[] movieArr = (Long[]) integerListHashMap.keySet().toArray();
        double[][] similarity = new double[movieNum][movieNum];

        for(int i=0;i<movieNum;i++){
            Integer[] targetVector = integerListHashMap.get(movieArr[i]);

            for (int j = 0; j < movieNum; j++) {
                if (i==j) similarity[i][j]=0;
                Integer[] comparedVector = integerListHashMap.get(movieArr[j]);
                similarity[i][j] = cosineSimilarity(targetVector,comparedVector);
            }
        }

        return similarity;
    }

    public void writeCSV(String fileName, Long[] header, Long[][] similarity) throws Exception{
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
                bw.write(",");

                String dataStr = Arrays.toString(similarity[i])
                        .replaceAll("\\s+", "");

                bw.write(header[i]+",");
                bw.write(dataStr.substring(1, dataStr.length() - 1));
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

//    public void csvWriter(String fileName, Long[] header, Long[][] similarity) throws Exception{
//
//        CSVWriter csvWriter = new CSVWriter(new FileWriter(fileName));
//        StringBuilder sb = new StringBuilder();
//
////        Long 배열 -> String 배열 변환
//        sb.append(Arrays.toString(header)
//                .replaceAll("\\s+", ""));
////        첫번째는 빈배열
//        sb.insert(1,",");
//        String str = sb.toString();
//
//
//        String[] strArray = str.substring(1, str.length() - 1)
//                .split(",");
////        헤더 작성
//        csvWriter.writeNext(strArray);
//
//
//    }


    public HashMap<Long,Integer[]> readCSV(String fileName){
        HashMap<Long,Integer[]> csvList = new HashMap<>();
        File csv = new File(fileName);
        BufferedReader br;
        String line="";

        try {
            br = new BufferedReader(new FileReader(csv));
            br.readLine();
            while((line=br.readLine())!=null){
                String[] aline = line.split(",");
                long idx = Long.parseLong(aline[0]);
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
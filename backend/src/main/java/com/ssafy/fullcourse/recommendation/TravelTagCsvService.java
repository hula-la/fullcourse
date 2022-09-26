package com.ssafy.fullcourse.recommendation;

import com.ssafy.fullcourse.domain.place.entity.Travel;
import com.ssafy.fullcourse.domain.place.entity.TravelTag;
import com.ssafy.fullcourse.domain.place.repository.TravelRepository;
import com.ssafy.fullcourse.domain.place.repository.TravelTagRepository;
import com.ssafy.fullcourse.global.model.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class TravelTagCsvService {
    private final TravelRepository travelRepository;
//    private final CosineSimilarityService cosineSimilarityService;

    // 리포지토리에서 태그 가져와서 파싱한 후, id-id 태그 테이블로 변환
    public HashMap<Long,boolean[]> converter() {

        // 태그 리스트 생성 및 객체 변환
        HashMap<String, Integer> tagMap = new HashMap<>();
        Tag[] tags = Tag.values();
        for (int i = 0; i < tags.length; i++) {
            tagMap.put(tags[i].toString(),i);
        }

        List<Travel> travelList = travelRepository.findAll();

        HashMap<Long,boolean[]> tagMapById = new HashMap<>();

        for (Travel travel:travelList) {
            boolean[] tagById = new boolean[tags.length];

            String[] tagsById = travel.getTag().split(",");
            Long placeId = travel.getPlaceId();

            for(String tag:tagsById){
                tagById[tagMap.get(tag)]=true;
            }

            tagMapById.put(placeId,tagById);
        }

        return tagMapById;
    }


    public void writeTag(String fileName, HashMap<Long,boolean[]> tagMapById) throws Exception{
        File csv = new File(fileName);
        BufferedWriter bw = null;

        try {
            bw = new BufferedWriter(new FileWriter(csv, true));


            for (Map.Entry<Long, boolean[]> entry : tagMapById.entrySet()) {
                Long id = entry.getKey();
                boolean[] tag = entry.getValue();

                bw.write(id +",");

                for (boolean b : tag) {
                    if (b) bw.write("1,");
                    else bw.write("0,");
                }
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
}

package com.ssafy.fullcourse.recommendation.api;

import com.ssafy.fullcourse.global.model.BaseResponseBody;
import com.ssafy.fullcourse.recommendation.application.CosineSimilarityService;
import com.ssafy.fullcourse.recommendation.application.TravelRecommendService;
import com.ssafy.fullcourse.recommendation.application.TravelTagCsvService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Api(value = "장소 추천 API", tags = {"recommendation"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/recommend")
@RequiredArgsConstructor
public class PlaceRecommendController {

    private final CosineSimilarityService cosineSimilarityService;
    private final TravelTagCsvService travelTagCsvService;

    private final TravelRecommendService travelRecommendService;


    @ApiOperation(value = "랜덤 장소 반환", notes = "성공여부를 반환함.")
    @GetMapping("/randomlist")
    public ResponseEntity<BaseResponseBody> randomPlace() throws Exception {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                travelRecommendService.randomPlace()));
    }

    @ApiOperation(value = "유사 장소 반환", notes = "성공여부를 반환함.")
    @GetMapping("/similar")
    public ResponseEntity<BaseResponseBody> similarPlace(@RequestParam Long placeId,@RequestParam int num) throws Exception {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                travelRecommendService.similarPlaceRecommender(placeId,num)));
    }


    @GetMapping("/convert/data")
    public ResponseEntity<BaseResponseBody> convertTagDBtoCSV() throws Exception {
        HashMap<Long, boolean[]> converter = travelTagCsvService.converter();
        travelTagCsvService.writeTag("tagByPlaceId.csv",converter);

        cosineSimilarityService.similarityConverter("tagByPlaceId.csv");

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success","변환 성공"));
    }




}

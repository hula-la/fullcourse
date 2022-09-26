package com.ssafy.fullcourse.recommendation;

import com.ssafy.fullcourse.domain.place.application.*;
import com.ssafy.fullcourse.domain.place.dto.CreateCustomReq;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Api(value = "장소 추천 API", tags = {"recommendation"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/recomplace")
@RequiredArgsConstructor
public class PlaceRecommendController {

    private final CosineSimilarityService cosineSimilarityService;
    private final TravelTagCsvService travelTagCsvService;


    @ApiOperation(value = "유사 장소 반환", notes = "성공여부를 반환함.")
    @GetMapping
    public ResponseEntity<BaseResponseBody> similarPlace(@RequestParam Long placeId) throws Exception {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                cosineSimilarityService.similarPlaceRecommender(placeId,4)));
    }


    @GetMapping("/convert")
    public void convertTagDBtoCSV() throws Exception {
        HashMap<Long, boolean[]> converter = travelTagCsvService.converter();
        travelTagCsvService.writeTag("tagByPlaceId.csv",converter);

        cosineSimilarityService.similarityConverter("tagByPlaceId.csv");
    }




}

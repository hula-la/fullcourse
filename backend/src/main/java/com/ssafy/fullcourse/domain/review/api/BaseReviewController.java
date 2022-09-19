package com.ssafy.fullcourse.domain.review.api;

import com.ssafy.fullcourse.domain.review.application.baseservice.BaseReviewService;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Api(value = "리뷰 API", tags = {"review"})
@RestController
@RequestMapping("/review")
public class BaseReviewController {

//    @Autowired
//    BaseReviewService baseReviewService;

//    private Map<String, BaseReviewService> baseReviewServiceMap = new HashMap<>();

    private final Map<String, BaseReviewService> baseReviewServiceMap;

    @Autowired
    public BaseReviewController(Map<String, BaseReviewService> baseReviewServiceMap) {
        this.baseReviewServiceMap = baseReviewServiceMap;

        System.out.println("baseReviewRepositoryMap = " + baseReviewServiceMap);
    }


//    @Autowired
////    BaseReviewRepository<R> baseReviewRepository;
//    public void setBasePlaceRepository(List<BaseReviewService> basePlaceRepositoryList) {
//        basePlaceRepositoryList.forEach(n -> baseReviewServiceMap.put(n.getClass().getName(),n));
//    }

    @PostMapping("/{type}/list/{placeId}")
    @ApiOperation(value = "리뷰 등록", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> registerReview(@PathVariable String type,
                                                           @PathVariable Long placeId,
                                                           @RequestBody ReviewPostReq reviewPostReq) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());

//        System.out.println("컨트롤러에서 서비스 인스턴스" + (baseReviewService instanceof ActivityReviewService)+" ** "+placeEnum.getService());


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", baseReviewService.createReview(placeEnum,placeId,reviewPostReq)));

    }

    @GetMapping("/{type}/list/{placeId}")
    @ApiOperation(value = "리뷰 목록 조회", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> findReview(@PathVariable String type,
                                                       @PathVariable Long placeId,
                                                       Pageable pageable) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", baseReviewService.getReviews(placeEnum,placeId,pageable)));

    }

    @DeleteMapping("/{type}/{reviewId}")
    @ApiOperation(value = "리뷰 삭제", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> deleteReview(@PathVariable String type,
                                                         @PathVariable Long reviewId) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());

        baseReviewService.deleteReviewById(placeEnum,reviewId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", "삭제"));

    }

    @PutMapping("/{type}/{reviewId}")
    @ApiOperation(value = "리뷰 수정", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> updateReview(@PathVariable String type,
                                                         @PathVariable Long reviewId,
                                                         @RequestBody ReviewPostReq reviewPostReq) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());

        baseReviewService.update(placeEnum,reviewId,reviewPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", "수정"));

    }

    @PostMapping("/{type}/like/{reviewId}")
    @ApiOperation(value = "리뷰 좋아요", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> likeReview(@PathVariable String type,
                                                         @PathVariable Long reviewId,
                                                         @RequestBody Long userId) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());


        baseReviewService.reviewLike(placeEnum,userId,reviewId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", "좋아요"));

    }


}

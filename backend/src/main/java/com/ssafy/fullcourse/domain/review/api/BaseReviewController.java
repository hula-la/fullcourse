package com.ssafy.fullcourse.domain.review.api;

import com.ssafy.fullcourse.domain.review.application.baseservice.BaseReviewService;
import com.ssafy.fullcourse.domain.review.dto.ReviewPostReq;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import com.ssafy.fullcourse.global.model.PlaceEnum;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Api(value = "리뷰 API", tags = {"review"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class BaseReviewController {

    private final Map<String, BaseReviewService> baseReviewServiceMap;


    @PostMapping("/{type}/list/{placeId}")
    @ApiOperation(value = "리뷰 등록", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> registerReview(@PathVariable String type,
                                                           @PathVariable Long placeId,
                                                           @AuthenticationPrincipal String email,
                                                           @RequestBody ReviewPostReq reviewPostReq) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());

//        System.out.println("컨트롤러에서 서비스 인스턴스" + (baseReviewService instanceof ActivityReviewService)+" ** "+placeEnum.getService());


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", baseReviewService.createReview(placeEnum,placeId,email,reviewPostReq)));

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
                                                       @AuthenticationPrincipal String email) {

        PlaceEnum placeEnum = PlaceEnum.valueOf(type);
        BaseReviewService baseReviewService = baseReviewServiceMap.get(placeEnum.getService());


        baseReviewService.reviewLike(placeEnum,email,reviewId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", "좋아요"));

    }


}

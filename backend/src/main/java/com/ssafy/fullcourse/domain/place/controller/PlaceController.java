package com.ssafy.fullcourse.domain.place.controller;

import com.ssafy.fullcourse.domain.place.application.*;
import com.ssafy.fullcourse.domain.place.dto.CreateCustomReq;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Api(value = "장소 API", tags = {"place"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {

    private final TravelService travelService;
    private final ActivityService activityService;
    private final CultureService cultureService;
    private final HotelService hotelService;
    private final RestaurantService restaurantService;
    private final CustomService customService;

    @ApiOperation(value = "장소 리스트 조회", notes = "장소 리스트를 반환함.")
    @GetMapping("/{type}/list")

    public ResponseEntity<BaseResponseBody> listTravel(@PathVariable String type, Pageable pageable,
                                                       @RequestParam(required = false, defaultValue = "") String keyword,
                                                       @RequestParam(required = false, defaultValue = "") String tag,
                                                       @RequestParam(required = false, defaultValue = "0") Integer maxDist,
                                                       @RequestParam(required = false, defaultValue = "0") Float recentLat,
                                                       @RequestParam(required = false, defaultValue = "0") Float recentLng
    ) throws Exception {
        if (type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    travelService.getTravelList(pageable, keyword, tag, maxDist, recentLat, recentLng)));
        } else if (type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    restaurantService.getRestaurantList(pageable, keyword, tag, maxDist, recentLat, recentLng)));
        } else if (type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    hotelService.getHotelList(pageable, keyword, maxDist, recentLat, recentLng)));
        } else if (type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    cultureService.getCultureList(pageable, keyword, maxDist, recentLat, recentLng)));
        } else if (type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    activityService.getActivityList(pageable, keyword, maxDist, recentLat, recentLng)));
        } else if (type.equals("custom")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    customService.getCustomList(pageable, keyword)));
        } else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }

    @ApiOperation(value = "장소 상세 조회", notes = "장소의 상세정보를 반환함.")
    @GetMapping("/{type}/detail/{placeId}")
    public ResponseEntity<BaseResponseBody> detailTravel(@PathVariable String type, @PathVariable Long placeId, @AuthenticationPrincipal String email) throws Exception {
        if (type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    travelService.getTravelDetail(placeId, email)));
        } else if (type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    restaurantService.getRestaurantDetail(placeId, email)));
        } else if (type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    hotelService.getHotelDetail(placeId, email)));
        } else if (type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    cultureService.getCultureDetail(placeId, email)));
        } else if (type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    activityService.getActivityDetail(placeId, email)));
        } else if (type.equals("custom")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    customService.getCustomDetail(placeId)));
        } else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }

    @ApiOperation(value = "장소 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @PostMapping("/{type}/like/{placeId}")
    public ResponseEntity<BaseResponseBody> likeTravel(@PathVariable String type, @PathVariable Long placeId,
                                                       @AuthenticationPrincipal String email) throws Exception {
        if (type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    travelService.travelLike(placeId, email)));
        } else if (type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    restaurantService.restaurantLike(placeId, email)));
        } else if (type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", hotelService.hotelLike(placeId
                    , email)));
        } else if (type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    cultureService.cultureLike(placeId, email)));
        } else if (type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                    activityService.activityLike(placeId, email)));
        } else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }


    @ApiOperation(value = "커스텀 장소 생성", notes = "성공여부를 반환함.")
    @PostMapping("/custom/create")
    public ResponseEntity<BaseResponseBody> customCreate(@RequestBody CreateCustomReq createCustomReq) throws Exception {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",
                customService.createCustom(createCustomReq)));
    }


}

package com.ssafy.fullcourse.domain.place.controller;

import com.ssafy.fullcourse.domain.place.application.*;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.entity.Custom;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

@Api(value = "장소 API", tags = {"place"})
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
    public ResponseEntity<BaseResponseBody> listTravel(@PathVariable String type, Pageable pageable) throws Exception{
        if(type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", travelService.getTravelList( pageable)));
        }else if(type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", restaurantService.getRestaurantList(pageable)));
        }else if(type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", hotelService.getHotelList( pageable)));
        }else if(type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", cultureService.getCultureList(pageable)));
        }else if(type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", activityService.getActivityList(pageable)));
        }else if(type.equals("custom")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", customService.getCustomList( pageable)));
        }else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }

    @ApiOperation(value = "장소 상세 조회", notes = "장소의 상세정보를 반환함.")
    @GetMapping("/{type}/detail/{placeId}")
    public ResponseEntity<BaseResponseBody> detailTravel(@PathVariable String type, @PathVariable Long placeId) throws Exception{
        if(type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", travelService.getTravelDetail(placeId)));
        }else if(type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", restaurantService.getRestaurantDetail(placeId)));
        }else if(type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", hotelService.getHotelDetail(placeId)));
        }else if(type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", cultureService.getCultureDetail(placeId)));
        }else if(type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", activityService.getActivityDetail(placeId)));
        }else if(type.equals("custom")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", customService.getCustomDetail(placeId)));
        }else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }

    @ApiOperation(value = "장소 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @PostMapping("/{type}/like/{placeId}")
    public ResponseEntity<BaseResponseBody> likeTravel(@PathVariable String type, @PathVariable Long placeId, @RequestBody Long userId) throws Exception{
        if(type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", travelService.travelLike(placeId, userId)));
        }else if(type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", restaurantService.restaurantLike(placeId, userId)));
        }else if(type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", hotelService.hotelLike(placeId, userId)));
        }else if(type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", cultureService.cultureLike(placeId, userId)));
        }else if(type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", activityService.activityLike(placeId, userId)));
        }else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }


    @ApiOperation(value = "커스텀 장소 생성", notes = "성공여부를 반환함.")
    @PostMapping("/custom/create")
    public ResponseEntity<BaseResponseBody> createCustom(@RequestBody Custom custom) throws Exception{
        return null;
    }


}

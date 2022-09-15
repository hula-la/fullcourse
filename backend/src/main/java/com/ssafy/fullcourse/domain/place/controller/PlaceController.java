package com.ssafy.fullcourse.domain.place.controller;

import com.ssafy.fullcourse.domain.place.application.*;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.entity.Custom;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

@Api(value = "장소 API", tags = {"place"})
@RestController
@RequestMapping("/place")
public class PlaceController {
    @Autowired
    private TravelService travelService;
    @Autowired
    private ActivityService activityService;
    @Autowired
    private CultureService cultureService;
    @Autowired
    private HotelService hotelService;
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private CustomService customService;

    @ApiOperation(value = "장소 리스트 조회", notes = "장소 리스트를 반환함.")
    @GetMapping("/{type}/list")
    public ResponseEntity<BaseResponseBody> listTravel(@PathVariable String type, @RequestBody ListReq listReq, Pageable pageable) throws Exception{
        if(type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", travelService.travelList(listReq, pageable)));
        }else if(type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", restaurantService.restaurantList(listReq, pageable)));
        }else if(type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", hotelService.hotelList(listReq, pageable)));
        }else if(type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", cultureService.cultureList(listReq, pageable)));
        }else if(type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", activityService.activityList(listReq, pageable)));
        }else if(type.equals("custom")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", customService.customList(listReq, pageable)));
        }else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }

    @ApiOperation(value = "여행지 상세 조회", notes = "여행지의 상세정보를 반환함.")
    @GetMapping("/{type}/detail/{placeId}")
    public ResponseEntity<BaseResponseBody> detailTravel(@PathVariable String type, @PathVariable Long placeId) throws Exception{
        if(type.equals("travel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", travelService.travelDetail(placeId)));
        }else if(type.equals("restaurant")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", restaurantService.restaurantDetail(placeId)));
        }else if(type.equals("hotel")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", hotelService.hotelDetail(placeId)));
        }else if(type.equals("culture")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", cultureService.cultureDetail(placeId)));
        }else if(type.equals("activity")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", activityService.activityDetail(placeId)));
        }else if(type.equals("custom")) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", customService.customDetail(placeId)));
        }else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Fail", null));
        }
    }

    @ApiOperation(value = "여행지 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @PostMapping("/{type}/like/{placeId}")
    public ResponseEntity<BaseResponseBody> likeTravel(@PathVariable String type, @PathVariable Long placeId) throws Exception{
        if(type.equals("travel")) {
            return null;
        }else if(type.equals("restaurant")) {
            return null;
        }else if(type.equals("hotel")) {
            return null;
        }else if(type.equals("culture")) {
            return null;
        }else if(type.equals("activity")) {
            return null;
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

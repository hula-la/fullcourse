package com.ssafy.fullcourse.domain.place.controller;

import com.ssafy.fullcourse.domain.place.application.TravelService;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.entity.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Api(value = "장소 API", tags = {"place"})
@RestController
@RequestMapping("/place")
public class PlaceController {
    @Autowired
    private TravelService travelService;

    @ApiOperation(value = "여행지 리스트 조회", notes = "여행지 리스트를 반환함.")
    @GetMapping("/travel/list")
    public ResponseEntity<List<Travel>> listTravel(@RequestBody ListReq listReq) throws Exception{
        return new ResponseEntity<List<Travel>>(travelService.travelList(listReq), HttpStatus.OK);
    }

    @ApiOperation(value = "여행지 상세 조회", notes = "여행지의 상세정보를 반환함.")
    @GetMapping("/travel/detail/{placeId}")
    public ResponseEntity<Travel> detailTravel(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "여행지 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @GetMapping("/travel/like/{placeId}")
    public ResponseEntity<String> likeTravel(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "식당 리스트 조회", notes = "식당 리스트를 반환함.")
    @GetMapping("/restaurant/list")
    public ResponseEntity<List<Restaurant>> listRestaurant(@RequestBody ListReq listReq) throws Exception{
        return null;
    }

    @ApiOperation(value = "식당 상세 조회", notes = "식당의 상세정보를 반환함.")
    @GetMapping("/restaurant/detail/{placeId}")
    public ResponseEntity<Restaurant> detailRestaurant(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "식당 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @GetMapping("/restaurant/like/{placeId}")
    public ResponseEntity<String> likeRestaurant(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "숙소 리스트 조회", notes = "숙소 리스트를 반환함.")
    @GetMapping("/hotel/list")
    public ResponseEntity<List<Hotel>> listHotel(@RequestBody ListReq listReq) throws Exception{
        return null;
    }

    @ApiOperation(value = "숙소 상세 조회", notes = "숙소의 상세정보를 반환함.")
    @GetMapping("/hotel/detail/{placeId}")
    public ResponseEntity<Hotel> detailHotel(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "숙소 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @GetMapping("/hotel/like/{placeId}")
    public ResponseEntity<String> likeHotel(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "문화 리스트 조회", notes = "문화 리스트를 반환함.")
    @GetMapping("/culture/list")
    public ResponseEntity<List<Culture>> listCulture(@RequestBody ListReq listReq) throws Exception{
        return null;
    }

    @ApiOperation(value = "문화 상세 조회", notes = "문화의 상세정보를 반환함.")
    @GetMapping("/culture/detail/{placeId}")
    public ResponseEntity<Culture> detailCulture(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "문화 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @GetMapping("/hotel/like/{placeId}")
    public ResponseEntity<String> likeCulture(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "액티비티 리스트 조회", notes = "액티비티 리스트를 반환함.")
    @GetMapping("/activity/list")
    public ResponseEntity<List<Activity>> listActivity(@RequestBody ListReq listReq) throws Exception{
        return null;
    }

    @ApiOperation(value = "액티비티 상세 조회", notes = "액티비티의 상세정보를 반환함.")
    @GetMapping("/activity/detail/{placeId}")
    public ResponseEntity<Activity> detailActivity(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "액티비티 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @GetMapping("/hotel/like/{placeId}")
    public ResponseEntity<String> likeActivity(@PathVariable Long placeId) throws Exception{
        return null;
    }

    @ApiOperation(value = "커스텀 장소 리스트 조회", notes = "커스텀 장소 리스트를 반환함.")
    @GetMapping("/custom/list")
    public ResponseEntity<List<Custom>> listCustom(@RequestBody ListReq listReq) throws Exception{
        return null;
    }

    @ApiOperation(value = "커스텀 장소 상세 조회", notes = "커스텀 장소의 상세정보를 반환함.")
    @GetMapping("/activity/detail/{placeId}")
    public ResponseEntity<Custom> detailCustom(@PathVariable Long placeId) throws Exception{
        return null;
    }





}

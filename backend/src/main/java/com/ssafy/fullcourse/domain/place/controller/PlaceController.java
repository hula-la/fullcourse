package com.ssafy.fullcourse.domain.place.controller;

import com.ssafy.fullcourse.domain.place.application.TravelService;
import com.ssafy.fullcourse.domain.place.dto.ListReq;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
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

    @ApiOperation(value = "장소 리스트 조회", notes = "장소 리스트를 반환함.")
    @GetMapping("/{type}/list")
    public ResponseEntity<List<PlaceRes>> listTravel(@PathVariable String type, @RequestBody ListReq listReq) throws Exception{
        if(type.equals("travel")) {
            return new ResponseEntity<List<PlaceRes>>(travelService.travelList(listReq), HttpStatus.OK);
        }else if(type.equals("restaurant")) {
            return null;
        }else if(type.equals("hotel")) {
            return null;
        }else if(type.equals("culture")) {
            return null;
        }else if(type.equals("activity")) {
            return null;
        }else if(type.equals("custom")) {
            return null;
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "여행지 상세 조회", notes = "여행지의 상세정보를 반환함.")
    @GetMapping("/{type}}/detail/{placeId}")
    public ResponseEntity<Travel> detailTravel(@PathVariable String type, @PathVariable Long placeId) throws Exception{
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
        }else if(type.equals("custom")) {
            return null;
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "여행지 좋아요 버튼", notes = "좋아요 성공 여부를 반환")
    @PostMapping("/{type}/like/{placeId}")
    public ResponseEntity<String> likeTravel(@PathVariable String type, @PathVariable Long placeId) throws Exception{
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
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @ApiOperation(value = "커스텀 장소 생성", notes = "성공여부를 반환함.")
    @PostMapping("/custom/create")
    public ResponseEntity<String> createCustom(@RequestBody Custom custom) throws Exception{
        return null;
    }


}

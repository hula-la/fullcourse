package com.ssafy.fullcourse.domain.sharefullcourse.controller;

import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCService;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.*;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/share")
public class SharedFullCourseController {

    @Autowired
    SharedFCService sharedFCService;
    @Autowired
    FullCourseRepository fullCourseRepository;

    /** 공유 풀코스 등록 **/
    @PostMapping("/fullcourse")
    public ResponseEntity<BaseResponseBody> registSharedFC(@RequestBody SharedFCPostReq sharedFCPostReq) {
        /** [수정 필요]
         * 1. 풀코스 repository 수정
         * 2. 이미 등록된 공유 풀코스일 경우 따로 예외처리
         * **/
        try{
            SharedFCDto sharedFCDto = SharedFCDto.builder()
                    .fullCourse(fullCourseRepository.findByFcId(sharedFCPostReq.getFcId()))
                    .detail(sharedFCPostReq.getDetail())
                    .title(sharedFCPostReq.getTitle())
                    .thumbnail(sharedFCPostReq.getThumbnail())
                    .regDate(new Date())
                    .sharedFCTags(new ArrayList<>())
                    .build();

            List<SharedFCTagDto> tags = sharedFCPostReq.getTags().stream()
                    .map(tag->SharedFCTagDto.builder().tagContent(tag).build())
                    .collect(Collectors.toList());

            // 공유 풀코스 등록
            Long sharedFcId = sharedFCService.createSharedFC(sharedFCDto, tags);
            if(sharedFcId!=null){
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFcId));
            }else{
                return ResponseEntity.status(500).body(BaseResponseBody.of(500, "fail", null));
            }
        }catch (NullPointerException e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "fail", "유효하지 않은 풀코스"));
        }

    }

    /** 공유 풀코스 상세 조회 **/
    @GetMapping("/fullcourse/{sharedFcId}")
    public ResponseEntity<BaseResponseBody> detailSharedFC(@PathVariable Long sharedFcId) {
        try{
            SharedFCGetRes res = sharedFCService.detailSharedFC(sharedFcId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", res));
        }catch (NullPointerException e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400,"fail","상세 풀코스 정보가 없습니다."));
        }

    }

    /** 공유 풀코스 상세 수정 **/
    @PutMapping("/fullcourse")
    public ResponseEntity<BaseResponseBody> updateSharedFC(@RequestBody SharedFCPutReq sharedFCPutReq) {
        /** [수정 필요]
         * 1. 풀코스 repository 수정
         * 2. 등록되지 않은 공유 풀코스일 경우 따로 예외처리
         * **/
        SharedFCDto sharedFCDto = SharedFCDto.builder()
                .fullCourse(fullCourseRepository.findByFcId(sharedFCPutReq.getFcId()))
                .sharedFcId(sharedFCPutReq.getSharedFcId())
                .detail(sharedFCPutReq.getDetail())
                .title(sharedFCPutReq.getTitle())
                .thumbnail(sharedFCPutReq.getThumbnail())
                .regDate(new Date())
                .sharedFCTags(new ArrayList<>())
                .build();

        List<SharedFCTagDto> tags = sharedFCPutReq.getTags().stream()
                .map(tag->SharedFCTagDto.builder().tagContent(tag).sharedFcId(sharedFCPutReq.getSharedFcId()).build())
                .collect(Collectors.toList());

        // 공유 풀코스 상세 수정
        Long sharedFcId = sharedFCService.updateSharedFC(sharedFCDto, tags);
        if(sharedFcId!=null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFcId));
        }else{
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "fail", null));
        }
    }


    /** 공유 퓰코스 삭제 **/
    @DeleteMapping("/fullcourse/{shareFcId}")
    public ResponseEntity<BaseResponseBody> deleteSharedFC(@PathVariable Long shareFcId) {
        /** [수정 필요]
         * 1. 풀코스 repository 수정
         * 2. 이미 등록된 공유 풀코스일 경우 따로 예외처리
         * **/
        if(sharedFCService.deleteSharedFC(shareFcId)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fail", "공유 풀코스가 존재하지 않습니다."));

    }

}

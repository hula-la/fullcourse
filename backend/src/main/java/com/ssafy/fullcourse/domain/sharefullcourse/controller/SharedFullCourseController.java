package com.ssafy.fullcourse.domain.sharefullcourse.controller;

import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCService;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCPostReq;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;


@RestController
@RequestMapping("/share")
public class SharedFullCourseController {

    @Autowired
    SharedFCService sharedFCService;

    @GetMapping("/fullcourse/{shareFcId}")
    /** 공유 풀코스 상세 조회 **/
    public ResponseEntity<BaseResponseBody> listSharedFC(@PathVariable Long shareFcId) {
        try{
            Optional<SharedFullCourse> findeSharedFC = Optional.ofNullable(sharedFCService.detailSharedFC(shareFcId));
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", findeSharedFC));
        }catch (NullPointerException e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400,"fail","상세 풀코스 정보가 없습니다."));
        }

    }

    @PostMapping("/fullcourse")
    /** 공유 풀코스 등록 **/
    public ResponseEntity<BaseResponseBody> registSharedFC(@RequestBody SharedFCPostReq sharedFCPostReq) {

        SharedFCDto sharedFCDto = SharedFCDto.builder()
                .detail(sharedFCPostReq.getDetail())
                .title(sharedFCPostReq.getTitle())
                .thumbnail(sharedFCPostReq.getThumbnail())
                .regDate(new Date())
                .build();

        if(sharedFCService.createSharedFC(sharedFCDto)!=null){



            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
        }else{
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "fail", null));
        }
    }
}

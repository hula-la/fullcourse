package com.ssafy.fullcourse.domain.sharefullcourse.controller;

import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCCommentService;
import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCService;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.*;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Api(value="Share Fullcourse", tags={"share fullcourse"})
@RestController
@RequestMapping("/share")
public class SharedFullCourseController {

    @Autowired
    SharedFCService sharedFCService;
    @Autowired
    FullCourseRepository fullCourseRepository;
    @Autowired
    SharedFCCommentService sharedFCCommentService;
    @Autowired
    UserRepository userRepository;

    /** 공유 풀코스 등록 **/
    @PostMapping("/fullcourse")
    @ApiOperation(value = "공유풀코스 등록", notes = "풀코스 id, 제목, 상세내용, 썸네일 이미지, 태그 리스트를 입력받아 공유 풀코스를 동록합니다.")
    public ResponseEntity<BaseResponseBody> registSharedFC(@RequestBody SharedFCPostReq sharedFCPostReq) {
        /** [수정 필요]
         * - 풀코스 repository 수정
         * - 사용자 불러오는거 수정
         * - 이미 등록된 공유 풀코스일 경우 따로 예외처리
         *
         * **/

        Optional<User> user = userRepository.findByEmail("1");
        if(!user.isPresent()) throw new UserNotFoundException();

        try{
            SharedFCDto sharedFCDto = SharedFCDto.builder()
                    .fullCourse(fullCourseRepository.findByFcId(sharedFCPostReq.getFcId()))
                    .detail(sharedFCPostReq.getDetail())
                    .title(sharedFCPostReq.getTitle())
                    .thumbnail(sharedFCPostReq.getThumbnail())
                    .regDate(new Date())
                    .sharedFCTags(new ArrayList<>())
                    .user(user.get())
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
    @ApiOperation(value = "공유풀코스 상세 조회", notes = "공유 풀코스 id 로 공유 풀코스 상세 정보를 조회합니다.")
    public ResponseEntity<BaseResponseBody> detailSharedFC(
            @ApiParam(value="공유 풀코스 id", required = true)
            @PathVariable  Long sharedFcId) {
        try{
            SharedFCGetRes res = sharedFCService.detailSharedFC(sharedFcId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", res));
        }catch (NullPointerException e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400,"fail","상세 풀코스 정보가 없습니다."));
        }

    }

    /** 공유 풀코스 상세 수정 **/

    @PutMapping("/fullcourse")
    @ApiOperation(value = "공유풀코스 상세 수정", notes = "공유 풀코스의 상세 내용(제목, 내용, 썸네일, 태그)을 수정합니다")
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


    /** 공유 풀코스 삭제 **/
    @DeleteMapping("/fullcourse/{sharedFcId}")
    @ApiOperation(value = "공유풀코스 삭제", notes = "공유 풀코스를 삭제합니다.")
    public ResponseEntity<BaseResponseBody> deleteSharedFC(@PathVariable Long sharedFcId) {
        /** [수정 필요]
         * 1. 풀코스 repository 수정
         * **/
        if(sharedFCService.deleteSharedFC(sharedFcId)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fail", "공유 풀코스가 존재하지 않습니다."));

    }

    /** 공유 풀코스 좋아요 **/
    @PostMapping("/like/{sharedFcId}")
    public ResponseEntity<BaseResponseBody> likeSharedFC(@PathVariable Long sharedFcId){

        Optional<User> user = userRepository.findByEmail("1");
        if(!user.isPresent()) throw new UserNotFoundException();

        if(sharedFCService.likeSharedFC(sharedFcId,user.get())==1){ // 좋아요
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "좋아요 완료"));
        }else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "좋아요 취소"));
        }
    }

    /** 풀코스 댓글 등록 **/
    @PostMapping("/comment")
    public ResponseEntity<BaseResponseBody> registComment(@RequestBody SharedFCCommentReq sharedFCCommentReq) {

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();

        if(sharedFCCommentService.createFCComment(sharedFCCommentReq, user.get())){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "댓글 등록"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "success", "댓글 등록 실패"));
    }

    /** 풀코스 댓글 수정 **/
    @PutMapping("/comment/{commentId}")
    public ResponseEntity<BaseResponseBody> updateComment(@PathVariable Long commentId, @RequestBody SharedFCCommentReq sharedFCCommentReq) {

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();

        if(sharedFCCommentService.updateFCComment(commentId, sharedFCCommentReq, user.get())){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "댓글 수정"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "success", "댓글 수정 실패"));
    }

    /** 풀코스 댓글 삭제 **/
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<BaseResponseBody> updateComment(@PathVariable Long commentId) {

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();

        sharedFCCommentService.deleteFCComment(commentId,user.get());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "댓글 삭제"));
    }
    /** 풀코스 댓글 조회 **/
    @GetMapping("/comment/{sharedFcId}")
    public ResponseEntity<BaseResponseBody> listComment(@PathVariable Long sharedFcId){
        List<SharedFCCommentRes> commentResList = sharedFCCommentService.listFCComment(sharedFcId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", commentResList));
    }
}

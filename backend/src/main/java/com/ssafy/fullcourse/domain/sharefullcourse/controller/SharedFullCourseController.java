package com.ssafy.fullcourse.domain.sharefullcourse.controller;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCCommentService;
import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCService;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.*;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.error.ServerError;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
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
         * - 사용자 불러오는거 수정
         * **/

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();


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
                .map(tag -> SharedFCTagDto.builder().tagContent(tag).build())
                .collect(Collectors.toList());

        // 공유 풀코스 등록
        Long sharedFcId = sharedFCService.createSharedFC(sharedFCDto, tags);
        HashMap<String,Long> res = new HashMap<>();
        res.put("sharedFcId",sharedFcId);
        if (sharedFcId != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", res));
        } else {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "공유 풀코스 생성 중 오류", null));
        }

    }

    /** 공유 풀코스 상세 조회 **/
    @GetMapping("/fullcourse/{sharedFcId}")
    @ApiOperation(value = "공유풀코스 상세 조회", notes = "공유 풀코스 id 로 공유 풀코스 상세 정보를 조회합니다.")
    public ResponseEntity<BaseResponseBody> detailSharedFC(
            @ApiParam(value="공유 풀코스 id", required = true)
            @PathVariable  Long sharedFcId) {

        SharedFCGetRes res = sharedFCService.detailSharedFC(sharedFcId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", res));

    }

    /** 공유 풀코스 상세 수정 **/
    @PutMapping("/fullcourse")
    @ApiOperation(value = "공유풀코스 상세 수정", notes = "공유 풀코스의 상세 내용(제목, 내용, 썸네일, 태그)을 수정합니다")
    public ResponseEntity<BaseResponseBody> updateSharedFC(@RequestBody SharedFCPutReq sharedFCPutReq) {

        FullCourse fullCourse = fullCourseRepository.findByFcId(sharedFCPutReq.getFcId());
        SharedFCDto sharedFCDto = SharedFCDto.builder()
                .fullCourse(fullCourse)
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

        sharedFCService.deleteSharedFC(sharedFcId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));

    }

    /** 공유 풀코스 좋아요 **/
    @PostMapping("/like/{sharedFcId}")
    @ApiOperation(value = "공유풀코스 좋아요", notes = "공유 풀코스 좋아요시, 사용자식별자(userId), 공유풀코스식별자(sharedFcId)를 추가하고 취소시 삭제합니다.")
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
    @ApiOperation(value = "공유풀코스 댓글 등록", notes = "공유 풀코스 댓글을 등록합니다. 댓글내용, 공유풀코스식별자(sharedFcId), header : access-token 필요")
    public ResponseEntity<BaseResponseBody> registComment(@RequestBody SharedFCCommentReq sharedFCCommentReq) {

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();

        int result =sharedFCCommentService.createFCComment(sharedFCCommentReq, user.get());
        if(result==1){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "댓글 등록"));
        }else throw new ServerError("댓글 등록 중 오류 발생");
    }

    /** 풀코스 댓글 수정 **/
    @PutMapping("/comment/{commentId}")
    @ApiOperation(value = "공유풀코스 댓글 수정", notes = "공유 풀코스 댓글을 수정합니다. 댓글내용, 공유풀코스식별자(sharedFcId), header : access-token 필요")
    public ResponseEntity<BaseResponseBody> updateComment(@PathVariable Long commentId, @RequestBody SharedFCCommentReq sharedFCCommentReq) {

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();

        sharedFCCommentService.updateFCComment(commentId, sharedFCCommentReq, user.get());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "댓글 수정"));

    }

    /** 풀코스 댓글 삭제 **/
    @ApiOperation(value = "공유풀코스 댓글 삭제", notes = "공유 풀코스 댓글을 삭제합니다. 댓글식별자(commentId), header : access-token 필요")
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<BaseResponseBody> updateComment(@PathVariable Long commentId) {

        Optional<User> user = userRepository.findByEmail("1");
        if (!user.isPresent()) throw new UserNotFoundException();

        if(sharedFCCommentService.deleteFCComment(commentId,user.get())==1)
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", "댓글 삭제"));
        else throw new ServerError("댓글 삭제 중 오류 발생");
    }
    /** 풀코스 댓글 조회 **/
    @GetMapping("/comment/{sharedFcId}")
    @ApiOperation(value = "공유풀코스 댓글 조회", notes = "공유 풀코스 댓글을 모두 불러옵니다. 공유 풀코스 식별자(sharedFcId) 필요")
    public ResponseEntity<BaseResponseBody> listComment(@PathVariable Long sharedFcId){
        List<SharedFCCommentRes> commentResList = sharedFCCommentService.listFCComment(sharedFcId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", commentResList));
    }

}

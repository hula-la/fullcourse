package com.ssafy.fullcourse.domain.sharefullcourse.controller;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCCommentService;
import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCListService;
import com.ssafy.fullcourse.domain.sharefullcourse.application.SharedFCService;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.*;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.error.ServerError;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Api(value="Share Fullcourse", tags={"share fullcourse"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/share")
@RequiredArgsConstructor
public class SharedFullCourseController {

    private final SharedFCService sharedFCService;
    private final FullCourseRepository fullCourseRepository;
    private final SharedFCCommentService sharedFCCommentService;
    private final UserRepository userRepository;
    private final SharedFCListService sharedFCListService;

    /** 공유 풀코스 등록 **/
    @PostMapping("/fullcourse")
    @ApiOperation(value = "공유풀코스 등록", notes = "풀코스 id, 제목, 상세내용, 썸네일 이미지, 태그 리스트를 입력받아 공유 풀코스를 동록합니다.")
    public ResponseEntity<BaseResponseBody> registSharedFC(@AuthenticationPrincipal String email, @RequestBody SharedFCReq sharedFCReq) {

        FullCourse fullCourse = fullCourseRepository.findByFcId(sharedFCReq.getFcId());

        SharedFCDto sharedFCDto = SharedFCDto.of(fullCourse, sharedFCReq);

        Optional<User> opt = userRepository.findByEmail(email);
        User user = opt.orElseThrow(()-> new UserNotFoundException());

        List<SharedFCTagDto> tags = sharedFCReq.getTags().stream()
                .map(tag -> SharedFCTagDto.builder().tagContent(tag).build())
                .collect(Collectors.toList());

        // 공유 풀코스 등록
        Long sharedFcId = sharedFCService.createSharedFC(sharedFCDto, tags, user);
        if (sharedFcId != null) {
            HashMap<String,Long> res = new HashMap<>();
            res.put("sharedFcId",sharedFcId);
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
            @PathVariable  Long sharedFcId,
            @RequestParam String email
            ) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCService.detailSharedFC(sharedFcId, email)));

    }

    /** 공유 풀코스 상세 수정 **/
    @PutMapping("/fullcourse/{sharedFcId}")
    @ApiOperation(value = "공유풀코스 상세 수정", notes = "공유 풀코스의 상세 내용(제목, 내용, 썸네일, 태그)을 수정합니다")
    public ResponseEntity<BaseResponseBody> updateSharedFC(
            @PathVariable Long sharedFcId,
            @RequestBody SharedFCReq sharedFCReq,
            @RequestParam String email) {

        FullCourse fullCourse = fullCourseRepository.findByFcId(sharedFCReq.getFcId());

        SharedFCDto sharedFCDto  = SharedFCDto.of(fullCourse, sharedFCReq);

        List<SharedFCTagDto> tags = sharedFCReq.getTags().stream()
                .map(tag->SharedFCTagDto.builder().tagContent(tag).sharedFcId(sharedFcId).build())
                .collect(Collectors.toList());

        // 공유 풀코스 상세 수정
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCService.updateSharedFC(sharedFCDto, tags, sharedFcId, email)));

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
    public ResponseEntity<BaseResponseBody> likeSharedFC(@AuthenticationPrincipal String email,@PathVariable Long sharedFcId){
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCService.likeSharedFC(sharedFcId,email)));
    }

    /** 풀코스 댓글 등록 **/
    @PostMapping("/comment")
    @ApiOperation(value = "공유풀코스 댓글 등록", notes = "공유 풀코스 댓글을 등록합니다. 댓글내용, 공유풀코스식별자(sharedFcId), header : access-token 필요")
    public ResponseEntity<BaseResponseBody> registComment(@AuthenticationPrincipal String email,@RequestBody SharedFCCommentReq sharedFCCommentReq) {

        int result =sharedFCCommentService.createFCComment(sharedFCCommentReq,email);
        if(result==1){
            List<SharedFCCommentRes> commentList = sharedFCCommentService.listFCComment(sharedFCCommentReq.getSharedFcId());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", commentList));
        }else throw new ServerError("댓글 등록 중 오류 발생");
    }

    /** 풀코스 댓글 수정 **/
    @PutMapping("/comment/{commentId}")
    @ApiOperation(value = "공유풀코스 댓글 수정", notes = "공유 풀코스 댓글을 수정합니다. 댓글내용, 공유풀코스식별자(sharedFcId), header : access-token 필요")
    public ResponseEntity<BaseResponseBody> updateComment(@AuthenticationPrincipal String email, @PathVariable Long commentId, @RequestBody SharedFCCommentReq sharedFCCommentReq) {

        sharedFCCommentService.updateFCComment(commentId, sharedFCCommentReq, email);

        List<SharedFCCommentRes> commentList = sharedFCCommentService.listFCComment(sharedFCCommentReq.getSharedFcId());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", commentList));

    }

    /** 풀코스 댓글 삭제 **/
    @ApiOperation(value = "공유풀코스 댓글 삭제", notes = "공유 풀코스 댓글을 삭제합니다. 댓글식별자(commentId), header : access-token 필요")
    @DeleteMapping("/comment/{sharedFcId}/{commentId}")
    public ResponseEntity<BaseResponseBody> updateComment(@AuthenticationPrincipal String email,
                                                          @PathVariable Long sharedFcId,
                                                          @PathVariable Long commentId) {

        if(sharedFCCommentService.deleteFCComment(commentId,email)==1){
            List<SharedFCCommentRes> commentList = sharedFCCommentService.listFCComment(sharedFcId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", commentList));
        }
        else throw new ServerError("댓글 삭제 중 오류 발생");
    }
    /** 풀코스 댓글 조회 **/
    @GetMapping("/comment/{sharedFcId}")
    @ApiOperation(value = "공유풀코스 댓글 조회", notes = "공유 풀코스 댓글을 모두 불러옵니다. 공유 풀코스 식별자(sharedFcId) 필요")
    public ResponseEntity<BaseResponseBody> listComment(@PathVariable Long sharedFcId){
        List<SharedFCCommentRes> commentResList = sharedFCCommentService.listFCComment(sharedFcId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", commentResList));
    }

    // 풀코스 리스트 조회
    @GetMapping("/fullcourse")
    public ResponseEntity<BaseResponseBody> getSharedFCList(String email, String keyword, Pageable pageable) {
        Page<SharedFCListDto> sharedFCList = sharedFCListService.getSharedFCList(email,keyword,pageable);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCList));
    }

    // 찜한 풀코스 리스트 조회
    @GetMapping("/fullcourse/like")
    public ResponseEntity<BaseResponseBody> getSharedFCLikeList(@AuthenticationPrincipal String email, String keyword, Pageable pageable) {
//        String email = ((org.springframework.security.core.userdetails.User)authentication.getPrincipal()).getUsername();
        Page<SharedFCListDto> sharedFCLikeList = sharedFCListService.getSharedFCLikeList(email, keyword,pageable);

        if(sharedFCLikeList == null) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fail", null));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCLikeList));
    }

    // 공유 풀코스 태그 조회
//    @PostMapping("/fullcourse/tag")
//    public ResponseEntity<BaseResponseBody> getSharedFCByTags(@RequestBody List<String> tags, Pageable pageable){
//        List<SharedFCGetRes> sharedFCList = sharedFCListService.searchByTags(tags, pageable);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCList));
//    }

    // 공유 풀코스 조건(태그, 날짜) 검색
    @PostMapping("/fullcourse/search")
    public ResponseEntity<BaseResponseBody> getSharedFCByTagAndDays(@RequestBody SharedFCSearchReq sharedFCSearchReq,
                                                                    Pageable pageable){
        Slice<SharedFCListDto> sharedFCList = sharedFCListService.searchByTagAndDay(sharedFCSearchReq.getTags(),sharedFCSearchReq.getDays(),pageable);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", sharedFCList));
    }

}

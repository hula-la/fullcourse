package com.ssafy.fullcourse.domain.fullcourse.api;

import com.ssafy.fullcourse.domain.fullcourse.application.FullCourseService;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCoursePostReq;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseVisitConfirmReq;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Api(value = "풀코스 API", tags = {"fullcourse"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/fullcourse")
@RequiredArgsConstructor
public class FullCourseController {

    private final FullCourseService fullCourseService;

    @PostMapping
    @ApiOperation(value = "풀코스 등록", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> registerFullCourse(@AuthenticationPrincipal String email,
                                                               @RequestBody FullCoursePostReq fullCoursePostReq) {

        Long fcId = fullCourseService.createFullCourse(email, fullCoursePostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fcId));
    }

    @GetMapping("/{fcId}")
    @ApiOperation(value = "풀코스 조회", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> findFullCourse(@PathVariable Long fcId) {

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.getFullCourseDetailById(fcId)));
    }

    @GetMapping("/my")
    @ApiOperation(value = "나의 풀코스 조회", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> findMyFullCourse(@AuthenticationPrincipal String email,
                                                           Pageable pageable) {

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.getFullCourse(email,pageable)));
    }

    @DeleteMapping("/{fcId}")
    @ApiOperation(value = "풀코스 삭제", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> deleteFullCourse(@PathVariable Long fcId) {

        fullCourseService.deleteFullCourse(fcId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", "삭제"));
    }

    @PutMapping("/{fcId}")
    @ApiOperation(value = "풀코스 업데이트", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> updateFullCourse(@PathVariable Long fcId,
                                                             @AuthenticationPrincipal String email,
                                                             @RequestBody FullCoursePostReq fullCoursePostReq) {

        Long newFcId = fullCourseService.updateFullCourse(email,fcId,fullCoursePostReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", newFcId));
    }

    @PutMapping("/visitconfirm")
    @ApiOperation(value = "풀코스 장소 방문인증")
    public ResponseEntity<BaseResponseBody> visitConfirm(@RequestBody FullCourseVisitConfirmReq fullCourseVisitConfirmReq){
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success", fullCourseService.confirmVisit(fullCourseVisitConfirmReq)));
    }

}

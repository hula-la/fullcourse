package com.ssafy.fullcourse.domain.fullcourse.api;

import com.drew.imaging.ImageProcessingException;
import com.ssafy.fullcourse.domain.fullcourse.application.FullCourseService;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCoursePostReq;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseVisitConfirmReq;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "풀코스 API", tags = {"fullcourse"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
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
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.getFullCourse(email, pageable)));
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

        Long newFcId = fullCourseService.updateFullCourse(email, fcId, fullCoursePostReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", newFcId));
    }

    @PutMapping("/visitconfirm")
    @ApiOperation(value = "풀코스 장소 방문인증")
    public ResponseEntity<BaseResponseBody> visitConfirm(@RequestBody FullCourseVisitConfirmReq fullCourseVisitConfirmReq) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.confirmVisit(fullCourseVisitConfirmReq)));
    }


    @PostMapping("/diary/{fcDetailId}")
    @ApiOperation(value="풀코스 장소 기록 등록")
    public ResponseEntity<BaseResponseBody> registerDiary(@ApiParam(value="풀코스 *디테일* id", required = true)@PathVariable Long fcDetailId,
                                                          @RequestPart MultipartFile img,
                                                          @RequestPart String content) throws ImageProcessingException, IOException {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.createFCdiary(img,content,fcDetailId)));
    }

    @PutMapping("/diary/{fcDairyId}")
    @ApiOperation(value="풀코스 장소 기록 수정")
    public ResponseEntity<BaseResponseBody> updateDiary(@ApiParam(value="풀코스 *다이어리* id", required = true) @PathVariable Long fcDairyId,
                                                          @RequestPart MultipartFile img,
                                                          @RequestPart String content){
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.updateFCdiary(img,content,fcDairyId)));
    }

    @GetMapping("/diary/{fcDetailId}")
    @ApiOperation(value="풀코스 장소 기록 조회")
    public ResponseEntity<BaseResponseBody> getDiary(@ApiParam(value="풀코스 *디테일* id", required = true) @PathVariable Long fcDetailId){
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", fullCourseService.getFCDiary(fcDetailId)));
    }

    @DeleteMapping("/diary/{fcDairyId}")
    @ApiOperation(value="풀코스 장소 기록 삭제")
    public ResponseEntity<BaseResponseBody> deleteDiary(@ApiParam(value="풀코스 *다이어리* id", required = true) @PathVariable Long fcDairyId){
        fullCourseService.deleteFCDiary(fcDairyId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success","풀코스 장소 기록 삭제 완료"));
    }
}


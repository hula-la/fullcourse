package com.ssafy.fullcourse.domain.sharefullcourse.controller;

import com.ssafy.fullcourse.global.model.BaseResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class SharedFullCourseController {
    @PostMapping("/")
    public ResponseEntity<BaseResponseBody> regist() {

//        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fail", null));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));

    }
}

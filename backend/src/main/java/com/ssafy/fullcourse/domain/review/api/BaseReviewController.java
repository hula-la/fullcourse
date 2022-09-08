package com.ssafy.fullcourse.domain.review.api;

import com.ssafy.fullcourse.domain.review.application.BaseReviewService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "리뷰 API", tags = {"review"})
@RestController
@RequestMapping("/review")
public class BaseReviewController {

    @Autowired
    BaseReviewService baseReviewService;


}

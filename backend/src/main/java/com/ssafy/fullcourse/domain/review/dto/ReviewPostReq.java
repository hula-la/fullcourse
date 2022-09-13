package com.ssafy.fullcourse.domain.review.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@ApiModel("ReviewPostRequest")
public class ReviewPostReq {

    @ApiModelProperty(name="리뷰 내용", example="좋아요")
    String content;

    @ApiModelProperty(name="평점", example="3")
    Float score;
}

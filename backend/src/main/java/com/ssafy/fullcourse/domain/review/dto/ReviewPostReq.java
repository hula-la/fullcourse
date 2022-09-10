package com.ssafy.fullcourse.domain.review.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@ApiModel("ReviewPostRequest")
public class ReviewPostReq {

//    @NotBlank(message="리뷰 식별자는 필수값입니다.")
//    @Pattern(regexp = "(?=[a-zA-Z]+[0-9a-zA-Z]).{4,16}", message = "아이디는 4~16자 영문 대소문자 또는 숫자를 사용하세요. 첫글자는 알파벳이어야 합니다.")
//    @ApiModelProperty(name="리뷰 ID", example="1")
//    Long reviewId;

    @ApiModelProperty(name="장소 ID", example="1")
    Long placeId;

    @ApiModelProperty(name="리뷰 내용", example="좋아요")
    String content;

    @ApiModelProperty(name="평점", example="3")
    Float score;
}

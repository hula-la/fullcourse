package com.ssafy.fullcourse.domain.review.api;

import com.ssafy.fullcourse.domain.review.application.BaseReviewService;
import com.ssafy.fullcourse.global.model.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "리뷰 API", tags = {"review"})
@RestController
@RequestMapping("/review")
public class BaseReviewController {

    @Autowired
    BaseReviewService baseReviewService;

    @GetMapping("/{type}/list")
    @ApiOperation(value = "리뷰 목록 조회", notes = "type")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> listAll(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);


        Cart cart = cartService.findCartByUser(user.getUserId());
        if(cart ==null || cart.getCount()==0){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
        }
        List<CartLecGetRes> lectures = cartService.findCartItemsByCartId(user.getUserId());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectures));

    }


}

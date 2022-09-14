package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCCommentReq;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCCommentRes;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCComment;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.UserNotMathException;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCCommentRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SharedFCCommentService {

    @Autowired
    SharedFCCommentRepository sharedFCCommentRepository;
    @Autowired
    SharedFCRepository sharedFCRepository;

    // 공유 풀코스 댓글 전체 조회
    public List<SharedFCCommentRes> listFCComment(Long sharedFcId){
        List<SharedFCComment> sharedFCComment = sharedFCCommentRepository.findAllBySharedFullCourse_SharedFcId(sharedFcId);
        for(SharedFCComment comment : sharedFCComment)
            System.out.println(comment.getComment());
        List<SharedFCCommentRes> commentResList=sharedFCComment.stream()
                .map(comment->SharedFCCommentRes.builder()
                        .commentId(comment.getFcCommentId())
                        .nickname(comment.getUser().getNickname())
                        .comment(comment.getComment()).build()).collect(Collectors.toList());
        return commentResList;
    }

    // 공유 풀코스 댓글 등록
    public boolean createFCComment(SharedFCCommentReq sharedFCCommentReq, User user){

        SharedFullCourse sharedFullCourse = sharedFCRepository.findBySharedFcId(sharedFCCommentReq.getSharedFcId());

        if(sharedFullCourse == null) throw new NullPointerException(); //공유 풀코스가 없을 경우

        SharedFCComment sharedFCComment = SharedFCComment.builder()
                .comment(sharedFCCommentReq.getComment())
                .sharedFullCourse(sharedFullCourse)
                .user(user).build();

        SharedFCComment saved = sharedFCCommentRepository.save(sharedFCComment);
        if(saved == null) return false;
        sharedFCRepository.plusCommentCnt(saved.getSharedFullCourse().getSharedFcId());
        return true;

    }

    //공유 풀코스 댓글 수정
    public boolean updateFCComment(Long commentId, SharedFCCommentReq sharedFCCommentReq, User user){
        SharedFCComment saved = sharedFCCommentRepository.findByFcCommentId(commentId);
        if(saved == null) throw new NullPointerException();
        if(saved.getUser().getUserId() != user.getUserId()) throw new UserNotMathException("댓글단 사용자만 수정 가능");

        SharedFCComment sharedFCComment = SharedFCComment.builder()
                .fcCommentId(saved.getFcCommentId())
                .comment(sharedFCCommentReq.getComment())
                .sharedFullCourse(saved.getSharedFullCourse())
                .user(saved.getUser()).build();

        SharedFCComment updated = sharedFCCommentRepository.save(sharedFCComment);
        if(updated == null) return false;
        return true;

    }

    // 공유 풀코스 댓글 삭제
    public void deleteFCComment(Long commentId, User user){
        SharedFCComment saved = sharedFCCommentRepository.findByFcCommentId(commentId);
        if(saved == null) throw new NullPointerException();
        if(saved.getUser().getUserId() != user.getUserId()) throw new UserNotMathException("댓글단 사용자만 삭제 가능");

        sharedFCCommentRepository.delete(saved);
        sharedFCRepository.minusCommentCnt(saved.getSharedFullCourse().getSharedFcId());

    }

}

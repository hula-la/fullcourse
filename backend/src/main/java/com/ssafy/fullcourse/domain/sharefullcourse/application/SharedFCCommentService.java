package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCCommentReq;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCCommentRes;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCComment;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.CommentNotFoundException;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.SharedFCNotFoundException;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.UserNotMatchException;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCCommentRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.error.ServerError;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SharedFCCommentService {

    private final SharedFCCommentRepository sharedFCCommentRepository;
    private final SharedFCRepository sharedFCRepository;

    private final UserRepository userRepository;

    // 공유 풀코스 댓글 전체 조회
    public List<SharedFCCommentRes> listFCComment(Long sharedFcId){
        List<SharedFCComment> commentList = sharedFCCommentRepository.findAllBySharedFullCourse_SharedFcId(sharedFcId);

        List<SharedFCCommentRes> commentResList=commentList.stream()
                .map(comment->SharedFCCommentRes.of(comment)).collect(Collectors.toList());

        return commentResList;
    }

    // 공유 풀코스 댓글 등록
    @Transactional
    public int createFCComment(SharedFCCommentReq sharedFCCommentReq, String email){

        SharedFullCourse sharedFullCourse = sharedFCRepository.findBySharedFcId(sharedFCCommentReq.getSharedFcId());

        if(sharedFullCourse == null) throw new SharedFCNotFoundException();

        SharedFCComment sharedFCComment = SharedFCComment.builder()
                .comment(sharedFCCommentReq.getComment())
                .sharedFullCourse(sharedFullCourse)
                .user(userRepository.findByEmail(email).get()).build();

        SharedFCComment saved = sharedFCCommentRepository.save(sharedFCComment);
        if(saved == null) throw new ServerError("댓글 등록 중 에러 발생");
        return sharedFCRepository.updateCommentCnt(saved.getSharedFullCourse().getSharedFcId(),1);


    }

    //공유 풀코스 댓글 수정
    @Transactional
    public void updateFCComment(Long commentId, SharedFCCommentReq sharedFCCommentReq, String email){
        SharedFCComment saved = sharedFCCommentRepository.findByFcCommentId(commentId);
        if(saved == null) throw new CommentNotFoundException();
        if(saved.getUser().getEmail() != email) throw new UserNotMatchException("댓글단 사용자만 수정 가능");

        SharedFCComment sharedFCComment = SharedFCComment.builder()
                .fcCommentId(saved.getFcCommentId())
                .comment(sharedFCCommentReq.getComment())
                .sharedFullCourse(saved.getSharedFullCourse())
                .user(saved.getUser()).build();

        SharedFCComment updated = sharedFCCommentRepository.save(sharedFCComment);
        if(updated == null)throw new ServerError("댓글 등록 중 에러 발생");


    }

    // 공유 풀코스 댓글 삭제
    @Transactional
    public int deleteFCComment(Long commentId, String email){
        SharedFCComment saved = sharedFCCommentRepository.findByFcCommentId(commentId);
        if(saved == null) throw new SharedFCNotFoundException();
        if(saved.getUser().getEmail() != email) throw new UserNotMatchException("댓글단 사용자만 삭제 가능");

        sharedFCCommentRepository.delete(saved);
        return sharedFCRepository.updateCommentCnt(saved.getSharedFullCourse().getSharedFcId(),-1);

    }

}

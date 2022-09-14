package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.*;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.mapper.SharedFCMapper;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCLikeRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCTagRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class SharedFCServiceImpl implements SharedFCService{

    @Autowired
    SharedFCRepository sharedFCRepository;
    @Autowired
    SharedFCTagRepository sharedFCTagRepository;
    @Autowired
    SharedFCLikeRepository sharedFCLikeRepository;

    // 공유 풀코스 생성
    @Override
    @Transactional
    public Long createSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findByFullCourseFcId(sharedFCDto.getFullCourse().getFcId()));
        if(!opt.isPresent()){ // 새로 생성
            SharedFullCourse sharedFullCourse = SharedFCMapper.MAPPER.toEntity(sharedFCDto);
            for(SharedFCTagDto tag : tags){
                SharedFCTag sharedFCTag = SharedFCTag.builder().tagContent(tag.getTagContent()).sharedFullCourse(sharedFullCourse).build();
                sharedFullCourse.getSharedFCTags().add(sharedFCTag);
                sharedFCTag.setSharedFullCourse(sharedFullCourse);
            }
            System.out.println(sharedFullCourse.getSharedFCTags());
            SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);
            if(saved != null){
                return saved.getSharedFcId(); // 생성 성공
            }else{
                return null; // 생성 중 오류
            }
        }
        else{
            return null; // 이미 등록된 풀코스
        }
    }

    // 공유 풀코스 상세 조회
    @Override
    @Transactional
    public SharedFCGetRes detailSharedFC(Long sharedFcId) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFcId));
        SharedFullCourse sharedFullCourse = opt.orElseThrow(NullPointerException::new);
        SharedFCGetRes res = SharedFCGetRes.builder()
                .fcId(sharedFullCourse.getFullCourse().getFcId())
                .sharedFcId(sharedFullCourse.getSharedFcId())
                .detail(sharedFullCourse.getDetail())
                .title(sharedFullCourse.getTitle())
                .regDate(sharedFullCourse.getRegDate())
                .likeCnt(sharedFullCourse.getLikeCnt())
                .commentCnt(sharedFullCourse.getCommentCnt())
                .viewCnt(sharedFullCourse.getViewCnt())
                .sharedFCTags(sharedFullCourse.getSharedFCTags().stream().map(tag->tag.getTagContent()).collect(Collectors.toList()))
                .sharedFCComments(sharedFullCourse.getSharedFCComments().stream().map(
                        comment-> SharedFCCommentRes.builder()
                                .commentId(comment.getFcCommentId())
                                .nickname(comment.getUser().getNickname())
                                .comment(comment.getComment()).build()).collect(Collectors.toList()))
                .thumbnail(sharedFullCourse.getThumbnail()).build();
        sharedFCRepository.plusViewCnt(sharedFcId);
        return res;
    }

    // 공유 풀코스 상세 수정
    @Override
    @Transactional
    public Long updateSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFCDto.getSharedFcId()));
        if(opt.isPresent()){ // 수정
            SharedFullCourse now = opt.get();
            for(int i = 0 ; i < now.getSharedFCTags().size();i++){
                now.getSharedFCTags().remove(i);
            }
            SharedFullCourse sharedFullCourse = SharedFullCourse.builder()
                    .sharedFcId(sharedFCDto.getSharedFcId())
                    .detail(sharedFCDto.getDetail())
                    .title(sharedFCDto.getTitle())
                    .regDate(now.getRegDate())
                    .likeCnt(now.getLikeCnt())
                    .commentCnt(now.getCommentCnt())
                    .viewCnt(now.getViewCnt())
                    .sharedFCTags(new ArrayList<>())
                    .thumbnail(now.getThumbnail())
                    .fullCourse(now.getFullCourse())
                    .build();

            for(SharedFCTagDto tag : tags){
                SharedFCTag sharedFCTag = SharedFCTag.builder().tagContent(tag.getTagContent()).sharedFullCourse(sharedFullCourse).build();
                sharedFullCourse.getSharedFCTags().add(sharedFCTag);
                sharedFCTag.setSharedFullCourse(sharedFullCourse);
            }
            SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);
            if(saved != null){
                return saved.getSharedFcId(); // 수정 성공
            }else{
                return null; // 수정 중 오류
            }
        }else{
            return null; // 등록되지 않은 공유 풀코스
        }

    }

    // 공유 풀코스 삭제
    @Override
    @Transactional
    public boolean deleteSharedFC(Long sharedFdId) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFdId));
        if(opt.isPresent()){
            sharedFCRepository.delete(SharedFullCourse.builder().sharedFcId(sharedFdId).build());
            return true;
        }
        return false;
    }


    @Override
    @Transactional
    public int likeSharedFC(Long sharedId, User user) {

        SharedFullCourse sharedFullCourse = sharedFCRepository.findBySharedFcId(sharedId);
        if(sharedFullCourse == null) throw new NullPointerException();
        // 좋아요 확인
        Optional<SharedFCLike> opt = Optional.ofNullable(sharedFCLikeRepository.findByUser_UserIdAndSharedFullCourse_SharedFcId(user.getUserId(), sharedId));

        if(opt.isPresent()){ // 좋아요 취소
            sharedFCLikeRepository.delete(opt.get());
            sharedFCRepository.minusLikeCnt(sharedId);
            return 0;
        }else{ // 좋아요

            sharedFCLikeRepository.save(SharedFCLike.builder()
                    .user(user)
                    .sharedFullCourse(sharedFullCourse).build());
            sharedFCRepository.plusLikeCnt(sharedId);
            return 1;
        }

    }
}

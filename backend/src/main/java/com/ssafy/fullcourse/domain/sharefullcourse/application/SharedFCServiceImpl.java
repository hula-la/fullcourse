package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCGetRes;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCPutReq;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.mapper.SharedFCMapper;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

    // 공유 풀코스 생성
    @Override
    public Long createSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findByFullCourseFcId(sharedFCDto.getFullCourse().getFcId()));
        if(!opt.isPresent()){ // 새로 생성
            SharedFullCourse sharedFullCourse = SharedFCMapper.MAPPER.toEntity(sharedFCDto);
            for(SharedFCTagDto tag : tags){
                SharedFCTag sharedFCTag = SharedFCTag.builder().tagContent(tag.getTagContent()).sharedFullCourse(sharedFullCourse).build();
                sharedFullCourse.getSharedFCTags().add(sharedFCTag);
                sharedFCTag.setSharedFullCourse(sharedFullCourse);
            }
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
                .thumbnail(sharedFullCourse.getThumbnail()).build();

        return res;
    }

    // 공유 풀코스 상세 수정
    @Override
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
    public boolean deleteSharedFC(Long sharedFdId) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFdId));
        if(opt.isPresent()){
            sharedFCRepository.delete(SharedFullCourse.builder().sharedFcId(sharedFdId).build());
            return true;
        }
        return false;
    }

}

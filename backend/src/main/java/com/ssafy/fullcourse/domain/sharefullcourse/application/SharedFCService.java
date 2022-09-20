package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCGetRes;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.AlreadyExistException;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.SharedFCNotFoundException;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCLikeRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCTagRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.global.error.ServerError;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SharedFCService {

    private final SharedFCRepository sharedFCRepository;
    private final SharedFCTagRepository sharedFCTagRepository;
    private final SharedFCLikeRepository sharedFCLikeRepository;

    // 공유 풀코스 생성
    @Transactional
    public Long createSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findByFullCourseFcId(sharedFCDto.getFullCourse().getFcId()));

        if(opt.isPresent()) throw new AlreadyExistException("이미 공유한 풀코스 입니다.");

        SharedFullCourse sharedFullCourse = SharedFullCourse.of(sharedFCDto);

        tagDtoE(tags,sharedFullCourse);

        SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);
        if(saved != null) return saved.getSharedFcId(); // 생성 성공
        else throw new ServerError("공유 풀코스 생성 중 알 수 없는 에러가 발생했습니다.");

    }

    // 공유 풀코스 상세 조회
    @Transactional
    public SharedFCGetRes detailSharedFC(Long sharedFcId) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFcId));
        SharedFullCourse sharedFullCourse = opt.orElseThrow(()->new SharedFCNotFoundException());
        SharedFCGetRes res = SharedFCGetRes.of(sharedFullCourse);
        sharedFCRepository.updateViewCnt(sharedFcId);
        return res;
    }

    // 공유 풀코스 상세 수정
    @Transactional
    public Long updateSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags, Long sharedFcId) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFcId));

        SharedFullCourse now = opt.orElseThrow(()->new SharedFCNotFoundException());
        for(int i = 0 ; i < now.getSharedFCTags().size();i++) {
            System.out.println(now.getSharedFCTags().get(i).getTagContent());
            now.getSharedFCTags().remove(i);
        }
        SharedFullCourse sharedFullCourse = SharedFullCourse.sharedFCUpdate(sharedFCDto,now, sharedFcId);

        tagDtoE(tags,sharedFullCourse);

        SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);

        if(saved != null) return saved.getSharedFcId(); // 수정 성공
        else throw new ServerError("상세 풀코스 수정 중 오류가 발생했습니다."); // 수정 중 오류

    }

    // 공유 풀코스 삭제
    @Transactional
    public void deleteSharedFC(Long sharedFdId) {
        SharedFullCourse saved =sharedFCRepository.findBySharedFcId(sharedFdId);

        if(saved == null) throw new SharedFCNotFoundException();

        sharedFCRepository.delete(SharedFullCourse.builder().sharedFcId(sharedFdId).build());

    }


    // 공유 풀코스 좋아요
    @Transactional
    public int likeSharedFC(Long sharedId, User user) {

        SharedFullCourse sharedFullCourse = sharedFCRepository.findBySharedFcId(sharedId);
        if(sharedFullCourse == null) throw new SharedFCNotFoundException();
        // 좋아요 확인
        Optional<SharedFCLike> opt = Optional.ofNullable(sharedFCLikeRepository.findByUser_UserIdAndSharedFullCourse_SharedFcId(user.getUserId(), sharedId));

        if(opt.isPresent()){ // 좋아요 취소
            sharedFCLikeRepository.delete(opt.get());
            sharedFCRepository.updateLikeCnt(sharedId, -1);
            return 0;
        }else{ // 좋아요

            sharedFCLikeRepository.save(SharedFCLike.builder()
                    .user(user)
                    .sharedFullCourse(sharedFullCourse).build());
            sharedFCRepository.updateLikeCnt(sharedId, 1);
            return 1;
        }
    }

    // 공유된 풀코스인지 확인
    public boolean isShared(Long fcId){
        SharedFullCourse sharedFullCourse = sharedFCRepository.findByFullCourseFcId(fcId);
        if(sharedFullCourse == null ) return false;
        return true;
    }

   public void tagDtoE(List<SharedFCTagDto> tags, SharedFullCourse sharedFullCourse){
        for(SharedFCTagDto tag : tags) {
            System.out.println("?"+tag.getTagContent());
            SharedFCTag sharedFCTag = SharedFCTag.of(tag,sharedFullCourse);
            sharedFullCourse.getSharedFCTags().add(sharedFCTag);
            sharedFCTag.setSharedFullCourse(sharedFullCourse);
        }
    }

}

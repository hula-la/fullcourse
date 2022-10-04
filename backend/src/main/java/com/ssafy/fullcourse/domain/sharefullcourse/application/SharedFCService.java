package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCGetRes;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.AlreadyExistException;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.SharedFCNotFoundException;
import com.ssafy.fullcourse.domain.sharefullcourse.exception.UserNotMatchException;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCLikeRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCTagRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final FullCourseRepository fullCourseRepository;

    // 공유 풀코스 생성
    @Transactional
    public Long createSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags, String email) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findByFullCourseFcId(sharedFCDto.getFcId()));
        if(opt.isPresent()) throw new AlreadyExistException("이미 공유한 풀코스 입니다.");

        FullCourse fullCourse = fullCourseRepository.findByFcId(sharedFCDto.getFcId());
        User user = userRepository.findByEmail(email).get();

        SharedFullCourse sharedFullCourse = SharedFullCourse.of(sharedFCDto, fullCourse, user);
        tagDtoE(tags,sharedFullCourse);

        SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);
        if(saved != null) {
            fullCourse.updateShared(true);
            return saved.getSharedFcId(); // 생성 성공
        }
        else throw new ServerError("공유 풀코스 생성 중 알 수 없는 에러가 발생했습니다.");

    }

    // 공유 풀코스 상세 조회
    @Transactional
    public SharedFCGetRes detailSharedFC(Long sharedFcId, String email) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFcId));
        SharedFullCourse sharedFullCourse = opt.orElseThrow(()->new SharedFCNotFoundException());

        Boolean isLike = false;
        if(sharedFCLikeRepository.findByUser_EmailAndSharedFullCourse(email,sharedFullCourse).isPresent()){
            isLike = true;
        }

        SharedFCGetRes res = SharedFCGetRes.of(sharedFullCourse, isLike);
        sharedFCRepository.updateViewCnt(sharedFcId);
        return res;
    }

    // 공유 풀코스 상세 수정
    @Transactional
    public SharedFCGetRes updateSharedFC(SharedFCDto sharedFCDto, List<SharedFCTagDto> tags, Long sharedFcId, String email) {
        Optional<SharedFullCourse> opt = Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFcId));
        SharedFullCourse now = opt.orElseThrow(()->new SharedFCNotFoundException());
        FullCourse fullCourse = fullCourseRepository.findByFcId(sharedFCDto.getFcId());
        for(int i = 0 ; i < now.getSharedFCTags().size();i++) {
            now.getSharedFCTags().remove(i);
        }

        SharedFullCourse sharedFullCourse = SharedFullCourse.sharedFCUpdate(sharedFCDto,now, fullCourse, sharedFcId);

        Boolean isLike = false;
        if(sharedFCLikeRepository.findByUser_EmailAndSharedFullCourse(email,sharedFullCourse).isPresent()){
            isLike = true;
        }

        tagDtoE(tags,sharedFullCourse);

        SharedFullCourse saved = sharedFCRepository.save(sharedFullCourse);

        if(saved != null) return SharedFCGetRes.of(saved, isLike); // 수정 성공
        else throw new ServerError("상세 풀코스 수정 중 오류가 발생했습니다."); // 수정 중 오류

    }

    // 공유 풀코스 삭제
    @Transactional
    public void deleteSharedFC(Long sharedFdId,String email) {
        SharedFullCourse saved =Optional.ofNullable(sharedFCRepository.findBySharedFcId(sharedFdId)).orElseThrow(
                ()->new SharedFCNotFoundException("등록되지 않은 공유풀코스 입니다.")
        );
        if(!email.equals(saved.getUser().getEmail())) throw new UserNotMatchException("권한이 없습니다.");


        FullCourse fullCourse = saved.getFullCourse();
        fullCourse.updateShared(false);
        fullCourseRepository.save(fullCourse);
        if(saved == null) throw new SharedFCNotFoundException();
        sharedFCRepository.delete(saved);
    }

    // 공유 풀코스 좋아요
    @Transactional
    public boolean likeSharedFC(Long sharedId, String email) {
        System.out.println(email);

        SharedFullCourse sharedFullCourse = sharedFCRepository.findBySharedFcId(sharedId);
        if(sharedFullCourse == null) throw new SharedFCNotFoundException();
        // 좋아요 확인
        Optional<SharedFCLike> opt = sharedFCLikeRepository.findByUser_EmailAndSharedFullCourse(email, sharedFullCourse);

        if(opt.isPresent()){ // 좋아요 취소
            sharedFCLikeRepository.delete(opt.get());
            sharedFCRepository.updateLikeCnt(sharedId, -1);
            return false;
        }else{ // 좋아요
            sharedFCLikeRepository.save(SharedFCLike.builder()
                    .user(userRepository.findByEmail(email).orElseThrow(()->new UserNotFoundException()))
                    .sharedFullCourse(sharedFullCourse).build());
            sharedFCRepository.updateLikeCnt(sharedId, 1);
            return true;
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
            SharedFCTag sharedFCTag = SharedFCTag.of(tag,sharedFullCourse);
            sharedFullCourse.getSharedFCTags().add(sharedFCTag);
            sharedFCTag.setSharedFullCourse(sharedFullCourse);
        }
    }

}

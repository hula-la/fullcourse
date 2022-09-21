package com.ssafy.fullcourse.domain.fullcourse.application;

import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseDetailPostReq;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCoursePostReq;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseRes;
import com.ssafy.fullcourse.domain.fullcourse.dto.FullCourseTotalRes;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDetail;
import com.ssafy.fullcourse.domain.fullcourse.exception.FullCourseNotFoundException;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseDetailRepository;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FullCourseServiceImpl implements FullCourseService{

    private final FullCourseRepository fullCourseRepository;

    private final FullCourseDetailRepository fullCourseDetailRepository;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public Long createFullCourse(String userId, FullCoursePostReq fullCoursePostReq) {
//        날짜 설정
//        LocalDate now = LocalDate.now();
        Date now = new Date();
        fullCoursePostReq.setRegDate(now);

        Optional<User> userOpt = userRepository.findByEmail(userId);


        if (!userOpt.isPresent()) throw new UserNotFoundException();

        // 풀코스에 저장
        FullCourse fullCourse = fullCourseRepository
                .save(fullCoursePostReq.toEntity(userOpt.get()));

        fullCoursePostReq.getPlaces().forEach((day, places)->{
            System.out.println(day+" "+places);
            places.forEach((detail)->createFullCourseDetail(day,fullCourse,detail));
        });

        return fullCourse.getFcId();
    }

    @Override
    public Long createFullCourseDetail(int day, FullCourse fullCourse,FullCourseDetailPostReq fcDetail) {
        return fullCourseDetailRepository
                .save(fcDetail.toEntity(fullCourse,day))
                .getFcDetailId();
    }



    @Override
    public Page<FullCourseRes> getFullCourse(Long fcId, Pageable pageable) {
        Page<FullCourse> fcs = fullCourseRepository.findByUser_UserId(fcId,pageable);
        return fcs.map(FullCourseRes::new);
    }

    @Override
    public FullCourseTotalRes getFullCourseDetailById(Long fcId) {
        Optional<FullCourse> fullCourseOpt = fullCourseRepository.findById(fcId);

        if (!fullCourseOpt.isPresent()) throw new FullCourseNotFoundException();

        FullCourse fullCourse = fullCourseOpt.get();
        List<FullCourseDetail> fullCourseList = fullCourseDetailRepository.findByFullCourse_FcIdOrderByDayAscCourseOrderAsc(fcId);

        HashMap<Integer,List<FullCourseDetailPostReq>> places = new HashMap<>();
        for(FullCourseDetail fcd:fullCourseList){
            if (!places.containsKey(fcd.getDay())) places.put(fcd.getDay(),new ArrayList<>());
            places.get(fcd.getDay())
                    .add(fcd.toDto());
        }

        return fullCourse.toDto(places);
    }

    @Override
    @Transactional
    public void deleteFullCourse(Long fcId) {
        fullCourseRepository.deleteById(fcId);
    }


    @Override
    @Transactional
    public Long updateFullCourse(String userId, Long fcId, FullCoursePostReq fullCoursePostReq) {
        deleteFullCourse(fcId);
        return createFullCourse(userId,fullCoursePostReq);
    }
}

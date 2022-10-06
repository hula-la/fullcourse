package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCListDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCSearchReq;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCLikeRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepositoryCustom;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.exception.UserNotFoundException;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SharedFCListService {

    private final SharedFCRepository sharedFCRepository;
    private final SharedFCLikeRepository sharedFCLikeRepository;
    private final SharedFCRepositoryCustom sharedFCRepositoryCustom;
    private final UserRepository userRepository;

    public Page<SharedFCListDto> getSharedFCList(String email, String keyword, Pageable pageable) {
        Page<SharedFullCourse> page;
        if (keyword==null) page=sharedFCRepository.findAll(pageable);
        else page=sharedFCRepository.findFCListByTitleContains(keyword, pageable);

        return page.map(share -> new SharedFCListDto(share,
                sharedFCLikeRepository.findByUser_EmailAndSharedFullCourse(email,share).isPresent(),
                share.getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }

    public List<SharedFCListDto> getSharedFCLikeList(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(!user.isPresent()) return null;
        User findUser = user.get();


        List<SharedFCLike> list = sharedFCLikeRepository.findFCLikeByUser(findUser);
        return list.stream().map(share->new SharedFCListDto(share.getSharedFullCourse(),share.getSharedFullCourse().getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList()))).collect(Collectors.toList());
//        return list.stream().map(share -> new SharedFCListDto(share.getSharedFullCourse(),
//                share.getSharedFullCourse().getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }

    //내 공유 풀코스 조회
    public List<SharedFCListDto> getSharedFCListByUser(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()->new UserNotFoundException());

        List<SharedFullCourse> list = sharedFCRepository.findByUser(user);
        return list.stream().map(share -> new SharedFCListDto(share,
                share.getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList()))).collect(Collectors.toList());
    }

    // 공유 풀코스 태그&날짜 조회
    public Page<SharedFCListDto> searchByTagAndDay(SharedFCSearchReq sharedFCSearchReq, Pageable pageable){

        List<String> places = new ArrayList<>();
        if(sharedFCSearchReq.getPlace().length()!=0){
            StringTokenizer st = new StringTokenizer(sharedFCSearchReq.getPlace()," ");
            while(st.hasMoreTokens()) places.add(st.nextToken());
        }

        Page<SharedFullCourse>  sharedFullCourses = sharedFCRepositoryCustom.searchByTagsAndDays(
                sharedFCSearchReq.getTags(),
                sharedFCSearchReq.getDays(),
                places, pageable);
        return sharedFullCourses.map(
                share -> new SharedFCListDto(share,share.getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }
}

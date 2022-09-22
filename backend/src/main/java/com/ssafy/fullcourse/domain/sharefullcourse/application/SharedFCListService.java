package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCGetRes;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCListDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCTag;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCLikeRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCTagRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.Specification.SharedFCTagSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SharedFCListService {

    private final SharedFCRepository sharedFCRepository;
    private final SharedFCLikeRepository sharedFCLikeRepository;
    private final SharedFCTagRepository sharedFCTagRepository;
    private final UserRepository userRepository;


    public Page<SharedFCListDto> getSharedFCList(String keyword, Pageable pageable) {
        Page<SharedFullCourse> page;
        if (keyword==null) page=sharedFCRepository.findAll(pageable);
        else page=sharedFCRepository.findFCListByTitleContains(keyword, pageable);

        return page.map(share -> new SharedFCListDto(share, share.getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }

    public Page<SharedFCListDto> getSharedFCLikeList(String email, String keyword, Pageable pageable) {
        Optional<User> user = userRepository.findByEmail(email);
        if(!user.isPresent()) return null;
        User findUser = user.get();


        Page<SharedFCLike> page = sharedFCLikeRepository.findFCLikeByUser(findUser, pageable);

        return page.map(share -> new SharedFCListDto(share.getSharedFullCourse(),
                share.getSharedFullCourse().getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }


    // 공유 풀코스 태그 조회
    public List<SharedFCGetRes> searchByTags(List<String> tags, Pageable pageable){
        Specification<SharedFCTag> specification = null;

        for(String tag : tags){
            System.out.print(tag+", ");
            Specification<SharedFCTag> tagSpecification = SharedFCTagSpecification.tagContains(tag);
            if(specification == null)
                specification = tagSpecification;
            else
                specification = specification.or(tagSpecification);
        }

        List<Long> sharedFcIds = sharedFCTagRepository.findAll(specification).stream().map(tag->tag.getSharedFullCourse().getSharedFcId()).collect(Collectors.toList());
        List<SharedFCGetRes> sharedFCGetRes = sharedFCRepository.findAllBySharedFcIdIdIn(sharedFcIds, pageable).stream().map(
                sharedFc->SharedFCGetRes.of(sharedFc)).collect(Collectors.toList());

        return sharedFCGetRes;
    }


}

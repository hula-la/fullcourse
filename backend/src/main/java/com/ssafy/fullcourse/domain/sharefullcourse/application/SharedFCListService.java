package com.ssafy.fullcourse.domain.sharefullcourse.application;

import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCListDto;
import com.ssafy.fullcourse.domain.sharefullcourse.dto.SharedFCTagDto;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFCLike;
import com.ssafy.fullcourse.domain.sharefullcourse.entity.SharedFullCourse;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCLikeRepository;
import com.ssafy.fullcourse.domain.sharefullcourse.repository.SharedFCRepository;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.model.PageDto;
import com.ssafy.fullcourse.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SharedFCListService {

    private final SharedFCRepository sharedFCRepository;
    private final SharedFCLikeRepository sharedFCLikeRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;


    public Page<SharedFCListDto> getSharedFCList(String keyword, Pageable pageable) {
        Page<SharedFullCourse> page;
        if (keyword==null) page=sharedFCRepository.findAll(pageable);
        else page=sharedFCRepository.findFCListByTitleContains(keyword, pageable);

        return page.map(share -> new SharedFCListDto(share, share.getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }

    public Page<SharedFCListDto> getSharedFCLikeList(HttpServletRequest request, PageDto pageDto) {
        String token = request.getHeader("access-token");
        if (!tokenProvider.validateToken(token)) {
            return null;
        }

        String userEmail = String.valueOf(tokenProvider.getPayload(token).get("sub"));
        User findUser = userRepository.findByEmail(userEmail).get();


        /**
         * 고민
         */
//        Page<SharedFCLike> page;
//        if(pageDto.getKeyword() == null) {
//            PageRequest pageRequest = getPageRequest(pageDto);
//            page = sharedFCLikeRepository.findFCLikeByUser(findUser, pageRequest);
//        } else {
//            PageRequest pageRequest = getPageRequest(pageDto);
//            page = sharedFCLikeRepository.findFCLikeByUser(findUser, pageDto.getKeyword(), pageRequest);
//        }

        Page<SharedFCLike> page = sharedFCLikeRepository.findFCLikeByUser(findUser, pageDto.getPageable());

        return page.map(share -> new SharedFCListDto(share.getSharedFullCourse(),
                share.getSharedFullCourse().getSharedFCTags().stream().map(SharedFCTagDto::new).collect(Collectors.toList())));
    }




}

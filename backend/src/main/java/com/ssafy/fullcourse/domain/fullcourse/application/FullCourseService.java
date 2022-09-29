package com.ssafy.fullcourse.domain.fullcourse.application;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;
import com.ssafy.fullcourse.domain.fullcourse.dto.*;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourse;
import com.ssafy.fullcourse.domain.fullcourse.entity.FullCourseDetail;
import com.ssafy.fullcourse.domain.fullcourse.exception.FullCourseDiaryNotFoundException;
import com.ssafy.fullcourse.domain.fullcourse.exception.FullCourseNotFoundException;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseDetailRepository;
import com.ssafy.fullcourse.domain.fullcourse.repository.FullCourseRepository;
import com.ssafy.fullcourse.domain.place.dto.PlaceRes;
import com.ssafy.fullcourse.domain.place.entity.*;
import com.ssafy.fullcourse.domain.place.repository.*;
import com.ssafy.fullcourse.domain.review.exception.PlaceNotFoundException;
import com.ssafy.fullcourse.domain.user.entity.User;
import com.ssafy.fullcourse.domain.user.repository.UserRepository;
import com.ssafy.fullcourse.global.util.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FullCourseService {

    private final FullCourseRepository fullCourseRepository;

    private final FullCourseDetailRepository fullCourseDetailRepository;

    private final UserRepository userRepository;

    private final TravelRepository travelRepository;
    private final CultureRepository cultureRepository;
    private final ActivityRepository activityRepository;
    private final RestaurantRepository restaurantRepository;
    private final HotelRepository hotelRepository;

    private final AwsS3Service awsS3Service;

    @Transactional
    public Long createFullCourse(String userId, FullCoursePostReq fullCoursePostReq) {
//        날짜 설정
//        LocalDate now = LocalDate.now();
        Date now = new Date();
        fullCoursePostReq.setRegDate(now);

        Optional<User> userOpt = userRepository.findByEmail(userId);


        // 풀코스에 저장
        FullCourse fullCourse = fullCourseRepository
                .save(fullCoursePostReq.toEntity(userOpt.get()));

        fullCoursePostReq.getPlaces().forEach((day, places) -> {
            places.forEach((detail) -> createFullCourseDetail(day, fullCourse, detail));
        });

        return fullCourse.getFcId();
    }

    public Long createFullCourseDetail(int day, FullCourse fullCourse, FullCourseDetailRes fcDetail) {
        return fullCourseDetailRepository
                .save(fcDetail.toEntity(fullCourse, day))
                .getFcDetailId();
    }


    public Page<FullCourseRes> getFullCourse(String email, Pageable pageable) {
        Page<FullCourse> fcs = fullCourseRepository.findByUser_Email(email, pageable);
        return fcs.map(FullCourseRes::new);
    }

    public FullCourseTotalRes getFullCourseDetailById(Long fcId) {
        Optional<FullCourse> fullCourseOpt = fullCourseRepository.findById(fcId);

        if (!fullCourseOpt.isPresent()) throw new FullCourseNotFoundException();

        FullCourse fullCourse = fullCourseOpt.get();
        List<FullCourseDetail> fullCourseList =
                fullCourseDetailRepository.findByFullCourse_FcIdOrderByDayAscCourseOrderAsc(fcId);

        HashMap<Integer, List<FullCourseDetailRes>> places = new HashMap<>();
        for (FullCourseDetail fcd : fullCourseList) {
            if (!places.containsKey(fcd.getDay())) places.put(fcd.getDay(), new ArrayList<>());

            String type = fcd.getType();
            Long placeId = fcd.getPlaceId();


            PlaceRes placeRes = getLntLat(type, placeId);

//            float lat = placeRes.getLat();
//            float lng = placeRes.getLng();


            places.get(fcd.getDay())
                    .add(fcd.toDto(placeRes));
        }

        return fullCourse.toDto(places);
    }

    @Transactional
    public void deleteFullCourse(Long fcId) {
        fullCourseRepository.deleteById(fcId);
    }


    @Transactional
    public Long updateFullCourse(String userId, Long fcId, FullCoursePostReq fullCoursePostReq) {
        deleteFullCourse(fcId);
        return createFullCourse(userId, fullCoursePostReq);
    }

    @Transactional
    public String confirmVisit(FullCourseVisitConfirmReq fcvcReq) {
        String message = null;
        FullCourseDetail fcDetail =
                fullCourseDetailRepository.findById(fcvcReq.getFcDetailId()).get();
        String type = fcDetail.getType();

        PlaceRes placeRes = getLntLat(type, fcDetail.getPlaceId());

        float lat = placeRes.getLat();
        float lng = placeRes.getLng();
        // Km 단위로 계산됨.
        Double dist =
                Math.sqrt(Math.pow((fcvcReq.getLat() - lat) * 88.9036, 2) + Math.pow((fcvcReq.getLng() - lng) * 111.3194, 2));
        System.out.println("계산된 거리 : " + dist + "Km");
        if (dist < 1) {
            fcDetail.setVisited(true);
            message = "인증 완료";
        } else {
            message = "인증 실패 : 거리가 멀어 인증할 수 없습니다.";
        }
        fullCourseDetailRepository.save(fcDetail);

        return message;
    }


    @Transactional
    public String confirmVisitByImage(double[] inputLatLng, Long fcdId) {
        String message = null;
        FullCourseDetail fcDetail =
                fullCourseDetailRepository.findById(fcdId).get();
        String type = fcDetail.getType();

        PlaceRes placeRes = getLntLat(type, fcDetail.getPlaceId());

        float lat = placeRes.getLat();
        float lng = placeRes.getLng();

        // Km 단위로 계산됨.
        Double dist =
                Math.sqrt(Math.pow((inputLatLng[0] - lat) * 88.9036, 2) + Math.pow((inputLatLng[1] - lng) * 111.3194,
                        2));
        System.out.println("계산된 거리 : " + dist + "Km");
        if (dist < 1) {
            fcDetail.setVisited(true);
            message = "인증 완료";
        } else {
            message = "인증 실패 : 거리가 멀어 인증할 수 없습니다.";
        }
        fullCourseDetailRepository.save(fcDetail);
        return message;
    }

    @Transactional
    public FullCourseTotalRes createFCdiary(MultipartFile img, String content, Long fcDetailId) throws ImageProcessingException, IOException {
        String url = null;
        FullCourseDetail fullCourseDetail =
                fullCourseDetailRepository.findById(fcDetailId).orElseThrow(() -> new FullCourseNotFoundException());
        if(fullCourseDetail.getImg() != null) {
            awsS3Service.delete(fullCourseDetail.getImg());
        }
        if (img != null && !img.isEmpty()) {
            File file = convert(img);
            Metadata metadata = ImageMetadataReader.readMetadata(file);
            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
            if (gpsDirectory != null) {
                GeoLocation geoLocation = gpsDirectory.getGeoLocation();
                if (geoLocation != null && !geoLocation.isZero()) {
                    double[] latLng = new double[2];
                    latLng[0] = geoLocation.getLatitude();
                    latLng[1] = geoLocation.getLongitude();
                    file.delete();
                    System.out.println(latLng[0] + " " + latLng[1]);
                    confirmVisitByImage(latLng, fcDetailId);
                }
            }
            url = awsS3Service.uploadImage(img);
        }

        fullCourseDetail.setImg(url);
        fullCourseDetail.setComment(content);
        fullCourseDetailRepository.save(fullCourseDetail);
        return getFullCourseDetailById(fullCourseDetail.getFullCourse().getFcId());
    }


    public File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return file;
    }

    public PlaceRes getLntLat(String type, Long placeId) {
        PlaceRes placeRes;
        if (type.equals("travel")) {
            Travel travel = travelRepository.findByPlaceId(placeId).get();
            placeRes = new PlaceRes(travel);
        } else if (type.equals("culture")) {
            Culture culture = cultureRepository.findByPlaceId(placeId).get();
            placeRes = new PlaceRes(culture);
        } else if (type.equals("activity")) {
            Activity activity = activityRepository.findByPlaceId(placeId).get();
            placeRes = new PlaceRes(activity);
        } else if (type.equals("hotel")) {
            Hotel hotel = hotelRepository.findByPlaceId(placeId).get();
            placeRes = new PlaceRes(hotel);
        } else if (type.equals("restaurant")) {
            Restaurant restaurant = restaurantRepository.findByPlaceId(placeId).get();
            placeRes = new PlaceRes(restaurant);
        } else {
            throw new PlaceNotFoundException();
        }
        return placeRes;
    }
}

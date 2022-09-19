package com.ssafy.fullcourse.infra;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.StringTokenizer;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/api/data")
@RequiredArgsConstructor
public class DataController {

    @Value("${java.file.kakao-api}")
    private String kakao_servicekey;

    @Value("${java.file.data-api}")
    private String data_servicekey;

    @GetMapping("/activity")
    public String getActivityData() {
        int pageNo = 1;
        String result = "";

        while(true) {
            String temp_result = "";
            StringBuffer sb = new StringBuffer();
            String reqURL = "http://apis.data.go.kr/6260000/MarintimeService/getMaritimeKr" +
                    "?serviceKey=" + data_servicekey +
                    "&pageNo=" + pageNo +
                    "&numOfRows=20" +
                    "&resultType=json";
            System.out.println("pageNo : " + pageNo);

            try {
                URL url = new URL(reqURL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

                String returnLine;
                while ((returnLine = br.readLine()) != null) {
                    temp_result += returnLine;
                }
                conn.disconnect();
                System.out.println("temp_result : " + temp_result);

                // JSON 파싱
                try {
                    JSONParser parser = new JSONParser();
                    JSONObject jsonObj = (JSONObject) parser.parse(temp_result);
                    JSONObject response = (JSONObject) jsonObj.get("getMaritimeKr");
                    JSONArray item = (JSONArray) response.get("item");

                    for (int i = 0; i < item.size(); i++) {
                        String s = item.get(i).toString();
                        JSONObject json = (JSONObject) parser.parse(s);

                        sb.append(json.get("MAIN_TITLE")).append("\t");
                        sb.append(json.get("SUBTITLE")).append("\t");
                        sb.append(json.get("LAT")).append("\t");
                        sb.append(json.get("LNG")).append("\t");
                        sb.append(json.get("CNTCT_TEL")).append("\t");
                        sb.append(json.get("GUGUN_NM")).append("\t");
                        sb.append(json.get("ADDR1")).append("\t");
                        sb.append(json.get("ITEMCNTNTS")).append("\t");
                        sb.append(json.get("MAIN_IMG_NORMAL")).append("\t");
                        sb.append(json.get("HLDY_INFO")).append("\t");
                        sb.append(json.get("USAGE_DAY_WEEK_AND_TIME")).append("\t");
                        sb.append(json.get("TRFC_INFO")).append("\t");
                        sb.append("^");
                    }

                    System.out.println("sb : " + sb);
                    result += sb.toString();

                    if(item.size() < 20) break;

                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            pageNo++;
        }

        try (BufferedOutputStream bs = new BufferedOutputStream(new FileOutputStream("src/main/java/com/ssafy/fullcourse/infra/activity.txt"))) {
            bs.write(result.getBytes());
        } catch (Exception e) {
            e.getStackTrace();
        }

        return result;
    }



    @GetMapping("/shopping")
    public String getShoppingData() {
        int pageNo = 1;
        String result = "";

        while(true) {
            String temp_result = "";
            StringBuffer sb = new StringBuffer();
            String reqURL = "http://apis.data.go.kr/6260000/ShoppingService/getShoppingKr" +
                    "?serviceKey=" + data_servicekey +
                    "&pageNo=" + pageNo +
                    "&numOfRows=20" +
                    "&resultType=json";
            System.out.println("pageNo : " + pageNo);

            try {
                URL url = new URL(reqURL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

                String returnLine;
                while ((returnLine = br.readLine()) != null) {
                    temp_result += returnLine;
                }
                conn.disconnect();
                System.out.println("temp_result : " + temp_result);

                // JSON 파싱
                try {
                    JSONParser parser = new JSONParser();
                    JSONObject jsonObj = (JSONObject) parser.parse(temp_result);
                    JSONObject response = (JSONObject) jsonObj.get("getShoppingKr");
                    JSONArray item = (JSONArray) response.get("item");

                    for (int i = 0; i < item.size(); i++) {
                        String s = item.get(i).toString();
                        JSONObject json = (JSONObject) parser.parse(s);

                        sb.append(json.get("MAIN_TITLE")).append("\t");
                        sb.append(json.get("GUGUN_NM")).append("\t");
                        sb.append(json.get("LAT")).append("\t");
                        sb.append(json.get("LNG")).append("\t");
                        sb.append(json.get("TITLE")).append("\t");
                        sb.append(json.get("SUBTITLE")).append("\t");
                        sb.append(json.get("ADDR1")).append("\t");
                        sb.append(json.get("CNTCT_TEL")).append("\t");
                        sb.append(json.get("HOMEPAGE_URL")).append("\t");
                        sb.append(json.get("TRFC_INFO")).append("\t");
                        sb.append(json.get("USAGE_DAY")).append("\t");
                        sb.append(json.get("HLDY_INFO")).append("\t");
                        sb.append(json.get("USAGE_DAY_WEEK_AND_TIME")).append("\t");
                        sb.append(json.get("USAGE_AMOUNT")).append("\t");
                        sb.append(json.get("MIDDLE_SIZE_RM1")).append("\t");
                        sb.append(json.get("MAIN_IMG_NORMAL")).append("\t");
                        sb.append(json.get("ITEMCNTNTS")).append("\t");
                        sb.append("^");
                    }

                    System.out.println("sb : " + sb);
                    result += sb.toString();

                    if(item.size() < 20) break;

                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            pageNo++;
        }

        try (BufferedOutputStream bs = new BufferedOutputStream(new FileOutputStream("src/main/java/com/ssafy/fullcourse/infra/shopping.txt"))) {
            bs.write(result.getBytes());
        } catch (Exception e) {
            e.getStackTrace();
        }

        return result;
    }


    public Boolean dateCheck(String start, String end) {
        String sample_date = "2022-10-3";
//        String todayfm = new SimpleDateFormat("yyyy-MM-dd").format(new Date(System.currentTimeMillis()));
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date today = new Date(dateFormat.parse(sample_date).getTime());
            Date start_date = new Date(dateFormat.parse(start).getTime());
            Date end_date = new Date(dateFormat.parse(end).getTime());

            int compare_start = start_date.compareTo(today);
            int compare_end = end_date.compareTo(today);
            if(compare_start < 0) {
                if(compare_end > 0) {
                    return true;
                } else return false;
            } else return false;

        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }

        return false;
    }


    @GetMapping("/exhibition")
    public String getExhibitionData() {
        int pageNo = 17;
        String result = "";

        while(true) {
            String temp_result = "";
            StringBuffer sb = new StringBuffer();
            String reqURL = "http://apis.data.go.kr/6260000/BusanCultureExhibitService/getBusanCultureExhibit" +
                    "?serviceKey=" + data_servicekey +
                    "&pageNo=" + pageNo +
                    "&numOfRows=100" +
                    "&resultType=json";
            System.out.println("pageNo : " + pageNo);

            try {
                URL url = new URL(reqURL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

                String returnLine;
                while ((returnLine = br.readLine()) != null) {
                    temp_result += returnLine;
                }
                conn.disconnect();
                System.out.println("temp_result : " + temp_result);

                // JSON 파싱
                try {
                    JSONParser parser = new JSONParser();
                    JSONObject jsonObj = (JSONObject) parser.parse(temp_result);
                    JSONObject response = (JSONObject) jsonObj.get("getBusanCultureExhibit");
                    JSONArray item = (JSONArray) response.get("item");

                    for (int i = 0; i < item.size(); i++) {
                        String s = item.get(i).toString();
                        JSONObject json = (JSONObject) parser.parse(s);

                        // 날짜 기간 체크
                        String start = (String) json.get("op_st_dt");
                        String end = (String) json.get("op_ed_dt");
                        Boolean dateCheck = dateCheck(start, end);
                        if(!dateCheck) continue;

                        // 장소명으로 위도,경도 가져오기
                        String place = (String) json.get("place_nm");
                        HashMap<String, String> coordinate = getCoordinate(place);
                        if(coordinate == null) continue;

                        sb.append(json.get("title")).append("\t");
                        sb.append(coordinate.get("lat")).append("\t");
                        sb.append(coordinate.get("lng")).append("\t");
                        sb.append(coordinate.get("gugun")).append("\t");
                        sb.append(place).append("\t");
                        sb.append(start).append("~").append(end).append("\t");
                        sb.append(" ").append("\t");
                        sb.append(" ").append("\t");
                        sb.append("^");
                    }

                    System.out.println("sb : " + sb);
                    result += sb.toString();

                    if(item.size() < 100) break;

                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            pageNo++;
        }

        try (BufferedOutputStream bs = new BufferedOutputStream(new FileOutputStream("src/main/java/com/ssafy/fullcourse/infra/exhibition.txt"))) {
            bs.write(result.getBytes());
        } catch (Exception e) {
            e.getStackTrace();
        }

        return result;
    }




    @GetMapping("/show")
    public String getShowData() {
        int pageNo = 57;
        String result = "";

        while(true) {
            String temp_result = "";
            StringBuffer sb = new StringBuffer();
            String reqURL = "http://apis.data.go.kr/6260000/BusanCultureThemeService/getBusanCultureTheme" +
                    "?serviceKey=" + data_servicekey +
                    "&pageNo=" + pageNo +
                    "&numOfRows=100" +
                    "&resultType=json";
            System.out.println("pageNo : " + pageNo);

            try {
                URL url = new URL(reqURL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

                String returnLine;
                while ((returnLine = br.readLine()) != null) {
                    temp_result += returnLine;
                }
                conn.disconnect();
                System.out.println("temp_rseult : " + temp_result);

                // JSON 파싱
                try {
                    JSONParser parser = new JSONParser();
                    JSONObject jsonObj = (JSONObject) parser.parse(temp_result);
                    JSONObject response = (JSONObject) jsonObj.get("getBusanCultureTheme");
                    JSONArray item = (JSONArray) response.get("item");

                    for (int i = 0; i < item.size(); i++) {
                        String s = item.get(i).toString();
                        JSONObject json = (JSONObject) parser.parse(s);

                        // 날짜 기간 체크
                        String start = (String) json.get("op_st_dt");
                        String end = (String) json.get("op_ed_dt");
                        Boolean dateCheck = dateCheck(start, end);
                        if(!dateCheck) continue;

                        // 장소명으로 위도,경도 가져오기
                        String place = (String) json.get("place_nm");
                        HashMap<String, String> coordinate = getCoordinate(place);
                        if(coordinate == null) continue;

                        sb.append(json.get("title")).append("\t");
                        sb.append(coordinate.get("lat")).append("\t");
                        sb.append(coordinate.get("lng")).append("\t");
                        sb.append(coordinate.get("gugun")).append("\t");
                        sb.append(place).append("\t");
                        sb.append(start).append("~").append(end).append("\t");
                        sb.append(" ").append("\t");
                        sb.append(" ").append("\t");
                        sb.append("^");
                    }

                    System.out.println("sb : " + sb);
                    result += sb.toString();

                    if(item.size() < 100) break;

                } catch (ParseException e) {
                    e.printStackTrace();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            pageNo++;
        }

        try (BufferedOutputStream bs = new BufferedOutputStream(new FileOutputStream("src/main/java/com/ssafy/fullcourse/infra/show.txt"))) {
            bs.write(result.getBytes());
        } catch (Exception e) {
            e.getStackTrace();
        }

        return result;
    }


    public HashMap<String, String> getCoordinate(String place) {
        HashMap<String, String> map = new HashMap<>();
        String apiKey = kakao_servicekey;
        String reqURL = "https://dapi.kakao.com/v2/local/search/keyword.json";
        String temp_result = "";

        try {
            place = URLEncoder.encode(place, "UTF-8");
            reqURL += "?query=" + place;

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestProperty("Authorization", "KakaoAK " + apiKey);
            conn.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));

            String returnLine;
            while ((returnLine = br.readLine()) != null) {
                temp_result += returnLine;
            }

            conn.disconnect();

            try {
                JSONParser parser = new JSONParser();
                JSONObject jsonObj = (JSONObject) parser.parse(temp_result);
                JSONArray documents = (JSONArray) jsonObj.get("documents");

                String address;
                String gugun = null;
                String lat = "";
                String lng = "";
                for(int i = 0; i < documents.size(); i++) {
                    String s = documents.get(i).toString();
                    JSONObject json = (JSONObject) parser.parse(s);

                    address = (String) json.get("address_name");
                    StringTokenizer st = new StringTokenizer(address);
                    String city = st.nextToken();
                    if(!city.equals("부산")) continue;

                    gugun = st.nextToken();
                    lat = (String) json.get("y");
                    lng = (String) json.get("x");
                }

                if(gugun == null) return null;

                map.put("lat", lat);
                map.put("lng", lng);
                map.put("gugun", gugun);
            } catch (ParseException e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return map;
    }


}

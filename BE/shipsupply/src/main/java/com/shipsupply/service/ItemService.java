package com.shipsupply.service;

import com.shipsupply.domain.Item;
import com.shipsupply.persistence.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    public String getCategory(Map<String, String> data) {

        String flaskUrl = "http://localhost:5000/api/item/predict/classify";

        // RestTemplate 객체 생성
        // HTTP 통신을 위한 클래스. 이것을 WebClient로 바꿀 수 있다(비동기통신으로)
        RestTemplate restTemplate = new RestTemplate();

        // HTTP Headers 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> map= new HashMap<>();
        map.put("a", data.get("Machinery"));
        map.put("b", data.get("Assembly"));
        map.put("c", data.get("PartNo1"));
        map.put("d", data.get("Item"));

        HttpEntity<Map<String, String>> request = new HttpEntity<>(map, headers);

        // RestTemplate은 스프링에서 다른 서버로 HTTP요청을 보내고 응답을 받기 위한 클래스
        // restTemplate을 이용하여 POST 요청을 보내고(postForEntity) 결과를 POJO(Plain Old Java Object)로 반환.
        // 받은 POJO를 자동으로 자바 객체로 변환해줌
        // POJO(Plain Old Java Object)는 특정 규약, 프레임워크, 기술 등에 종속되지 않는 일반적인 Java 객체
        // String.class -> 요청의 응답 데이터가 String 타입
        ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, request, String.class);

        return response.getBody();
    }
}

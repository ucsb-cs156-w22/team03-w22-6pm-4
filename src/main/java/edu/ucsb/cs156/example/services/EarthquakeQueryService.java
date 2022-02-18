package edu.ucsb.cs156.example.services;

import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.example.documents.Features;

@Slf4j
@Service
public class EarthquakeQueryService
{
    ObjectMapper mapper = new ObjectMapper();

    private final RestTemplate restTemplate;

    public EarthquakeQueryService(RestTemplateBuilder restTemplateBuilder) {
        restTemplate = restTemplateBuilder.build();
    }

    public static final String ENDPOINT = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude={minMag}&maxradiuskm={distance}&latitude={latitude}&longitude={longitude}";

    public Features getJSON(String distance, String minMag) throws HttpClientErrorException, JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String ucsbLat = "34.4140";    // Storke. 🔔
        String ucsbLong = "-119.8489"; // <-
        Map<String, String> uriVariables = Map.of("minMag", minMag, "distance", distance, "latitude", ucsbLat, "longitude", ucsbLong);

        ResponseEntity<String> re = restTemplate.exchange(ENDPOINT, HttpMethod.GET, entity, String.class, uriVariables);

        // TODO: Modifications to the querier follow. Are they okay?

        String json = re.getBody();

        Features features = mapper.readValue(json, Features.class);

        return features;
    }
}

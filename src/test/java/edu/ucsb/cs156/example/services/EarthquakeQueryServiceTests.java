package edu.ucsb.cs156.example.services;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;

import edu.ucsb.cs156.example.documents.Features;

@RestClientTest(EarthquakeQueryService.class)
public class EarthquakeQueryServiceTests
{
    @Autowired
    private MockRestServiceServer server;

    @Autowired
    private EarthquakeQueryService querier;

    @Test
    public void test_getJSON() throws JsonProcessingException {
        String distance = "10";
        String minMag = "1.5";
        String ucsbLat = "34.4140";    // Storke. 🔔
        String ucsbLong = "-119.8489"; // <-

        String expectedURL = EarthquakeQueryService.ENDPOINT
            .replace("{distance}", distance)
            .replace("{minMag}", minMag)
            .replace("{latitude}", ucsbLat)
            .replace("{longitude}", ucsbLong);

        String someJSON = "{ \"type\": \"Not GeoJSON, sorry.\", \"metadata\": null, \"features\": null }";
        Features someFeatures = new Features();
        someFeatures.setType("Not GeoJSON, sorry.");

        this.server.expect(requestTo(expectedURL))
            .andExpect(header("Accept", MediaType.APPLICATION_JSON.toString()))
            .andExpect(header("Content-Type", MediaType.APPLICATION_JSON.toString()))
            .andRespond(withSuccess(someJSON, MediaType.APPLICATION_JSON));

        Features actual = querier.getJSON(distance, minMag);
        assertEquals(someFeatures, actual);
    }
}

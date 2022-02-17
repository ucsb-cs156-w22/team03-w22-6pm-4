package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.documents.Features;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Api(description = "Information about recent earthquakes.")
@RequestMapping("/api/earthquakes")
public class EarthquakesController extends ApiController
{
    @Autowired
    EarthquakesCollection earthquakes;

    @Autowired
    EarthquakeQueryService querier;

    @Autowired
    ObjectMapper mapper;

    @GetMapping("/all")
    @ApiOperation(value = "List all earthquakes.")
    @PreAuthorize("hasRole('ROLE_USER')")
    public Iterable<Features> getAll() {
        return earthquakes.findAll();
    }

    @PostMapping("/upsert")
    @ApiOperation(value = "Store recent earthquakes.", notes = "Delegate to the query service from team01.")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Features> upsert(
        // Why are these parameters strings? I don't understand why the querier mandates that.
        @ApiParam("Minimum magnitude.") @RequestParam String magnitude,
        @ApiParam("Distance from Storke.") @RequestParam String distance
    ) throws JsonProcessingException {
        // TODO: Remove this log message.
        log.info("upsert with parameters magnitude={}, distance={}", magnitude, distance);

        Features features = querier.getJSON(distance, magnitude);
        Features saved = earthquakes.save(features);

        // TODO: How does ResponseEntity know how to convert a Features into a body? 🤯
        // All of the magic is driving me nuts!
        return ResponseEntity.ok().body(saved);
    }
}

package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.documents.Feature;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Api(description = "Information about earthquakes recorded by USGS.")
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
    public Iterable<Feature> list() {
        return earthquakes.findAll();
    }

    // TODO: Are we supposed to use HTTP POST for deletion? I'm not convinced.
    // StackOverflow is talking about the idempotence of HTTP methods. And there
    // is a DELETE.

    @PostMapping("/purge")
    @ApiOperation(value = "Purge all earthquakes.", notes = "Only accessible to administrators.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void purge() {
        earthquakes.deleteAll();
    }

    @PostMapping("/retrieve")
    @ApiOperation(value = "Store earthquakes.", notes = "Delegate to the query service from team01. Only accessible to administrators. Beware duplicates.")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Iterable<Feature> upsert(
        // Why are these parameters strings? I don't understand why the querier mandates that.
        @ApiParam("Minimum magnitude.") @RequestParam String magnitude,
        @ApiParam("Distance from Storke.") @RequestParam String distance
    ) throws JsonProcessingException {
        Features features = querier.getJSON(distance, magnitude);

        earthquakes.saveAll(features.getFeatures());

        // TODO: Does this just return 200 as the HTTP status? And plop the
        // serialized object — how?! — in the body of the response? Sure, why
        // not.

        return features.getFeatures();
    }
}

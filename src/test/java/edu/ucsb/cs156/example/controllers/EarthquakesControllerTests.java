package edu.ucsb.cs156.example.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.ucsb.cs156.example.collections.EarthquakesCollection;
import edu.ucsb.cs156.example.controllers.EarthquakesController;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.documents.Feature;
import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.EarthquakeQueryService;
import edu.ucsb.cs156.example.testconfig.TestConfig;

@WebMvcTest(controllers = EarthquakesController.class)
@Import(TestConfig.class)
public class EarthquakesControllerTests extends ControllerTestCase
{
    @MockBean
    UserRepository userRepository;

    @MockBean
    EarthquakesCollection earthquakes;

    @MockBean
    EarthquakeQueryService querier;

    /* GET /api/earthquakes/all */

    @Test
    public void stranger_does_list() throws Exception
    {
        mockMvc.perform(get("/api/earthquakes/all"))
            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void user_does_list() throws Exception
    {
        Feature shaky = new Feature();
        shaky.setType("Some shaky friend.");
        ArrayList<Feature> shakies = new ArrayList<Feature>();
        shakies.add(shaky);

        when(earthquakes.findAll()).thenReturn(shakies);

        MvcResult response = mockMvc.perform(get("/api/earthquakes/all"))
            .andExpect(status().isOk()).andReturn();

        verify(earthquakes, times(1)).findAll();

        String expected = mapper.writeValueAsString(shakies);
        String actual = response.getResponse().getContentAsString();

        assertEquals(expected, actual);
    }

    /* POST /api/earthquakes/purge */

    @Test
    public void stranger_does_purge() throws Exception
    {
        mockMvc.perform(post("/api/earthquakes/purge"))
            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void user_does_purge() throws Exception
    {
        mockMvc.perform(post("/api/earthquakes/purge"))
            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void admin_does_purge() throws Exception
    {
        // TODO: Absolutely going to fail mutation testing.

        doNothing().when(earthquakes).deleteAll();

        mockMvc.perform(post("/api/earthquakes/purge"))
            .andExpect(status().isOk());

        verify(earthquakes, times(1)).deleteAll();
    }

    /* POST /api/earthquakes/retrieve */

    @Test
    public void stranger_does_retrieve() throws Exception
    {
        mockMvc.perform(post("/api/earthquakes/retrieve"))
            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void user_does_retrieve() throws Exception
    {
        mockMvc.perform(post("/api/earthquakes/retrieve"))
            .andExpect(status().is(403));
    }
}

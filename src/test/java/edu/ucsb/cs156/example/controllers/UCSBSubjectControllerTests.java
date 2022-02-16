package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.UCSBSubject;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.UCSBSubjectRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = UCSBSubjectController.class)
@Import(TestConfig.class)
public class UCSBSubjectControllerTests extends ControllerTestCase {

    @MockBean
    UCSBSubjectRepository repository;

    @MockBean
    UserRepository userRepository;

    // Authorization tests for /api/ucsbSubject/all

    @Test
    public void test_api_UCSBSubject_all__logged_out__returns_403() throws Exception {
        mockMvc.perform(get("/api/UCSBSubjects/all"))
               .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void test_api_UCSBSubject_all_logged_in_gets_all() throws Exception
    {
        UCSBSubject dummy = UCSBSubject.dummySubject(0);
        UCSBSubject another = UCSBSubject.dummySubject(1);

        ArrayList<UCSBSubject> subjects = new ArrayList<>();
        subjects.addAll(Arrays.asList(dummy, another));

        when(repository.findAll()).thenReturn(subjects);

        MvcResult response = mockMvc.perform(get("/api/UCSBSubjects/all"))
            .andExpect(status().isOk()).andReturn();

        verify(repository, times(1)).findAll();

        String expectedJson = mapper.writeValueAsString(subjects);
        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedJson, responseString);
    }

    static String POSTString = "/api/UCSBSubjects/post?"
                             + "&subjectCode=GPS"
                             + "&subjectTranslation=Global Peace and Security"
                             + "&deptCode=GPS"
                             + "&collegeCode=UCSB"
                             + "&relatedDeptCode=GPS"
                             + "&inactive=true";

    @WithMockUser(roles = { "USER" })
    @Test
    public void test_api_UCSBSubject_postUCSBSubject() throws Exception {
        UCSBSubject subject = UCSBSubject.dummySubject(0);

        when(repository.save(eq(subject))).thenReturn(subject);

        MvcResult response = mockMvc.perform(
                post(POSTString)
                .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        verify(repository, times(1)).save(subject);

        String expectedJson = mapper.writeValueAsString(subject);
        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void test_api_UCSBSubject_getUCSBSubjectById_exist() throws Exception {
        UCSBSubject subject = UCSBSubject.dummySubject(42L);
        //repository.save(subject);
        when(repository.findById(eq(42L))).thenReturn(Optional.of(subject));

        MvcResult response = mockMvc.perform(get("/api/UCSBSubjects?id=42"))
            .andExpect(status().isOk()).andReturn();

        verify(repository, times(1)).findById(eq(42L));

        String expectedJson = mapper.writeValueAsString(subject);
        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void test_api_UCSBSubject_getUCSBSubjectById_nonExist() throws Exception {
        when(repository.findById(eq(42L))).thenReturn(Optional.empty());

        MvcResult response = mockMvc.perform(get("/api/UCSBSubjects?id=42"))
            .andExpect(status().isBadRequest()).andReturn();

        verify(repository, times(1)).findById(eq(42L));

        String expectedJson = "id 42 not found";
        String responseString = response.getResponse().getContentAsString();

        assertEquals(expectedJson, responseString);
    }


    @Test
    public void test_api_UCSBSubject_getUCSBSubject() throws Exception {
      mockMvc.perform(post("/api/UCSBSubjects/all"))
             .andExpect(status().is(403));
    }
    
    @WithMockUser(roles = { "USER" })
    @Test
    public void test_api_UCSBSubject_delete_user_logged_in() throws Exception {
        UCSBSubject subject = UCSBSubject.dummySubject(42L);

        when(repository.findById(eq(42L))).thenReturn(Optional.of(subject));

        doNothing().when(repository).deleteById(42L);

        MvcResult response = mockMvc.perform(
            delete("/api/UCSBSubjects?id=42")
            .with(csrf())
        )
        .andExpect(status().isOk()).andReturn();

        verify(repository, times(1)).findById(42L);
        verify(repository, times(1)).deleteById(42L);

        String responseString = response.getResponse().getContentAsString();
        assertEquals("record 42 deleted", responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void test_api_UCSBSubject_delete_user_logged_in_nonExist() throws Exception {
        when(repository.findById(eq(42L))).thenReturn(Optional.empty());

        doNothing().when(repository).deleteById(42L);

        MvcResult response = mockMvc.perform(
            delete("/api/UCSBSubjects?id=42")
            .with(csrf())
        )
        .andExpect(status().isBadRequest()).andReturn();

        //verify(repository, times(1)).findById(42L);
        //verify(repository, times(1)).deleteById(42L);

        String responseString = response.getResponse().getContentAsString();
        assertEquals("record 42 not found", responseString);
    }


    // test for getId();
    @Test
    public void test_UCSBSubjectGetId() {
      UCSBSubject testSubject = new UCSBSubject(1L,"","","","","",false);

      long id = testSubject.getId();

      assertEquals(1L, id);
      

    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__put_ucsbSubject() throws Exception {
        

        UCSBSubject ucsbSubject1 = UCSBSubject.builder().subjectCode("UCSBSubject Code 7")
        .subjectTranslation("UCSBsubject Translation 7").deptCode("UCSBSubject deptCode 7").collegeCode("UCSBSubject collegeCode 7").relatedDeptCode("UCSB relatedDeptCode 7").inactive(false).id(7L).build();

        UCSBSubject updatedUCSBSubject = UCSBSubject.builder().subjectCode("new subjectCode")
        .subjectTranslation("new subjectTranslation").deptCode("new deptCode").collegeCode("new collegeCode").relatedDeptCode("new relatedDeptCode").inactive(false).id(5L).build();
        UCSBSubject correctUCSBSubject = UCSBSubject.builder().subjectCode("new subjectCode")
        .subjectTranslation("new subjectTranslation").deptCode("new deptCode").collegeCode("new collegeCode").relatedDeptCode("new relatedDeptCode").inactive(false).id(7L).build();

        String requestBody = mapper.writeValueAsString(updatedUCSBSubject);
        String expectedReturn = mapper.writeValueAsString(correctUCSBSubject);

        when(repository.findById(eq(7L))).thenReturn(Optional.of(ucsbSubject1));

        MvcResult response = mockMvc.perform(
                put("/api/UCSBSubjects?id=7")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        verify(repository, times(1)).findById(7L);
        verify(repository, times(1)).save(correctUCSBSubject); 
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedReturn, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__cannot_put_ucsbSubject_that_does_not_exist() throws Exception {

        UCSBSubject updatedUCSBSubject = UCSBSubject.builder().subjectCode("new subjectCode").subjectTranslation("new subjectTranslation").deptCode("new deptCode").collegeCode("new collegeCode").relatedDeptCode("new relatedDeptCode").inactive(false).id(5L).build();

        String requestBody = mapper.writeValueAsString(updatedUCSBSubject);
        when(repository.findById(eq(7L))).thenReturn(Optional.empty());

        MvcResult response = mockMvc.perform(
                put("/api/UCSBSubjects?id=7")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isBadRequest()).andReturn();

        verify(repository, times(1)).findById(7L);
        String responseString = response.getResponse().getContentAsString();
        assertEquals("record 7 not found", responseString);
    }
}

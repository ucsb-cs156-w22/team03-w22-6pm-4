package edu.ucsb.cs156.example.documents;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Metadata
{
    private String generated;
    private String url;
    private String title;
    private String status;
    private String api;
    private int count;
}

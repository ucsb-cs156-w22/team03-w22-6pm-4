package edu.ucsb.cs156.example.documents;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Features
{
    private String type;
    private Metadata metadata;
    private Iterable<Feature> features;
}

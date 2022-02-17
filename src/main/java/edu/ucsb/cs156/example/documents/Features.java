package edu.ucsb.cs156.example.documents;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "features")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Features
{
    // This identifier is used by 🥭 to uniquely identify a document.

    @Id
    private String _id;

    private String type;
    private Metadata metadata;
    private List<Feature> features;
}

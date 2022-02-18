package edu.ucsb.cs156.example.documents;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "earthquakes")
public class Feature
{
    // This identifier is used by 🥭 to uniquely identify a document.

    @Id
    private String _id;

    private String type;
    private Properties properties;
    private String id;
}

package edu.ucsb.cs156.example.documents;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Feature
{
    private String type;
    private Properties properties;
    private String id;
}

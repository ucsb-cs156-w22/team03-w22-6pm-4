package edu.ucsb.cs156.example.documents;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Properties
{
    // According to #25, we are interested in displaying only the title,
    // magnitute, place, and time.

    // https://github.com/ucsb-cs156-w22/team03-w22-6pm-4/issues/25

    /*
    "mag": 2.64,
    "place": "10km NW of Santa Paula, CA",
    "time": 1644539746380,
    ...
    "title": "M 2.6 - 10km NW of Santa Paula, CA"
    */

    // TODO: I don't want to store the `time` field in a Long because it may
    // overflow. Will convert it to a String. Is this going to cause a problem
    // when Jackson — not me, the library — tries to stuff a JSON object with a
    // JSON value of type number in it?

    // Answer: No, Jackson — not me, the library — has no problem coercing the
    // JSON data to the desired Java type, and will explode if it can't.

    // https://www.json.org/json-en.html

    private Double mag;
    private String place;
    private String time;
    private String title;
}

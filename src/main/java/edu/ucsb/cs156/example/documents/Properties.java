package edu.ucsb.cs156.example.documents;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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

    // I don't want to store the `time` field in a Long because it may overflow.
    // Will convert it to a String. Is this going to cause a problem when
    // Jackson — not me, the library — tries to stuff a JSON object with a
    // JSON value of type number in it?

    // https://www.json.org/json-en.html

    // I don't know how comfortable Jackson is with type conversions!

    private Double mag;
    private String place;
    private String time;
    private String title;
}

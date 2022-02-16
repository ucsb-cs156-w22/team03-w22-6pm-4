package edu.ucsb.cs156.example.entities;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "collegiate_subreddits")
public class CollegiateSubreddit {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  public long getId(){
    return id;
  }

  private String name;
  private String location;
  private String subreddit;

//   public static CollegiateSubreddit dummy(long id) {
//     CollegiateSubreddit subreddits = new CollegiateSubreddit();
//     subreddits.id = id;
//     subreddits.name = "reddit";
//     subreddits.location = "location";
//     subreddits.subreddit = "subreddit";
//     return subreddits;
// }
}

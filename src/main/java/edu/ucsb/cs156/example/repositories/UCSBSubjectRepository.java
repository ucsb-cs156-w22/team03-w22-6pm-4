package edu.ucsb.cs156.example.repositories;

//Imports taken from TodoRepository.java
//Not sure what each one does.

import edu.ucsb.cs156.example.entities.UCSBSubject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface UCSBSubjectRepository extends CrudRepository<UCSBSubject, Long>{
    //Omitted findBySubject, as it doesn't have a corresponding member.
}

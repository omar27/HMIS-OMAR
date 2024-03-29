package com.omar.hmis.repository;
import com.omar.hmis.domain.Stats;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stats entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatsRepository extends JpaRepository<Stats, Long> {

}

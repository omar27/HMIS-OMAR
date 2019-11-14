package com.omar.hmis.repository.search;
import com.omar.hmis.domain.Stats;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Stats} entity.
 */
public interface StatsSearchRepository extends ElasticsearchRepository<Stats, Long> {
}

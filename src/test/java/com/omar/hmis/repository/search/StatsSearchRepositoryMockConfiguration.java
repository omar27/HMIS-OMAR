package com.omar.hmis.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link StatsSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class StatsSearchRepositoryMockConfiguration {

    @MockBean
    private StatsSearchRepository mockStatsSearchRepository;

}

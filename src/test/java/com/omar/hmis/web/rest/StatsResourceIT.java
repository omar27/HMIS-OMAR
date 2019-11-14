package com.omar.hmis.web.rest;

import com.omar.hmis.HmisgatewayApp;
import com.omar.hmis.config.TestSecurityConfiguration;
import com.omar.hmis.domain.Stats;
import com.omar.hmis.repository.StatsRepository;
import com.omar.hmis.repository.search.StatsSearchRepository;
import com.omar.hmis.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.omar.hmis.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StatsResource} REST controller.
 */
@SpringBootTest(classes = {HmisgatewayApp.class, TestSecurityConfiguration.class})
public class StatsResourceIT {

    @Autowired
    private StatsRepository statsRepository;

    /**
     * This repository is mocked in the com.omar.hmis.repository.search test package.
     *
     * @see com.omar.hmis.repository.search.StatsSearchRepositoryMockConfiguration
     */
    @Autowired
    private StatsSearchRepository mockStatsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStatsMockMvc;

    private Stats stats;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatsResource statsResource = new StatsResource(statsRepository, mockStatsSearchRepository);
        this.restStatsMockMvc = MockMvcBuilders.standaloneSetup(statsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stats createEntity(EntityManager em) {
        Stats stats = new Stats();
        return stats;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stats createUpdatedEntity(EntityManager em) {
        Stats stats = new Stats();
        return stats;
    }

    @BeforeEach
    public void initTest() {
        stats = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllStats() throws Exception {
        // Initialize the database
        statsRepository.saveAndFlush(stats);

        // Get all the statsList
        restStatsMockMvc.perform(get("/api/stats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stats.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getStats() throws Exception {
        // Initialize the database
        statsRepository.saveAndFlush(stats);

        // Get the stats
        restStatsMockMvc.perform(get("/api/stats/{id}", stats.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stats.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStats() throws Exception {
        // Get the stats
        restStatsMockMvc.perform(get("/api/stats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void searchStats() throws Exception {
        // Initialize the database
        statsRepository.saveAndFlush(stats);
        when(mockStatsSearchRepository.search(queryStringQuery("id:" + stats.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(stats), PageRequest.of(0, 1), 1));
        // Search the stats
        restStatsMockMvc.perform(get("/api/_search/stats?query=id:" + stats.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stats.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stats.class);
        Stats stats1 = new Stats();
        stats1.setId(1L);
        Stats stats2 = new Stats();
        stats2.setId(stats1.getId());
        assertThat(stats1).isEqualTo(stats2);
        stats2.setId(2L);
        assertThat(stats1).isNotEqualTo(stats2);
        stats1.setId(null);
        assertThat(stats1).isNotEqualTo(stats2);
    }
}

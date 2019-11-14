package com.omar.hmis.web.rest;

import com.omar.hmis.domain.Stats;
import com.omar.hmis.repository.StatsRepository;
import com.omar.hmis.repository.search.StatsSearchRepository;
import com.omar.hmis.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.omar.hmis.domain.Stats}.
 */
@RestController
@RequestMapping("/api")
public class StatsResource {

    private final Logger log = LoggerFactory.getLogger(StatsResource.class);

    private final StatsRepository statsRepository;

    private final StatsSearchRepository statsSearchRepository;

    public StatsResource(StatsRepository statsRepository, StatsSearchRepository statsSearchRepository) {
        this.statsRepository = statsRepository;
        this.statsSearchRepository = statsSearchRepository;
    }

    /**
     * {@code GET  /stats} : get all the stats.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stats in body.
     */
    @GetMapping("/stats")
    public ResponseEntity<List<Stats>> getAllStats(Pageable pageable) {
        log.debug("REST request to get a page of Stats");
        Page<Stats> page = statsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /stats/:id} : get the "id" stats.
     *
     * @param id the id of the stats to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stats, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stats/{id}")
    public ResponseEntity<Stats> getStats(@PathVariable Long id) {
        log.debug("REST request to get Stats : {}", id);
        Optional<Stats> stats = statsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(stats);
    }

    /**
     * {@code SEARCH  /_search/stats?query=:query} : search for the stats corresponding
     * to the query.
     *
     * @param query the query of the stats search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/stats")
    public ResponseEntity<List<Stats>> searchStats(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Stats for query {}", query);
        Page<Stats> page = statsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}

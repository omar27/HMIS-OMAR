import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStats } from 'app/shared/model/stats.model';

@Component({
  selector: 'jhi-stats-detail',
  templateUrl: './stats-detail.component.html'
})
export class StatsDetailComponent implements OnInit {
  stats: IStats;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ stats }) => {
      this.stats = stats;
    });
  }

  previousState() {
    window.history.back();
  }
}

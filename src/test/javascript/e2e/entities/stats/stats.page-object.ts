import { element, by, ElementFinder } from 'protractor';

export class StatsComponentsPage {
  title = element.all(by.css('jhi-stats div h2#page-heading span')).first();

  async getTitle() {
    return this.title.getText();
  }
}

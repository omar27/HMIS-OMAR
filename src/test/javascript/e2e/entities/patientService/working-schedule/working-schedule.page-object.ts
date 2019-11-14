import { element, by, ElementFinder } from 'protractor';

export class WorkingScheduleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-working-schedule div table .btn-danger'));
  title = element.all(by.css('jhi-working-schedule div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class WorkingScheduleUpdatePage {
  pageTitle = element(by.id('jhi-working-schedule-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  daySelect = element(by.id('field_day'));
  isOffInput = element(by.id('field_isOff'));
  startTimeInput = element(by.id('field_startTime'));
  endInput = element(by.id('field_end'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDaySelect(day) {
    await this.daySelect.sendKeys(day);
  }

  async getDaySelect() {
    return await this.daySelect.element(by.css('option:checked')).getText();
  }

  async daySelectLastOption(timeout?: number) {
    await this.daySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  getIsOffInput(timeout?: number) {
    return this.isOffInput;
  }
  async setStartTimeInput(startTime) {
    await this.startTimeInput.sendKeys(startTime);
  }

  async getStartTimeInput() {
    return await this.startTimeInput.getAttribute('value');
  }

  async setEndInput(end) {
    await this.endInput.sendKeys(end);
  }

  async getEndInput() {
    return await this.endInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class WorkingScheduleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-workingSchedule-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-workingSchedule'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

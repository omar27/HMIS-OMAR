import { element, by, ElementFinder } from 'protractor';

export class StaffWorkingScheduleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-staff-working-schedule div table .btn-danger'));
  title = element.all(by.css('jhi-staff-working-schedule div h2#page-heading span')).first();

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

export class StaffWorkingScheduleUpdatePage {
  pageTitle = element(by.id('jhi-staff-working-schedule-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descriptionInput = element(by.id('field_description'));
  staffSelect = element(by.id('field_staff'));
  workingScheduleSelect = element(by.id('field_workingSchedule'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async staffSelectLastOption(timeout?: number) {
    await this.staffSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async staffSelectOption(option) {
    await this.staffSelect.sendKeys(option);
  }

  getStaffSelect(): ElementFinder {
    return this.staffSelect;
  }

  async getStaffSelectedOption() {
    return await this.staffSelect.element(by.css('option:checked')).getText();
  }

  async workingScheduleSelectLastOption(timeout?: number) {
    await this.workingScheduleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async workingScheduleSelectOption(option) {
    await this.workingScheduleSelect.sendKeys(option);
  }

  getWorkingScheduleSelect(): ElementFinder {
    return this.workingScheduleSelect;
  }

  async getWorkingScheduleSelectedOption() {
    return await this.workingScheduleSelect.element(by.css('option:checked')).getText();
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

export class StaffWorkingScheduleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-staffWorkingSchedule-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-staffWorkingSchedule'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

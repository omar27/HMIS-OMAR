import { element, by, ElementFinder } from 'protractor';

export class AppointmentScheduleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointment-schedule div table .btn-danger'));
  title = element.all(by.css('jhi-appointment-schedule div h2#page-heading span')).first();

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

export class AppointmentScheduleUpdatePage {
  pageTitle = element(by.id('jhi-appointment-schedule-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  statusSelect = element(by.id('field_status'));
  scheduledDateInput = element(by.id('field_scheduledDate'));
  patientSelect = element(by.id('field_patient'));
  staffSelect = element(by.id('field_staff'));
  scheduledBySelect = element(by.id('field_scheduledBy'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(timeout?: number) {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setScheduledDateInput(scheduledDate) {
    await this.scheduledDateInput.sendKeys(scheduledDate);
  }

  async getScheduledDateInput() {
    return await this.scheduledDateInput.getAttribute('value');
  }

  async patientSelectLastOption(timeout?: number) {
    await this.patientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async patientSelectOption(option) {
    await this.patientSelect.sendKeys(option);
  }

  getPatientSelect(): ElementFinder {
    return this.patientSelect;
  }

  async getPatientSelectedOption() {
    return await this.patientSelect.element(by.css('option:checked')).getText();
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

  async scheduledBySelectLastOption(timeout?: number) {
    await this.scheduledBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async scheduledBySelectOption(option) {
    await this.scheduledBySelect.sendKeys(option);
  }

  getScheduledBySelect(): ElementFinder {
    return this.scheduledBySelect;
  }

  async getScheduledBySelectedOption() {
    return await this.scheduledBySelect.element(by.css('option:checked')).getText();
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

export class AppointmentScheduleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointmentSchedule-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointmentSchedule'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

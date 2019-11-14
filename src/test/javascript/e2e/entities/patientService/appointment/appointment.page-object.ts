import { element, by, ElementFinder } from 'protractor';

export class AppointmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-appointment div table .btn-danger'));
  title = element.all(by.css('jhi-appointment div h2#page-heading span')).first();

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

export class AppointmentUpdatePage {
  pageTitle = element(by.id('jhi-appointment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  patientStatusSelect = element(by.id('field_patientStatus'));
  diseaseIdentifiedInput = element(by.id('field_diseaseIdentified'));
  cureSuggestedInput = element(by.id('field_cureSuggested'));
  testsSuggestedInput = element(by.id('field_testsSuggested'));
  appointmentScheduleSelect = element(by.id('field_appointmentSchedule'));
  billSelect = element(by.id('field_bill'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setPatientStatusSelect(patientStatus) {
    await this.patientStatusSelect.sendKeys(patientStatus);
  }

  async getPatientStatusSelect() {
    return await this.patientStatusSelect.element(by.css('option:checked')).getText();
  }

  async patientStatusSelectLastOption(timeout?: number) {
    await this.patientStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDiseaseIdentifiedInput(diseaseIdentified) {
    await this.diseaseIdentifiedInput.sendKeys(diseaseIdentified);
  }

  async getDiseaseIdentifiedInput() {
    return await this.diseaseIdentifiedInput.getAttribute('value');
  }

  async setCureSuggestedInput(cureSuggested) {
    await this.cureSuggestedInput.sendKeys(cureSuggested);
  }

  async getCureSuggestedInput() {
    return await this.cureSuggestedInput.getAttribute('value');
  }

  async setTestsSuggestedInput(testsSuggested) {
    await this.testsSuggestedInput.sendKeys(testsSuggested);
  }

  async getTestsSuggestedInput() {
    return await this.testsSuggestedInput.getAttribute('value');
  }

  async appointmentScheduleSelectLastOption(timeout?: number) {
    await this.appointmentScheduleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async appointmentScheduleSelectOption(option) {
    await this.appointmentScheduleSelect.sendKeys(option);
  }

  getAppointmentScheduleSelect(): ElementFinder {
    return this.appointmentScheduleSelect;
  }

  async getAppointmentScheduleSelectedOption() {
    return await this.appointmentScheduleSelect.element(by.css('option:checked')).getText();
  }

  async billSelectLastOption(timeout?: number) {
    await this.billSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async billSelectOption(option) {
    await this.billSelect.sendKeys(option);
  }

  getBillSelect(): ElementFinder {
    return this.billSelect;
  }

  async getBillSelectedOption() {
    return await this.billSelect.element(by.css('option:checked')).getText();
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

export class AppointmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appointment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appointment'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

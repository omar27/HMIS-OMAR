import { element, by, ElementFinder } from 'protractor';

export class InPatientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-in-patient div table .btn-danger'));
  title = element.all(by.css('jhi-in-patient div h2#page-heading span')).first();

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

export class InPatientUpdatePage {
  pageTitle = element(by.id('jhi-in-patient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  admitDateInput = element(by.id('field_admitDate'));
  dischargeDateInput = element(by.id('field_dischargeDate'));
  roomSelect = element(by.id('field_room'));
  suggestedBySelect = element(by.id('field_suggestedBy'));
  patientSelect = element(by.id('field_patient'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setAdmitDateInput(admitDate) {
    await this.admitDateInput.sendKeys(admitDate);
  }

  async getAdmitDateInput() {
    return await this.admitDateInput.getAttribute('value');
  }

  async setDischargeDateInput(dischargeDate) {
    await this.dischargeDateInput.sendKeys(dischargeDate);
  }

  async getDischargeDateInput() {
    return await this.dischargeDateInput.getAttribute('value');
  }

  async roomSelectLastOption(timeout?: number) {
    await this.roomSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async roomSelectOption(option) {
    await this.roomSelect.sendKeys(option);
  }

  getRoomSelect(): ElementFinder {
    return this.roomSelect;
  }

  async getRoomSelectedOption() {
    return await this.roomSelect.element(by.css('option:checked')).getText();
  }

  async suggestedBySelectLastOption(timeout?: number) {
    await this.suggestedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async suggestedBySelectOption(option) {
    await this.suggestedBySelect.sendKeys(option);
  }

  getSuggestedBySelect(): ElementFinder {
    return this.suggestedBySelect;
  }

  async getSuggestedBySelectedOption() {
    return await this.suggestedBySelect.element(by.css('option:checked')).getText();
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

export class InPatientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-inPatient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-inPatient'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

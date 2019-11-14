import { element, by, ElementFinder } from 'protractor';

export class PatientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-patient div table .btn-danger'));
  title = element.all(by.css('jhi-patient div h2#page-heading span')).first();

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

export class PatientUpdatePage {
  pageTitle = element(by.id('jhi-patient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  patientIdInput = element(by.id('field_patientId'));
  isRegularInput = element(by.id('field_isRegular'));
  departmentSelect = element(by.id('field_department'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setPatientIdInput(patientId) {
    await this.patientIdInput.sendKeys(patientId);
  }

  async getPatientIdInput() {
    return await this.patientIdInput.getAttribute('value');
  }

  getIsRegularInput(timeout?: number) {
    return this.isRegularInput;
  }

  async departmentSelectLastOption(timeout?: number) {
    await this.departmentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect(): ElementFinder {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return await this.departmentSelect.element(by.css('option:checked')).getText();
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

export class PatientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-patient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-patient'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

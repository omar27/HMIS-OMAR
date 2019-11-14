import { element, by, ElementFinder } from 'protractor';

export class JobDetailsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-job-details div table .btn-danger'));
  title = element.all(by.css('jhi-job-details div h2#page-heading span')).first();

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

export class JobDetailsUpdatePage {
  pageTitle = element(by.id('jhi-job-details-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  designationInput = element(by.id('field_designation'));
  gradeInput = element(by.id('field_grade'));
  typeSelect = element(by.id('field_type'));
  salaryInput = element(by.id('field_salary'));
  detailsInput = element(by.id('field_details'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDesignationInput(designation) {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput() {
    return await this.designationInput.getAttribute('value');
  }

  async setGradeInput(grade) {
    await this.gradeInput.sendKeys(grade);
  }

  async getGradeInput() {
    return await this.gradeInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(timeout?: number) {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setSalaryInput(salary) {
    await this.salaryInput.sendKeys(salary);
  }

  async getSalaryInput() {
    return await this.salaryInput.getAttribute('value');
  }

  async setDetailsInput(details) {
    await this.detailsInput.sendKeys(details);
  }

  async getDetailsInput() {
    return await this.detailsInput.getAttribute('value');
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

export class JobDetailsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-jobDetails-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-jobDetails'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

import { element, by, ElementFinder } from 'protractor';

export class InpatientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-inpatient div table .btn-danger'));
  title = element.all(by.css('jhi-inpatient div h2#page-heading span')).first();

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

export class InpatientUpdatePage {
  pageTitle = element(by.id('jhi-inpatient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  admitDateInput = element(by.id('field_admitDate'));
  dischargeDateInput = element(by.id('field_dischargeDate'));

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

export class InpatientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-inpatient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-inpatient'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

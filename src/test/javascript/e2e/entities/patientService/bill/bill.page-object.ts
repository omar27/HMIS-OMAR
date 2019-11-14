import { element, by, ElementFinder } from 'protractor';

export class BillComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bill div table .btn-danger'));
  title = element.all(by.css('jhi-bill div h2#page-heading span')).first();

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

export class BillUpdatePage {
  pageTitle = element(by.id('jhi-bill-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  doctorFeeInput = element(by.id('field_doctorFee'));
  medicineChargesInput = element(by.id('field_medicineCharges'));
  testsFeeInput = element(by.id('field_testsFee'));
  roomChargesInput = element(by.id('field_roomCharges'));
  otherChargesInput = element(by.id('field_otherCharges'));
  totalBillInput = element(by.id('field_totalBill'));
  paidStatusSelect = element(by.id('field_paidStatus'));
  patientSelect = element(by.id('field_patient'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setDoctorFeeInput(doctorFee) {
    await this.doctorFeeInput.sendKeys(doctorFee);
  }

  async getDoctorFeeInput() {
    return await this.doctorFeeInput.getAttribute('value');
  }

  async setMedicineChargesInput(medicineCharges) {
    await this.medicineChargesInput.sendKeys(medicineCharges);
  }

  async getMedicineChargesInput() {
    return await this.medicineChargesInput.getAttribute('value');
  }

  async setTestsFeeInput(testsFee) {
    await this.testsFeeInput.sendKeys(testsFee);
  }

  async getTestsFeeInput() {
    return await this.testsFeeInput.getAttribute('value');
  }

  async setRoomChargesInput(roomCharges) {
    await this.roomChargesInput.sendKeys(roomCharges);
  }

  async getRoomChargesInput() {
    return await this.roomChargesInput.getAttribute('value');
  }

  async setOtherChargesInput(otherCharges) {
    await this.otherChargesInput.sendKeys(otherCharges);
  }

  async getOtherChargesInput() {
    return await this.otherChargesInput.getAttribute('value');
  }

  async setTotalBillInput(totalBill) {
    await this.totalBillInput.sendKeys(totalBill);
  }

  async getTotalBillInput() {
    return await this.totalBillInput.getAttribute('value');
  }

  async setPaidStatusSelect(paidStatus) {
    await this.paidStatusSelect.sendKeys(paidStatus);
  }

  async getPaidStatusSelect() {
    return await this.paidStatusSelect.element(by.css('option:checked')).getText();
  }

  async paidStatusSelectLastOption(timeout?: number) {
    await this.paidStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class BillDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bill-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bill'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

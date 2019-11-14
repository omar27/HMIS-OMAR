import { element, by, ElementFinder } from 'protractor';

export class StaffComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-staff div table .btn-danger'));
  title = element.all(by.css('jhi-staff div h2#page-heading span')).first();

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

export class StaffUpdatePage {
  pageTitle = element(by.id('jhi-staff-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  staffTypeSelect = element(by.id('field_staffType'));
  qualificationInput = element(by.id('field_qualification'));
  joiningDateInput = element(by.id('field_joiningDate'));
  experienceInput = element(by.id('field_experience'));
  isRegularInput = element(by.id('field_isRegular'));
  departmentSelect = element(by.id('field_department'));
  jobDetailsSelect = element(by.id('field_jobDetails'));
  staffWorkingScheduleSelect = element(by.id('field_staffWorkingSchedule'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setStaffTypeSelect(staffType) {
    await this.staffTypeSelect.sendKeys(staffType);
  }

  async getStaffTypeSelect() {
    return await this.staffTypeSelect.element(by.css('option:checked')).getText();
  }

  async staffTypeSelectLastOption(timeout?: number) {
    await this.staffTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setQualificationInput(qualification) {
    await this.qualificationInput.sendKeys(qualification);
  }

  async getQualificationInput() {
    return await this.qualificationInput.getAttribute('value');
  }

  async setJoiningDateInput(joiningDate) {
    await this.joiningDateInput.sendKeys(joiningDate);
  }

  async getJoiningDateInput() {
    return await this.joiningDateInput.getAttribute('value');
  }

  async setExperienceInput(experience) {
    await this.experienceInput.sendKeys(experience);
  }

  async getExperienceInput() {
    return await this.experienceInput.getAttribute('value');
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

  async jobDetailsSelectLastOption(timeout?: number) {
    await this.jobDetailsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async jobDetailsSelectOption(option) {
    await this.jobDetailsSelect.sendKeys(option);
  }

  getJobDetailsSelect(): ElementFinder {
    return this.jobDetailsSelect;
  }

  async getJobDetailsSelectedOption() {
    return await this.jobDetailsSelect.element(by.css('option:checked')).getText();
  }

  async staffWorkingScheduleSelectLastOption(timeout?: number) {
    await this.staffWorkingScheduleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async staffWorkingScheduleSelectOption(option) {
    await this.staffWorkingScheduleSelect.sendKeys(option);
  }

  getStaffWorkingScheduleSelect(): ElementFinder {
    return this.staffWorkingScheduleSelect;
  }

  async getStaffWorkingScheduleSelectedOption() {
    return await this.staffWorkingScheduleSelect.element(by.css('option:checked')).getText();
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

export class StaffDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-staff-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-staff'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

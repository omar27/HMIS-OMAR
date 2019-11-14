import { element, by, ElementFinder } from 'protractor';

export class PersonalInfoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-personal-info div table .btn-danger'));
  title = element.all(by.css('jhi-personal-info div h2#page-heading span')).first();

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

export class PersonalInfoUpdatePage {
  pageTitle = element(by.id('jhi-personal-info-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  cnicInput = element(by.id('field_cnic'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  emailInput = element(by.id('field_email'));
  genderSelect = element(by.id('field_gender'));
  ageInput = element(by.id('field_age'));
  addressInput = element(by.id('field_address'));
  cityInput = element(by.id('field_city'));
  entityTypeSelect = element(by.id('field_entityType'));
  entityIdInput = element(by.id('field_entityId'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCnicInput(cnic) {
    await this.cnicInput.sendKeys(cnic);
  }

  async getCnicInput() {
    return await this.cnicInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(timeout?: number) {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setAgeInput(age) {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput() {
    return await this.ageInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return await this.addressInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return await this.cityInput.getAttribute('value');
  }

  async setEntityTypeSelect(entityType) {
    await this.entityTypeSelect.sendKeys(entityType);
  }

  async getEntityTypeSelect() {
    return await this.entityTypeSelect.element(by.css('option:checked')).getText();
  }

  async entityTypeSelectLastOption(timeout?: number) {
    await this.entityTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setEntityIdInput(entityId) {
    await this.entityIdInput.sendKeys(entityId);
  }

  async getEntityIdInput() {
    return await this.entityIdInput.getAttribute('value');
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

export class PersonalInfoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-personalInfo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-personalInfo'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

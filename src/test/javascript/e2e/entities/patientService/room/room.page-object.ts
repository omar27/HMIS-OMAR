import { element, by, ElementFinder } from 'protractor';

export class RoomComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-room div table .btn-danger'));
  title = element.all(by.css('jhi-room div h2#page-heading span')).first();

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

export class RoomUpdatePage {
  pageTitle = element(by.id('jhi-room-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  categorySelect = element(by.id('field_category'));
  rentInput = element(by.id('field_rent'));
  roomIdInput = element(by.id('field_roomId'));
  availablityInput = element(by.id('field_availablity'));
  departmentSelect = element(by.id('field_department'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption(timeout?: number) {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setRentInput(rent) {
    await this.rentInput.sendKeys(rent);
  }

  async getRentInput() {
    return await this.rentInput.getAttribute('value');
  }

  async setRoomIdInput(roomId) {
    await this.roomIdInput.sendKeys(roomId);
  }

  async getRoomIdInput() {
    return await this.roomIdInput.getAttribute('value');
  }

  getAvailablityInput(timeout?: number) {
    return this.availablityInput;
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

export class RoomDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-room-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-room'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

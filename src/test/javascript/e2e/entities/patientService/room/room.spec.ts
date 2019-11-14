// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  RoomComponentsPage,
  /* RoomDeleteDialog,
   */ RoomUpdatePage
} from './room.page-object';

const expect = chai.expect;

describe('Room e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let roomComponentsPage: RoomComponentsPage;
  let roomUpdatePage: RoomUpdatePage;
  /* let roomDeleteDialog: RoomDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Rooms', async () => {
    await navBarPage.goToEntity('room');
    roomComponentsPage = new RoomComponentsPage();
    await browser.wait(ec.visibilityOf(roomComponentsPage.title), 5000);
    expect(await roomComponentsPage.getTitle()).to.eq('Rooms');
  });

  it('should load create Room page', async () => {
    await roomComponentsPage.clickOnCreateButton();
    roomUpdatePage = new RoomUpdatePage();
    expect(await roomUpdatePage.getPageTitle()).to.eq('Create or edit a Room');
    await roomUpdatePage.cancel();
  });

  /*  it('should create and save Rooms', async () => {
        const nbButtonsBeforeCreate = await roomComponentsPage.countDeleteButtons();

        await roomComponentsPage.clickOnCreateButton();
        await promise.all([
            roomUpdatePage.categorySelectLastOption(),
            roomUpdatePage.setRentInput('5'),
            roomUpdatePage.setRoomIdInput('roomId'),
            roomUpdatePage.departmentSelectLastOption(),
        ]);
        expect(await roomUpdatePage.getRentInput()).to.eq('5', 'Expected rent value to be equals to 5');
        expect(await roomUpdatePage.getRoomIdInput()).to.eq('roomId', 'Expected RoomId value to be equals to roomId');
        const selectedAvailablity = roomUpdatePage.getAvailablityInput();
        if (await selectedAvailablity.isSelected()) {
            await roomUpdatePage.getAvailablityInput().click();
            expect(await roomUpdatePage.getAvailablityInput().isSelected(), 'Expected availablity not to be selected').to.be.false;
        } else {
            await roomUpdatePage.getAvailablityInput().click();
            expect(await roomUpdatePage.getAvailablityInput().isSelected(), 'Expected availablity to be selected').to.be.true;
        }
        await roomUpdatePage.save();
        expect(await roomUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await roomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Room', async () => {
        const nbButtonsBeforeDelete = await roomComponentsPage.countDeleteButtons();
        await roomComponentsPage.clickOnLastDeleteButton();

        roomDeleteDialog = new RoomDeleteDialog();
        expect(await roomDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Room?');
        await roomDeleteDialog.clickOnConfirmButton();

        expect(await roomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

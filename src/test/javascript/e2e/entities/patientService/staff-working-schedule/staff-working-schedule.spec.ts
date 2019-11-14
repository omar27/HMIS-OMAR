// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  StaffWorkingScheduleComponentsPage,
  /* StaffWorkingScheduleDeleteDialog,
   */ StaffWorkingScheduleUpdatePage
} from './staff-working-schedule.page-object';

const expect = chai.expect;

describe('StaffWorkingSchedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let staffWorkingScheduleComponentsPage: StaffWorkingScheduleComponentsPage;
  let staffWorkingScheduleUpdatePage: StaffWorkingScheduleUpdatePage;
  /* let staffWorkingScheduleDeleteDialog: StaffWorkingScheduleDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StaffWorkingSchedules', async () => {
    await navBarPage.goToEntity('staff-working-schedule');
    staffWorkingScheduleComponentsPage = new StaffWorkingScheduleComponentsPage();
    await browser.wait(ec.visibilityOf(staffWorkingScheduleComponentsPage.title), 5000);
    expect(await staffWorkingScheduleComponentsPage.getTitle()).to.eq('Staff Working Schedules');
  });

  it('should load create StaffWorkingSchedule page', async () => {
    await staffWorkingScheduleComponentsPage.clickOnCreateButton();
    staffWorkingScheduleUpdatePage = new StaffWorkingScheduleUpdatePage();
    expect(await staffWorkingScheduleUpdatePage.getPageTitle()).to.eq('Create or edit a Staff Working Schedule');
    await staffWorkingScheduleUpdatePage.cancel();
  });

  /*  it('should create and save StaffWorkingSchedules', async () => {
        const nbButtonsBeforeCreate = await staffWorkingScheduleComponentsPage.countDeleteButtons();

        await staffWorkingScheduleComponentsPage.clickOnCreateButton();
        await promise.all([
            staffWorkingScheduleUpdatePage.setDescriptionInput('description'),
            staffWorkingScheduleUpdatePage.staffSelectLastOption(),
            staffWorkingScheduleUpdatePage.workingScheduleSelectLastOption(),
        ]);
        expect(await staffWorkingScheduleUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        await staffWorkingScheduleUpdatePage.save();
        expect(await staffWorkingScheduleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await staffWorkingScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last StaffWorkingSchedule', async () => {
        const nbButtonsBeforeDelete = await staffWorkingScheduleComponentsPage.countDeleteButtons();
        await staffWorkingScheduleComponentsPage.clickOnLastDeleteButton();

        staffWorkingScheduleDeleteDialog = new StaffWorkingScheduleDeleteDialog();
        expect(await staffWorkingScheduleDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Staff Working Schedule?');
        await staffWorkingScheduleDeleteDialog.clickOnConfirmButton();

        expect(await staffWorkingScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

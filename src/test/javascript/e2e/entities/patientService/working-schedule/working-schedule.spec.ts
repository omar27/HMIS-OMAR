// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WorkingScheduleComponentsPage, WorkingScheduleDeleteDialog, WorkingScheduleUpdatePage } from './working-schedule.page-object';

const expect = chai.expect;

describe('WorkingSchedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workingScheduleComponentsPage: WorkingScheduleComponentsPage;
  let workingScheduleUpdatePage: WorkingScheduleUpdatePage;
  let workingScheduleDeleteDialog: WorkingScheduleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WorkingSchedules', async () => {
    await navBarPage.goToEntity('working-schedule');
    workingScheduleComponentsPage = new WorkingScheduleComponentsPage();
    await browser.wait(ec.visibilityOf(workingScheduleComponentsPage.title), 5000);
    expect(await workingScheduleComponentsPage.getTitle()).to.eq('Working Schedules');
  });

  it('should load create WorkingSchedule page', async () => {
    await workingScheduleComponentsPage.clickOnCreateButton();
    workingScheduleUpdatePage = new WorkingScheduleUpdatePage();
    expect(await workingScheduleUpdatePage.getPageTitle()).to.eq('Create or edit a Working Schedule');
    await workingScheduleUpdatePage.cancel();
  });

  it('should create and save WorkingSchedules', async () => {
    const nbButtonsBeforeCreate = await workingScheduleComponentsPage.countDeleteButtons();

    await workingScheduleComponentsPage.clickOnCreateButton();
    await promise.all([
      workingScheduleUpdatePage.daySelectLastOption(),
      workingScheduleUpdatePage.setStartTimeInput('startTime'),
      workingScheduleUpdatePage.setEndInput('end')
    ]);
    const selectedIsOff = workingScheduleUpdatePage.getIsOffInput();
    if (await selectedIsOff.isSelected()) {
      await workingScheduleUpdatePage.getIsOffInput().click();
      expect(await workingScheduleUpdatePage.getIsOffInput().isSelected(), 'Expected isOff not to be selected').to.be.false;
    } else {
      await workingScheduleUpdatePage.getIsOffInput().click();
      expect(await workingScheduleUpdatePage.getIsOffInput().isSelected(), 'Expected isOff to be selected').to.be.true;
    }
    expect(await workingScheduleUpdatePage.getStartTimeInput()).to.eq('startTime', 'Expected StartTime value to be equals to startTime');
    expect(await workingScheduleUpdatePage.getEndInput()).to.eq('end', 'Expected End value to be equals to end');
    await workingScheduleUpdatePage.save();
    expect(await workingScheduleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await workingScheduleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last WorkingSchedule', async () => {
    const nbButtonsBeforeDelete = await workingScheduleComponentsPage.countDeleteButtons();
    await workingScheduleComponentsPage.clickOnLastDeleteButton();

    workingScheduleDeleteDialog = new WorkingScheduleDeleteDialog();
    expect(await workingScheduleDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Working Schedule?');
    await workingScheduleDeleteDialog.clickOnConfirmButton();

    expect(await workingScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

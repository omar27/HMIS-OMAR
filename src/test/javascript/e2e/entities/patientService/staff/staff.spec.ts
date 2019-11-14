// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  StaffComponentsPage,
  /* StaffDeleteDialog,
   */ StaffUpdatePage
} from './staff.page-object';

const expect = chai.expect;

describe('Staff e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let staffComponentsPage: StaffComponentsPage;
  let staffUpdatePage: StaffUpdatePage;
  /* let staffDeleteDialog: StaffDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Staff', async () => {
    await navBarPage.goToEntity('staff');
    staffComponentsPage = new StaffComponentsPage();
    await browser.wait(ec.visibilityOf(staffComponentsPage.title), 5000);
    expect(await staffComponentsPage.getTitle()).to.eq('Staff');
  });

  it('should load create Staff page', async () => {
    await staffComponentsPage.clickOnCreateButton();
    staffUpdatePage = new StaffUpdatePage();
    expect(await staffUpdatePage.getPageTitle()).to.eq('Create or edit a Staff');
    await staffUpdatePage.cancel();
  });

  /*  it('should create and save Staff', async () => {
        const nbButtonsBeforeCreate = await staffComponentsPage.countDeleteButtons();

        await staffComponentsPage.clickOnCreateButton();
        await promise.all([
            staffUpdatePage.staffTypeSelectLastOption(),
            staffUpdatePage.setQualificationInput('qualification'),
            staffUpdatePage.setJoiningDateInput('2000-12-31'),
            staffUpdatePage.setExperienceInput('5'),
            staffUpdatePage.departmentSelectLastOption(),
            staffUpdatePage.jobDetailsSelectLastOption(),
            staffUpdatePage.staffWorkingScheduleSelectLastOption(),
        ]);
        expect(await staffUpdatePage.getQualificationInput()).to.eq('qualification', 'Expected Qualification value to be equals to qualification');
        expect(await staffUpdatePage.getJoiningDateInput()).to.eq('2000-12-31', 'Expected joiningDate value to be equals to 2000-12-31');
        expect(await staffUpdatePage.getExperienceInput()).to.eq('5', 'Expected experience value to be equals to 5');
        const selectedIsRegular = staffUpdatePage.getIsRegularInput();
        if (await selectedIsRegular.isSelected()) {
            await staffUpdatePage.getIsRegularInput().click();
            expect(await staffUpdatePage.getIsRegularInput().isSelected(), 'Expected isRegular not to be selected').to.be.false;
        } else {
            await staffUpdatePage.getIsRegularInput().click();
            expect(await staffUpdatePage.getIsRegularInput().isSelected(), 'Expected isRegular to be selected').to.be.true;
        }
        await staffUpdatePage.save();
        expect(await staffUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await staffComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Staff', async () => {
        const nbButtonsBeforeDelete = await staffComponentsPage.countDeleteButtons();
        await staffComponentsPage.clickOnLastDeleteButton();

        staffDeleteDialog = new StaffDeleteDialog();
        expect(await staffDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Staff?');
        await staffDeleteDialog.clickOnConfirmButton();

        expect(await staffComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

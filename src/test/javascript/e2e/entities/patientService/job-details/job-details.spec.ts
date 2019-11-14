// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JobDetailsComponentsPage, JobDetailsDeleteDialog, JobDetailsUpdatePage } from './job-details.page-object';

const expect = chai.expect;

describe('JobDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobDetailsComponentsPage: JobDetailsComponentsPage;
  let jobDetailsUpdatePage: JobDetailsUpdatePage;
  let jobDetailsDeleteDialog: JobDetailsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load JobDetails', async () => {
    await navBarPage.goToEntity('job-details');
    jobDetailsComponentsPage = new JobDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(jobDetailsComponentsPage.title), 5000);
    expect(await jobDetailsComponentsPage.getTitle()).to.eq('Job Details');
  });

  it('should load create JobDetails page', async () => {
    await jobDetailsComponentsPage.clickOnCreateButton();
    jobDetailsUpdatePage = new JobDetailsUpdatePage();
    expect(await jobDetailsUpdatePage.getPageTitle()).to.eq('Create or edit a Job Details');
    await jobDetailsUpdatePage.cancel();
  });

  it('should create and save JobDetails', async () => {
    const nbButtonsBeforeCreate = await jobDetailsComponentsPage.countDeleteButtons();

    await jobDetailsComponentsPage.clickOnCreateButton();
    await promise.all([
      jobDetailsUpdatePage.setDesignationInput('designation'),
      jobDetailsUpdatePage.setGradeInput('5'),
      jobDetailsUpdatePage.typeSelectLastOption(),
      jobDetailsUpdatePage.setSalaryInput('5'),
      jobDetailsUpdatePage.setDetailsInput('details')
    ]);
    expect(await jobDetailsUpdatePage.getDesignationInput()).to.eq('designation', 'Expected Designation value to be equals to designation');
    expect(await jobDetailsUpdatePage.getGradeInput()).to.eq('5', 'Expected grade value to be equals to 5');
    expect(await jobDetailsUpdatePage.getSalaryInput()).to.eq('5', 'Expected salary value to be equals to 5');
    expect(await jobDetailsUpdatePage.getDetailsInput()).to.eq('details', 'Expected Details value to be equals to details');
    await jobDetailsUpdatePage.save();
    expect(await jobDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await jobDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last JobDetails', async () => {
    const nbButtonsBeforeDelete = await jobDetailsComponentsPage.countDeleteButtons();
    await jobDetailsComponentsPage.clickOnLastDeleteButton();

    jobDetailsDeleteDialog = new JobDetailsDeleteDialog();
    expect(await jobDetailsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Job Details?');
    await jobDetailsDeleteDialog.clickOnConfirmButton();

    expect(await jobDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

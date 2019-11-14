// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InpatientComponentsPage, InpatientDeleteDialog, InpatientUpdatePage } from './inpatient.page-object';

const expect = chai.expect;

describe('Inpatient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inpatientComponentsPage: InpatientComponentsPage;
  let inpatientUpdatePage: InpatientUpdatePage;
  let inpatientDeleteDialog: InpatientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Inpatients', async () => {
    await navBarPage.goToEntity('inpatient');
    inpatientComponentsPage = new InpatientComponentsPage();
    await browser.wait(ec.visibilityOf(inpatientComponentsPage.title), 5000);
    expect(await inpatientComponentsPage.getTitle()).to.eq('Inpatients');
  });

  it('should load create Inpatient page', async () => {
    await inpatientComponentsPage.clickOnCreateButton();
    inpatientUpdatePage = new InpatientUpdatePage();
    expect(await inpatientUpdatePage.getPageTitle()).to.eq('Create or edit a Inpatient');
    await inpatientUpdatePage.cancel();
  });

  it('should create and save Inpatients', async () => {
    const nbButtonsBeforeCreate = await inpatientComponentsPage.countDeleteButtons();

    await inpatientComponentsPage.clickOnCreateButton();
    await promise.all([inpatientUpdatePage.setAdmitDateInput('2000-12-31'), inpatientUpdatePage.setDischargeDateInput('2000-12-31')]);
    expect(await inpatientUpdatePage.getAdmitDateInput()).to.eq('2000-12-31', 'Expected admitDate value to be equals to 2000-12-31');
    expect(await inpatientUpdatePage.getDischargeDateInput()).to.eq(
      '2000-12-31',
      'Expected dischargeDate value to be equals to 2000-12-31'
    );
    await inpatientUpdatePage.save();
    expect(await inpatientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await inpatientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Inpatient', async () => {
    const nbButtonsBeforeDelete = await inpatientComponentsPage.countDeleteButtons();
    await inpatientComponentsPage.clickOnLastDeleteButton();

    inpatientDeleteDialog = new InpatientDeleteDialog();
    expect(await inpatientDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Inpatient?');
    await inpatientDeleteDialog.clickOnConfirmButton();

    expect(await inpatientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

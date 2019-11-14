// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  InPatientComponentsPage,
  /* InPatientDeleteDialog,
   */ InPatientUpdatePage
} from './in-patient.page-object';

const expect = chai.expect;

describe('InPatient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inPatientComponentsPage: InPatientComponentsPage;
  let inPatientUpdatePage: InPatientUpdatePage;
  /* let inPatientDeleteDialog: InPatientDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InPatients', async () => {
    await navBarPage.goToEntity('in-patient');
    inPatientComponentsPage = new InPatientComponentsPage();
    await browser.wait(ec.visibilityOf(inPatientComponentsPage.title), 5000);
    expect(await inPatientComponentsPage.getTitle()).to.eq('In Patients');
  });

  it('should load create InPatient page', async () => {
    await inPatientComponentsPage.clickOnCreateButton();
    inPatientUpdatePage = new InPatientUpdatePage();
    expect(await inPatientUpdatePage.getPageTitle()).to.eq('Create or edit a In Patient');
    await inPatientUpdatePage.cancel();
  });

  /*  it('should create and save InPatients', async () => {
        const nbButtonsBeforeCreate = await inPatientComponentsPage.countDeleteButtons();

        await inPatientComponentsPage.clickOnCreateButton();
        await promise.all([
            inPatientUpdatePage.setAdmitDateInput('2000-12-31'),
            inPatientUpdatePage.setDischargeDateInput('2000-12-31'),
            inPatientUpdatePage.roomSelectLastOption(),
            inPatientUpdatePage.suggestedBySelectLastOption(),
            inPatientUpdatePage.patientSelectLastOption(),
        ]);
        expect(await inPatientUpdatePage.getAdmitDateInput()).to.eq('2000-12-31', 'Expected admitDate value to be equals to 2000-12-31');
        expect(await inPatientUpdatePage.getDischargeDateInput()).to.eq('2000-12-31', 'Expected dischargeDate value to be equals to 2000-12-31');
        await inPatientUpdatePage.save();
        expect(await inPatientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await inPatientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last InPatient', async () => {
        const nbButtonsBeforeDelete = await inPatientComponentsPage.countDeleteButtons();
        await inPatientComponentsPage.clickOnLastDeleteButton();

        inPatientDeleteDialog = new InPatientDeleteDialog();
        expect(await inPatientDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this In Patient?');
        await inPatientDeleteDialog.clickOnConfirmButton();

        expect(await inPatientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  PatientComponentsPage,
  /* PatientDeleteDialog,
   */ PatientUpdatePage
} from './patient.page-object';

const expect = chai.expect;

describe('Patient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let patientComponentsPage: PatientComponentsPage;
  let patientUpdatePage: PatientUpdatePage;
  /* let patientDeleteDialog: PatientDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Patients', async () => {
    await navBarPage.goToEntity('patient');
    patientComponentsPage = new PatientComponentsPage();
    await browser.wait(ec.visibilityOf(patientComponentsPage.title), 5000);
    expect(await patientComponentsPage.getTitle()).to.eq('Patients');
  });

  it('should load create Patient page', async () => {
    await patientComponentsPage.clickOnCreateButton();
    patientUpdatePage = new PatientUpdatePage();
    expect(await patientUpdatePage.getPageTitle()).to.eq('Create or edit a Patient');
    await patientUpdatePage.cancel();
  });

  /*  it('should create and save Patients', async () => {
        const nbButtonsBeforeCreate = await patientComponentsPage.countDeleteButtons();

        await patientComponentsPage.clickOnCreateButton();
        await promise.all([
            patientUpdatePage.setPatientIdInput('patientId'),
            patientUpdatePage.departmentSelectLastOption(),
        ]);
        expect(await patientUpdatePage.getPatientIdInput()).to.eq('patientId', 'Expected PatientId value to be equals to patientId');
        const selectedIsRegular = patientUpdatePage.getIsRegularInput();
        if (await selectedIsRegular.isSelected()) {
            await patientUpdatePage.getIsRegularInput().click();
            expect(await patientUpdatePage.getIsRegularInput().isSelected(), 'Expected isRegular not to be selected').to.be.false;
        } else {
            await patientUpdatePage.getIsRegularInput().click();
            expect(await patientUpdatePage.getIsRegularInput().isSelected(), 'Expected isRegular to be selected').to.be.true;
        }
        await patientUpdatePage.save();
        expect(await patientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Patient', async () => {
        const nbButtonsBeforeDelete = await patientComponentsPage.countDeleteButtons();
        await patientComponentsPage.clickOnLastDeleteButton();

        patientDeleteDialog = new PatientDeleteDialog();
        expect(await patientDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Patient?');
        await patientDeleteDialog.clickOnConfirmButton();

        expect(await patientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

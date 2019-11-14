// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AppointmentComponentsPage,
  /* AppointmentDeleteDialog,
   */ AppointmentUpdatePage
} from './appointment.page-object';

const expect = chai.expect;

describe('Appointment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentComponentsPage: AppointmentComponentsPage;
  let appointmentUpdatePage: AppointmentUpdatePage;
  /* let appointmentDeleteDialog: AppointmentDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Appointments', async () => {
    await navBarPage.goToEntity('appointment');
    appointmentComponentsPage = new AppointmentComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentComponentsPage.title), 5000);
    expect(await appointmentComponentsPage.getTitle()).to.eq('Appointments');
  });

  it('should load create Appointment page', async () => {
    await appointmentComponentsPage.clickOnCreateButton();
    appointmentUpdatePage = new AppointmentUpdatePage();
    expect(await appointmentUpdatePage.getPageTitle()).to.eq('Create or edit a Appointment');
    await appointmentUpdatePage.cancel();
  });

  /*  it('should create and save Appointments', async () => {
        const nbButtonsBeforeCreate = await appointmentComponentsPage.countDeleteButtons();

        await appointmentComponentsPage.clickOnCreateButton();
        await promise.all([
            appointmentUpdatePage.patientStatusSelectLastOption(),
            appointmentUpdatePage.setDiseaseIdentifiedInput('diseaseIdentified'),
            appointmentUpdatePage.setCureSuggestedInput('cureSuggested'),
            appointmentUpdatePage.setTestsSuggestedInput('testsSuggested'),
            appointmentUpdatePage.appointmentScheduleSelectLastOption(),
            appointmentUpdatePage.billSelectLastOption(),
        ]);
        expect(await appointmentUpdatePage.getDiseaseIdentifiedInput()).to.eq('diseaseIdentified', 'Expected DiseaseIdentified value to be equals to diseaseIdentified');
        expect(await appointmentUpdatePage.getCureSuggestedInput()).to.eq('cureSuggested', 'Expected CureSuggested value to be equals to cureSuggested');
        expect(await appointmentUpdatePage.getTestsSuggestedInput()).to.eq('testsSuggested', 'Expected TestsSuggested value to be equals to testsSuggested');
        await appointmentUpdatePage.save();
        expect(await appointmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Appointment', async () => {
        const nbButtonsBeforeDelete = await appointmentComponentsPage.countDeleteButtons();
        await appointmentComponentsPage.clickOnLastDeleteButton();

        appointmentDeleteDialog = new AppointmentDeleteDialog();
        expect(await appointmentDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Appointment?');
        await appointmentDeleteDialog.clickOnConfirmButton();

        expect(await appointmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AppointmentScheduleComponentsPage,
  /* AppointmentScheduleDeleteDialog,
   */ AppointmentScheduleUpdatePage
} from './appointment-schedule.page-object';

const expect = chai.expect;

describe('AppointmentSchedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appointmentScheduleComponentsPage: AppointmentScheduleComponentsPage;
  let appointmentScheduleUpdatePage: AppointmentScheduleUpdatePage;
  /* let appointmentScheduleDeleteDialog: AppointmentScheduleDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppointmentSchedules', async () => {
    await navBarPage.goToEntity('appointment-schedule');
    appointmentScheduleComponentsPage = new AppointmentScheduleComponentsPage();
    await browser.wait(ec.visibilityOf(appointmentScheduleComponentsPage.title), 5000);
    expect(await appointmentScheduleComponentsPage.getTitle()).to.eq('Appointment Schedules');
  });

  it('should load create AppointmentSchedule page', async () => {
    await appointmentScheduleComponentsPage.clickOnCreateButton();
    appointmentScheduleUpdatePage = new AppointmentScheduleUpdatePage();
    expect(await appointmentScheduleUpdatePage.getPageTitle()).to.eq('Create or edit a Appointment Schedule');
    await appointmentScheduleUpdatePage.cancel();
  });

  /*  it('should create and save AppointmentSchedules', async () => {
        const nbButtonsBeforeCreate = await appointmentScheduleComponentsPage.countDeleteButtons();

        await appointmentScheduleComponentsPage.clickOnCreateButton();
        await promise.all([
            appointmentScheduleUpdatePage.statusSelectLastOption(),
            appointmentScheduleUpdatePage.setScheduledDateInput('2000-12-31'),
            appointmentScheduleUpdatePage.patientSelectLastOption(),
            appointmentScheduleUpdatePage.staffSelectLastOption(),
            appointmentScheduleUpdatePage.scheduledBySelectLastOption(),
        ]);
        expect(await appointmentScheduleUpdatePage.getScheduledDateInput()).to.eq('2000-12-31', 'Expected scheduledDate value to be equals to 2000-12-31');
        await appointmentScheduleUpdatePage.save();
        expect(await appointmentScheduleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await appointmentScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last AppointmentSchedule', async () => {
        const nbButtonsBeforeDelete = await appointmentScheduleComponentsPage.countDeleteButtons();
        await appointmentScheduleComponentsPage.clickOnLastDeleteButton();

        appointmentScheduleDeleteDialog = new AppointmentScheduleDeleteDialog();
        expect(await appointmentScheduleDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Appointment Schedule?');
        await appointmentScheduleDeleteDialog.clickOnConfirmButton();

        expect(await appointmentScheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

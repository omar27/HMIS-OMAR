// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HospitalComponentsPage, HospitalDeleteDialog, HospitalUpdatePage } from './hospital.page-object';

const expect = chai.expect;

describe('Hospital e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let hospitalComponentsPage: HospitalComponentsPage;
  let hospitalUpdatePage: HospitalUpdatePage;
  let hospitalDeleteDialog: HospitalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Hospitals', async () => {
    await navBarPage.goToEntity('hospital');
    hospitalComponentsPage = new HospitalComponentsPage();
    await browser.wait(ec.visibilityOf(hospitalComponentsPage.title), 5000);
    expect(await hospitalComponentsPage.getTitle()).to.eq('Hospitals');
  });

  it('should load create Hospital page', async () => {
    await hospitalComponentsPage.clickOnCreateButton();
    hospitalUpdatePage = new HospitalUpdatePage();
    expect(await hospitalUpdatePage.getPageTitle()).to.eq('Create or edit a Hospital');
    await hospitalUpdatePage.cancel();
  });

  it('should create and save Hospitals', async () => {
    const nbButtonsBeforeCreate = await hospitalComponentsPage.countDeleteButtons();

    await hospitalComponentsPage.clickOnCreateButton();
    await promise.all([
      hospitalUpdatePage.setNameInput('name'),
      hospitalUpdatePage.setEmailInput('email'),
      hospitalUpdatePage.setAddressInput('address'),
      hospitalUpdatePage.setPhoneNumberInput('phoneNumber'),
      hospitalUpdatePage.setRegistrationNumberInput('registrationNumber')
    ]);
    expect(await hospitalUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await hospitalUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await hospitalUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await hospitalUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await hospitalUpdatePage.getRegistrationNumberInput()).to.eq(
      'registrationNumber',
      'Expected RegistrationNumber value to be equals to registrationNumber'
    );
    await hospitalUpdatePage.save();
    expect(await hospitalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await hospitalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Hospital', async () => {
    const nbButtonsBeforeDelete = await hospitalComponentsPage.countDeleteButtons();
    await hospitalComponentsPage.clickOnLastDeleteButton();

    hospitalDeleteDialog = new HospitalDeleteDialog();
    expect(await hospitalDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Hospital?');
    await hospitalDeleteDialog.clickOnConfirmButton();

    expect(await hospitalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

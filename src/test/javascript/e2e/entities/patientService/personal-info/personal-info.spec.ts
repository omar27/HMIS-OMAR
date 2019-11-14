// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PersonalInfoComponentsPage, PersonalInfoDeleteDialog, PersonalInfoUpdatePage } from './personal-info.page-object';

const expect = chai.expect;

describe('PersonalInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personalInfoComponentsPage: PersonalInfoComponentsPage;
  let personalInfoUpdatePage: PersonalInfoUpdatePage;
  let personalInfoDeleteDialog: PersonalInfoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PersonalInfos', async () => {
    await navBarPage.goToEntity('personal-info');
    personalInfoComponentsPage = new PersonalInfoComponentsPage();
    await browser.wait(ec.visibilityOf(personalInfoComponentsPage.title), 5000);
    expect(await personalInfoComponentsPage.getTitle()).to.eq('Personal Infos');
  });

  it('should load create PersonalInfo page', async () => {
    await personalInfoComponentsPage.clickOnCreateButton();
    personalInfoUpdatePage = new PersonalInfoUpdatePage();
    expect(await personalInfoUpdatePage.getPageTitle()).to.eq('Create or edit a Personal Info');
    await personalInfoUpdatePage.cancel();
  });

  it('should create and save PersonalInfos', async () => {
    const nbButtonsBeforeCreate = await personalInfoComponentsPage.countDeleteButtons();

    await personalInfoComponentsPage.clickOnCreateButton();
    await promise.all([
      personalInfoUpdatePage.setCnicInput('cnic'),
      personalInfoUpdatePage.setFirstNameInput('firstName'),
      personalInfoUpdatePage.setLastNameInput('lastName'),
      personalInfoUpdatePage.setPhoneNumberInput('phoneNumber'),
      personalInfoUpdatePage.setEmailInput('email'),
      personalInfoUpdatePage.genderSelectLastOption(),
      personalInfoUpdatePage.setAgeInput('5'),
      personalInfoUpdatePage.setAddressInput('address'),
      personalInfoUpdatePage.setCityInput('city'),
      personalInfoUpdatePage.entityTypeSelectLastOption(),
      personalInfoUpdatePage.setEntityIdInput('5')
    ]);
    expect(await personalInfoUpdatePage.getCnicInput()).to.eq('cnic', 'Expected Cnic value to be equals to cnic');
    expect(await personalInfoUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await personalInfoUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await personalInfoUpdatePage.getPhoneNumberInput()).to.eq(
      'phoneNumber',
      'Expected PhoneNumber value to be equals to phoneNumber'
    );
    expect(await personalInfoUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await personalInfoUpdatePage.getAgeInput()).to.eq('5', 'Expected age value to be equals to 5');
    expect(await personalInfoUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await personalInfoUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await personalInfoUpdatePage.getEntityIdInput()).to.eq('5', 'Expected entityId value to be equals to 5');
    await personalInfoUpdatePage.save();
    expect(await personalInfoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personalInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PersonalInfo', async () => {
    const nbButtonsBeforeDelete = await personalInfoComponentsPage.countDeleteButtons();
    await personalInfoComponentsPage.clickOnLastDeleteButton();

    personalInfoDeleteDialog = new PersonalInfoDeleteDialog();
    expect(await personalInfoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Personal Info?');
    await personalInfoDeleteDialog.clickOnConfirmButton();

    expect(await personalInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

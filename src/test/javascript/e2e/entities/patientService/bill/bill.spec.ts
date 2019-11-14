// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BillComponentsPage,
  /* BillDeleteDialog,
   */ BillUpdatePage
} from './bill.page-object';

const expect = chai.expect;

describe('Bill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let billComponentsPage: BillComponentsPage;
  let billUpdatePage: BillUpdatePage;
  /* let billDeleteDialog: BillDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bills', async () => {
    await navBarPage.goToEntity('bill');
    billComponentsPage = new BillComponentsPage();
    await browser.wait(ec.visibilityOf(billComponentsPage.title), 5000);
    expect(await billComponentsPage.getTitle()).to.eq('Bills');
  });

  it('should load create Bill page', async () => {
    await billComponentsPage.clickOnCreateButton();
    billUpdatePage = new BillUpdatePage();
    expect(await billUpdatePage.getPageTitle()).to.eq('Create or edit a Bill');
    await billUpdatePage.cancel();
  });

  /*  it('should create and save Bills', async () => {
        const nbButtonsBeforeCreate = await billComponentsPage.countDeleteButtons();

        await billComponentsPage.clickOnCreateButton();
        await promise.all([
            billUpdatePage.setDoctorFeeInput('5'),
            billUpdatePage.setMedicineChargesInput('5'),
            billUpdatePage.setTestsFeeInput('5'),
            billUpdatePage.setRoomChargesInput('5'),
            billUpdatePage.setOtherChargesInput('5'),
            billUpdatePage.setTotalBillInput('5'),
            billUpdatePage.paidStatusSelectLastOption(),
            billUpdatePage.patientSelectLastOption(),
        ]);
        expect(await billUpdatePage.getDoctorFeeInput()).to.eq('5', 'Expected doctorFee value to be equals to 5');
        expect(await billUpdatePage.getMedicineChargesInput()).to.eq('5', 'Expected medicineCharges value to be equals to 5');
        expect(await billUpdatePage.getTestsFeeInput()).to.eq('5', 'Expected testsFee value to be equals to 5');
        expect(await billUpdatePage.getRoomChargesInput()).to.eq('5', 'Expected roomCharges value to be equals to 5');
        expect(await billUpdatePage.getOtherChargesInput()).to.eq('5', 'Expected otherCharges value to be equals to 5');
        expect(await billUpdatePage.getTotalBillInput()).to.eq('5', 'Expected totalBill value to be equals to 5');
        await billUpdatePage.save();
        expect(await billUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await billComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Bill', async () => {
        const nbButtonsBeforeDelete = await billComponentsPage.countDeleteButtons();
        await billComponentsPage.clickOnLastDeleteButton();

        billDeleteDialog = new BillDeleteDialog();
        expect(await billDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Bill?');
        await billDeleteDialog.clickOnConfirmButton();

        expect(await billComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

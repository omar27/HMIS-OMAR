// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StatsComponentsPage } from './stats.page-object';

const expect = chai.expect;

describe('Stats e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statsComponentsPage: StatsComponentsPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Stats', async () => {
    await navBarPage.goToEntity('stats');
    statsComponentsPage = new StatsComponentsPage();
    await browser.wait(ec.visibilityOf(statsComponentsPage.title), 5000);
    expect(await statsComponentsPage.getTitle()).to.eq('Stats');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

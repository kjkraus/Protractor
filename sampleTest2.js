it('Verify disclaimer thrown for user if reacknowledge required', function () {
    page.editAndSave(true);

    page.logoutAndIntoPatient();

    expect(PatientDisclaimerPage.disclaimerContent.isPresent())
      .toBe(true, 'Patient Disclaimer page failed to be displayed');
    expect(PatientDisclaimerPage.acceptButton.isPresent())
      .toBe(true, 'Accept button failed to be displayed');

    browser.sleep(1000); //TODO Kevin fix for acceptDisclaimer, add wait
    PatientDisclaimerPage.acceptDisclaimer();

    MyHealthSummaryPage.waitFor();
    expect(MyHealthSummaryPage.myHealthDetails.isPresent())
      .toBe(true, 'My Health page failed to be displayed');

    var admin = browser.params.users.admin;
    LoginPage.loginToAdminSide(admin.userName, admin.password);
  });
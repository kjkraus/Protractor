  //jenkins
  //protractor
  it('User Accounts - Delete', () => {
    //Add a new User
    page.plusButton.click();
    expect(page.leftPanelTitle.isPresent()).toBe(true);
    let username = Casual.username;
    page.usernameInput(username);
    let firstname = Casual.first_name;
    let lastname = Casual.last_name;
    page.nameInput(firstname, lastname, true);
    page.emailInput('test@memes.com');
    page.roleLabel.get(0).click();
    page.nextButton.click();
    page.passwordInput('password123', 'password123');
    page.saveButton.click();
    page.waitForSave();
    expect(page.leftPanelTitle.isPresent()).toBe(false);
    expect(page.selectedUser.getText()).toEqual(username);

    //Delete button routines
    expect(page.deleteButton.isPresent()).toBe(true, 'Delete button is missing');
    page.deleteButton.click();
    expect(page.deletePopupHeader.getText()).toEqual('Delete Account?');
    expect(page.deletePopupBody.getText()).toEqual('Are you sure you want to delete?');
    expect(page.deletePopupCancelButton.isPresent()).toBe(true, 'Cancel button is missing');
    expect(page.deletePopupDeleteButton.isPresent()).toBe(true, 'Delete pop-up delete button is missing');
    page.deletePopupCancelButton.click();
    expect(page.selectedUser.getText()).toEqual(username);
    page.deleteButton.click();
    page.deletePopupDeleteButton.click();
    page.waitForSkinnyUpdoot(username);
    expect(page.selectedUser.getText()).not.toEqual(username);

    //Search skinny for Username
    var found = false;
    page.userName.each((element) => {
      if (!found) {
        element.getText().then((text) => {
          if (text === lastname + ', ' + firstname) {
            found = true;
          }
        });
      }
    }).then(() => {
      expect(!found).toBeTruthy('Patient was not deleted.');
    });
  });
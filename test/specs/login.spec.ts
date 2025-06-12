import {expect} from "@wdio/globals";

describe('When I want to create an account', () => {
  it('should redirect to register', async () => {
    const registerLink = await $('#redirect-register-button');
    await registerLink.click();

    const registerTitle = await $('#main-title');
    await expect(registerTitle).toBeDisplayed();
  });
})

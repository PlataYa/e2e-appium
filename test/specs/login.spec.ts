import { browser, expect } from "@wdio/globals";

describe('When I want to create an account', () => {
  const email = `testuser${Date.now()}@example.com`;
  const password = 'TestPassword123!';

  it('should redirect to register', async () => {
    const redirectRegisterButton = 'new UiSelector().textContains("No tenés cuenta? Registrate")';
    const button = await browser.$(`android=${redirectRegisterButton}`);
    await browser.pause(1000);
    await button.click();
    await browser.pause(1000);
    const titleSelector = 'new UiSelector().textContains("Registrarse")';
    const registerTitle = await browser.$(`android=${titleSelector}`);
    await browser.pause(1000);
    await expect(registerTitle).toBeDisplayed();
  });

  it('should register with valid data', async () => {
    // console.log(await browser.getPageSource());

    const name = 'Test';
    const surname = 'User';
    const birthDate = '2000-01-01';

    const inputName = 'new UiSelector().className("android.widget.EditText").instance(0)';
    const inputSurname = 'new UiSelector().className("android.widget.EditText").instance(1)';
    const inputEmail = 'new UiSelector().className("android.widget.EditText").instance(2)';
    const inputPassword = 'new UiSelector().className("android.widget.EditText").instance(3)';
    const inputBirthDate = 'new UiSelector().className("android.widget.EditText").instance(4)';
    const btnSubmit = 'new UiSelector().textContains("Registrarme")';

    await browser.$(`android=${inputName}`).setValue(name);
    await browser.pause(1000);
    await browser.$(`android=${inputSurname}`).setValue(surname);
    await browser.pause(1000);
    await browser.$(`android=${inputEmail}`).setValue(email);
    await browser.pause(1000);
    await browser.$(`android=${inputPassword}`).setValue(password);
    await browser.pause(1000);
    await browser.$(`android=${inputBirthDate}`).setValue(birthDate);
    await browser.pause(1000);
    const submitButton = await browser.$(`android=${btnSubmit}`);
    await browser.pause(1000);
    await submitButton.click();
    await browser.pause(1000);

    // Verify successful registration
    const titleSelector = 'new UiSelector().textContains("Iniciar sesión")';
    const loginTitle = await browser.$(`android=${titleSelector}`);
    await browser.pause(1000);
    await expect(loginTitle).toBeDisplayed();
  });

  it('should be able to login with the registered account', async () => {
    // console.log(await browser.getPageSource());

    const inputEmail = 'new UiSelector().className("android.widget.EditText").instance(0)';
    const inputPassword = 'new UiSelector().className("android.widget.EditText").instance(1)';
    const btnSubmit = 'new UiSelector().className("android.widget.Button").textContains("Iniciar Sesión")';

    await browser.$(`android=${inputEmail}`).setValue(email);
    await browser.pause(1000);
    await browser.$(`android=${inputPassword}`).setValue(password);
    await browser.pause(1000);
    const submitButton = await browser.$(`android=${btnSubmit}`);
    await submitButton.click();
    await browser.pause(2000);
    // Verify successful login
    const homeTitleSelector = 'new UiSelector().textContains("Bienvenido, Test User")';
    const homeTitle = await browser.$(`android=${homeTitleSelector}`);
    await browser.pause(1000);
    await expect(homeTitle).toBeDisplayed();
  });

  async function obtenerCVU() {
    // Selector para encontrar el elemento que contiene el CVU
    const cvuSelector = 'new UiSelector().className("android.widget.TextView").textContains("CVU:")';

    // Obtener el elemento
    const cvuElement = await browser.$(`android=${cvuSelector}`);

    // Extraer el texto completo
    const cvuTexto = await cvuElement.getText();

    // Extraer solo el número del CVU utilizando expresión regular
    const cvuNumero = cvuTexto.replace("CVU: ", "").trim();

    console.log(`CVU obtenido: ${cvuNumero}`);
    return cvuNumero;
  }

  it('should close session, enter an account with money and transfer it', async () => {
    // console.log(await browser.getPageSource());

    const cvu = await obtenerCVU();

    const btnCloseSession = 'new UiSelector().textContains("Cerrar sesión")';
    const logoutButton = await browser.$(`android=${btnCloseSession}`);
    await browser.pause(1000);
    await logoutButton.click();
    await browser.pause(1000);

    const richMail = 'nacho@mail.com'
    const richPassword = 'Sape123!';

    const inputEmail = 'new UiSelector().className("android.widget.EditText").instance(0)';
    const inputPassword = 'new UiSelector().className("android.widget.EditText").instance(1)';
    const btnSubmit = 'new UiSelector().className("android.widget.Button").textContains("Iniciar Sesión")';

    await browser.$(`android=${inputEmail}`).setValue(richMail);
    await browser.pause(1000);
    await browser.$(`android=${inputPassword}`).setValue(richPassword);
    await browser.pause(1000);
    const submitButton = await browser.$(`android=${btnSubmit}`);
    await submitButton.click();
    await browser.pause(1000);

    const transferButtonSelector = 'new UiSelector().textContains("Transferir a PlataYa")';
    const transferButton = await browser.$(`android=${transferButtonSelector}`);
    await browser.pause(1000);
    await transferButton.click();
    await browser.pause(3000); // Aumentamos el tiempo de espera para asegurar que la página se cargue completamente

    // Usando los textos exactos que aparecen en los EditText según la jerarquía
    const inputCVUSelector = 'new UiSelector().className("android.widget.EditText").instance(0)'; // CVU
    await browser.$(`android=${inputCVUSelector}`).setValue(cvu);
    await browser.pause(1000);

    const inputAmountSelector = 'new UiSelector().className("android.widget.EditText").instance(1)';
    await browser.$(`android=${inputAmountSelector}`).setValue('10');
    await browser.pause(1000);

    const btnTransfer = 'new UiSelector().className("android.widget.Button").textContains("Confirmar")';
    const transferButtonFinal = await browser.$(`android=${btnTransfer}`);
    await transferButtonFinal.click();
    await browser.pause(1000);

    console.log(await browser.getPageSource());
    // Verify successful transfer
    const successMessageSelector = 'new UiSelector().textContains("Monto: $10 ARS")';
    const successMessage = await browser.$(`android=${successMessageSelector}`);
    await browser.pause(1000);
    await expect(successMessage).toBeDisplayed();
  })
});

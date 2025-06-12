import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub-page containing specific selectors and methods for a specific page
 */
class RegisterPage extends Page {
    public get title () {
        return $('#main-title');
    }

    public get inputName () {
        return $('#register-name');
    }

    public get inputLastName () {
        return $('#register-lastname');
    }

    public get inputEmail () {
        return $('#register-email');
    }

    public get inputPassword () {
        return $('#register-password');
    }

    public get inputBirthDate () {
        return $('#register-birthdate');
    }

    public get btnSubmit () {
        return $('#register-button');
    }

    public get btnRedirectLogin () {
        return $('#redirect-login-button');
    }

    public async register (name: string, surname: string, email: string, password: string, birthDate: string) {
        await this.inputName.setValue(name);
        await this.inputLastName.setValue(surname);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputBirthDate.setValue(birthDate);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('request');
    }
}

export default new RegisterPage();

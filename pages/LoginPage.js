const Page = require('./Page')
const { remote } = require('webdriverio')

class LoginPage extends Page{
    constructor(driver){
        super(driver)
    }

    loginElement = '~Login'
    emailElement = '~input-email'
    passwordElement = '~input-password'
    submitElement = '~button-LOGIN'
    successElement = 'id=android:id/alertTitle'
    buttonOkElement = 'id=android:id/button1'
    emailErrorElement = '(//*[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[1])'
    passwordErrorElement = '(//*[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[2])'

    async openPage(){
        await this.driver.$(this.loginElement).click()
    }
    async loginProcess (email, password){
        await this.driver.$(this.emailElement).setValue(email)
        await this.driver.$(this.passwordElement).setValue(password)
        await this.driver.$(this.submitElement).click()
    }
    async getSuccessMessage(){
        const successMessage = await this.driver.$(this.successElement)
        await successMessage.waitForDisplayed({timeout:3000})
        return await successMessage.getText()
    }
    async buttonOk(){
        await this.driver.$(this.buttonOkElement).click()
    }
    async getEmailErrorMessage(){
        const emailErrorMessage = await this.driver.$(this.emailErrorElement)
        return await emailErrorMessage.getText()
    }
    async getPasswordErrorMessage(){
        const passwordErrorMessage = await this.driver.$(this.passwordErrorElement)
        return await passwordErrorMessage.getText()
    }
}
module.exports = LoginPage
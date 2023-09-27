const { remote } = require('webdriverio')
const {expect}= require('chai')
const setupDriver = require('../utils/SetupDriver')
const LoginPage = require('../pages/LoginPage')

describe('FT_001_Login_Page',function(){
    let driver
    let loginPage

    before(async function(){
        driver = await setupDriver()
        loginPage = new LoginPage(driver)
        await loginPage.openPage()
    })
    describe('test case positive',function(){
        describe('LP_001 Mencoba Login dengan email: user1@test.com dan password: abcd1234', function(){
            
            it('Menampilkan pop up success',async function(){
                await loginPage.loginProcess('user1@test.com','abcd1234')
                const popUp = await loginPage.getSuccessMessage()
                expect(popUp).to.equal('Success')
                await loginPage.buttonOk()
            })
        })
        describe('LP_002 Mencoba Login dengan email: user1@test.com dan password: !@#$%^&*', function(){
            
            it('Menampilkan pop up success',async function(){
                await loginPage.loginProcess('user1@test.com','!@#$%^&*')
                const popUp = await loginPage.getSuccessMessage()
                expect(popUp).to.equal('Success')
                await loginPage.buttonOk()
            })
        })
    })
    describe('test case negative',function(){
        describe('LP_003 Mencoba Login tanpa input email dan password', function(){
            
            it('Menampilkan Email error: Please enter a valid email address',async function(){
                await loginPage.loginProcess('','')
                const emailError = await loginPage.getEmailErrorMessage()
                expect(emailError).to.equal('Please enter a valid email address')
            })
            it('Menampilkan Password error: Please enter at least 8 characters',async function(){
                const passwordError = await loginPage.getPasswordErrorMessage()
                expect(passwordError).to.equal('Please enter at least 8 characters')
            })
        })
        describe('LP_004 Mencoba Login tanpa input email', function(){
            
            it('Menampilkan Email error: Please enter a valid email address',async function(){
                await loginPage.loginProcess('','abcd1234')
                const emailError = await loginPage.getEmailErrorMessage()
                expect(emailError).to.equal('Please enter a valid email address')
            })
        })
        describe('LP_005 Mencoba Login dengan email invalid, email: user1 password: abcd1234', function(){
            
            it('Menampilkan Email error: Please enter a valid email address',async function(){
                await loginPage.loginProcess('user1','abcd1234')
                const emailError = await loginPage.getEmailErrorMessage()
                expect(emailError).to.equal('Please enter a valid email address')
            })
        })
        describe('LP_006 Mencoba Login dengan email invalid, email: user1@test password: abcd1234', function(){
            
            it('Menampilkan Email error: Please enter a valid email address',async function(){
                await loginPage.loginProcess('user1@test','abcd1234')
                const emailError = await loginPage.getEmailErrorMessage()
                expect(emailError).to.equal('Please enter a valid email address')
            })
        })
        describe('LP_007 Mencoba Login dengan email invalid, email: user1.com password: abcd1234', function(){
            
            it('Menampilkan Email error: Please enter a valid email address',async function(){
                await loginPage.loginProcess('user1.com','abcd1234')
                const emailError = await loginPage.getEmailErrorMessage()
                expect(emailError).to.equal('Please enter a valid email address')
            })
        })
        describe('LP_008 Mencoba Login dengan email invalid, email: @test.com password: abcd1234', function(){
            it('Menampilkan Email error: Please enter a valid email address',async function(){
                await loginPage.loginProcess('@test.com','abcd1234')
                const emailError = await loginPage.getEmailErrorMessage()
                expect(emailError).to.equal('Please enter a valid email address')
            })
        }) 
        describe('LP_009 Mencoba Login tanpa input password', function(){
            it('Menampilkan Password error: Please enter at least 8 characters',async function(){
                await loginPage.loginProcess('user1@test.com','')
                const passwordError = await loginPage.getPasswordErrorMessage()
                expect(passwordError).to.equal('Please enter at least 8 characters')
            })
        })
        describe('LP_010 Mencoba Login dengan input password invalid, password: abcd123', function(){
            it('Menampilkan Password error: Please enter at least 8 characters',async function(){
                await loginPage.loginProcess('user1@test.com','abcd123')
                const passwordError = await loginPage.getPasswordErrorMessage()
                expect(passwordError).to.equal('Please enter at least 8 characters')
            })
        })
        describe('LP_011 Mencoba Login dengan input password invalid, password: abc12', function(){
            it('Menampilkan Password error: Please enter at least 8 characters',async function(){
                await loginPage.loginProcess('user1@test.com','abc12')
                const passwordError = await loginPage.getPasswordErrorMessage()
                expect(passwordError).to.equal('Please enter at least 8 characters')
            })
        })
    })
    afterEach(async function(){
        await driver.pause(3000)
    })
    after(async function(){
        await driver.deleteSession()
    })
})
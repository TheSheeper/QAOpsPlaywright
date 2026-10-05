import { Page } from '@playwright/test';
import {Locator} from "playwright-core"

export class LoginPage{
    private signInButton: any;
    private userName: Locator;
    private password: Locator;
    private page: Page;

    constructor(
        page: Page,
    ){
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton=page.locator('[value="Login"]')
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async login(email: string, password: string){
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
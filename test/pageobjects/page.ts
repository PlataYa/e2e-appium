import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a specific screen in the mobile app
    * For mobile native apps, we don't need to open URLs like web apps
    * This is kept as a placeholder for navigation logic if needed
    * @param screenName name of the screen for logging purposes
    */
    public open (screenName: string) {
        console.log(`Navigating to ${screenName} screen`);
        // For native apps, we typically don't need to navigate via URL
        // The app usually starts at a specific screen, or we navigate via UI interactions
        return browser;
    }
}

import { Locator, Page } from "@playwright/test";
import { ButtonDirection, DatePickerAgent } from "../DatePickerAgent";

export class DatePickerPage {
  readonly page: Page;
  readonly birthdayLocator: Locator;
  readonly startDateLocator: Locator;
  readonly endDateLocator: Locator;
  readonly next: Locator;
  readonly prev: Locator;

  constructor(page: Page) {
    this.page = page;
    this.birthdayLocator = page.locator("#birthday");
    this.startDateLocator = page.locator("input[placeholder='Start date']");
    this.endDateLocator = page.locator("input[placeholder='End date']");
    this.next = page.locator("(//th[@class='next'])[1]");
    this.prev = page.locator("(//th[@class='prev'])[1]");
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async insertDate(date: string) {
    await this.birthdayLocator.fill(date);
  }

  async clickStartDateLocator() {
    await this.startDateLocator.click();
  }

  async clickEndDateLocator() {
    await this.endDateLocator.click();
  }

  async reachTarget(dpa: DatePickerAgent) {
    let i = 0;
    while (i < dpa.NumberOfClicks) {
      if (dpa.Direction == ButtonDirection.Forward) {
        await this.next.click();
      } else if (dpa.Direction == ButtonDirection.Backward) {
        await this.prev.click();
      }
      i++;
    }
  }

  getTimestamp(date: Date): number {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }
}

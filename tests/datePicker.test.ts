import { test, expect } from "@playwright/test";
import { DatePickerPage } from "../pages/DatePickerPage";
import { DatePickerAgent } from "../DatePickerAgent";

const url =
  "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo";

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

test("Insert date with keys", async ({ page }) => {
  const DatePicker = new DatePickerPage(page);
  const date = "1991-11-18";
  await DatePicker.goTo(url);
  await DatePicker.insertDate(date);
  await expect(DatePicker.birthdayLocator).toHaveValue(date);
});

test("Insert date with calendar", async ({ page }) => {
  const dpPage = new DatePickerPage(page);

  const today = new Date();
  const target = new Date(2022, 9, 18); // 18 october 2022

  const initialSelectedDate = formatDate(today);
  const targetDate = formatDate(target);

  const dpaStart = new DatePickerAgent(initialSelectedDate, targetDate);
  const dpaEnd = new DatePickerAgent(targetDate, initialSelectedDate);

  const timestampToday = dpPage.getTimestamp(today);
  const timestampTarget = dpPage.getTimestamp(target);

  await dpPage.goTo(url);
  await dpPage.clickStartDateLocator();
  await dpPage.reachTarget(dpaStart);
  await page.locator(`//td[@data-date='${timestampTarget}']`).click();

  await dpPage.clickEndDateLocator();
  await dpPage.reachTarget(dpaEnd);
  await page.locator(`//td[@data-date='${timestampToday}']`).click();

  await expect(dpPage.startDateLocator).toHaveValue(formatDate(target));
  await expect(dpPage.endDateLocator).toHaveValue(formatDate(today));
});

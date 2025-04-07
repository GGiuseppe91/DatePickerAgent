import { DatePickerAgent, ButtonDirection } from "./DatePickerAgent";

describe("DatePickerAgent", () => {
  test("CanCreateDate", () => {
    const selectedDate = "01/10/2019";
    const targetDate = "19/10/2023";
    expect(selectedDate).toBe("01/10/2019");
    expect(targetDate).toBe("19/10/2023");
  });

  test("NotValidDate", () => {
    const selectedDate = "32/15/2019";
    const targetDate = "19/10/2023";
    expect(() => new DatePickerAgent(selectedDate, targetDate)).toThrow(
      "Invalid date format"
    );
  });

  test("DayOfTheMonth", () => {
    const dpa = new DatePickerAgent("01/10/2019", "19/10/2023");
    expect(dpa.DayOfTheMonth).toBe(19);
  });

  test("CheckDirectionForward", () => {
    const dpa = new DatePickerAgent("01/10/2019", "19/10/2023");
    expect(dpa.Direction).toBe(ButtonDirection.Forward);
  });

  test("CheckDirectionBackward", () => {
    const dpa = new DatePickerAgent("01/10/2023", "19/10/2019");
    expect(dpa.Direction).toBe(ButtonDirection.Backward);
  });

  test("CheckDirectionNone", () => {
    const dpa = new DatePickerAgent("01/10/2023", "19/10/2023");
    expect(dpa.Direction).toBe(ButtonDirection.None);
  });

  test("CheckNumberOfClickForward", () => {
    const dpa = new DatePickerAgent("01/10/2019", "19/10/2023");
    expect(dpa.NumberOfClicks).toBe(48);
  });

  test("CheckNumberOfClickBackward", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/10/2019");
    expect(dpa.NumberOfClicks).toBe(48);
  });

  test("CheckNumberOfClickSameMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/10/2023");
    expect(dpa.NumberOfClicks).toBe(0);
  });

  test("CheckNumberOfClickSameYearNextMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/11/2023");
    expect(dpa.NumberOfClicks).toBe(1);
  });

  test("CheckDirectionSameYearNextMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/11/2023");
    expect(dpa.Direction).toBe(ButtonDirection.Forward);
  });

  test("CheckDaysSameYearNextMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/11/2023");
    expect(dpa.DayOfTheMonth).toBe(1);
  });

  test("CheckNumberOfClickSameYearPreviousMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/09/2023");
    expect(dpa.NumberOfClicks).toBe(1);
  });

  test("CheckDirectionSameYearPreviousMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/09/2023");
    expect(dpa.Direction).toBe(ButtonDirection.Backward);
  });

  test("CheckDaysSameYearPreviousMonth", () => {
    const dpa = new DatePickerAgent("19/10/2023", "01/09/2023");
    expect(dpa.DayOfTheMonth).toBe(1);
  });
});

This project is an end-to-end (E2E) test suite built with Playwright that validates the behavior of a calendar widget (DatePicker) on the LambdaTest Playground.

What it tests

    Manual date input: Simulates user typing a date into an input field and verifies the expected value.

    Calendar interaction: Automates navigation through the calendar using next/previous controls to reach and select a target date.

    Cross-format handling: Handles localization issues and ensures proper formatting of dates (dd/MM/yyyy) as displayed in the widget.

    Timestamp precision: Calculates the Unix timestamp of a target date (based on UTC) to interact with elements using data-date attributes.

Tech stack

    Playwright for browser automation.

    TypeScript for strong typing and modern development experience.

    Page Object Model (POM) to separate concerns and improve code maintainability.

/tests
  └── datePicker.test.ts       # Main E2E tests
/pages
  └── DatePickerPage.ts        # Page Object abstraction
/DatePickerAgent.ts            # Helper class to calculate navigation logic
/DatePickerAgent.test.ts       # Unit tests for class DatePickerAgent (run using npm test DatePickerAgent.test.ts)

How to run

Install dependencies: npm install

Run E2E tests: npx playwright test
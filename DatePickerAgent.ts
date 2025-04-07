export enum ButtonDirection {
  Forward = "Forward",
  Backward = "Backward",
  None = "None",
}

export class DatePickerAgent {
  private readonly _selectedDate: Date;
  private readonly _targetDate: Date;
  private _direction: ButtonDirection = ButtonDirection.None;
  private _numberOfClicks: number = 0;
  private static readonly _format = "dd/MM/yyyy";

  constructor(selectedDate: string, targetDate: string) {
    const parsedSelected = DatePickerAgent.parseDate(selectedDate);
    const parsedTarget = DatePickerAgent.parseDate(targetDate);

    if (!parsedSelected || !parsedTarget) {
      throw new Error(
        `Invalid date format, must be ${DatePickerAgent._format}.`
      );
    }

    this._selectedDate = parsedSelected;
    this._targetDate = parsedTarget;

    this.getDirection();
    this.getNumberOfClicks();
  }

  get NumberOfClicks(): number {
    return this._numberOfClicks;
  }

  get Direction(): ButtonDirection {
    return this._direction;
  }

  get DayOfTheMonth(): number {
    return this._targetDate.getDate();
  }

  private getDirection(): void {
    const sameMonth =
      this._selectedDate.getFullYear() === this._targetDate.getFullYear() &&
      this._selectedDate.getMonth() === this._targetDate.getMonth();

    if (sameMonth) {
      this._direction = ButtonDirection.None;
    } else if (this._selectedDate > this._targetDate) {
      this._direction = ButtonDirection.Backward;
    } else {
      this._direction = ButtonDirection.Forward;
    }
  }

  private getNumberOfClicks(): void {
    const yearDiff =
      this._targetDate.getFullYear() - this._selectedDate.getFullYear();
    const monthDiff =
      this._targetDate.getMonth() - this._selectedDate.getMonth();
    this._numberOfClicks = Math.abs(yearDiff * 12 + monthDiff);
  }

  private static parseDate(dateStr: string): Date | null {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }
    return null;
  }
}

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../DateProvider/IDateProvider';

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(startDate: Date, endDate: Date): number {
    const end_date_utc = this.convertToUTC(endDate);
    const start_date_utc = this.convertToUTC(startDate);
    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }
}
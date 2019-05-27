// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { CoreConstants } from '@core/constants';

/*
 * "Utils" service with helper functions for date and time.
*/
@Injectable()
export class CoreTimeUtilsProvider {

    protected FORMAT_REPLACEMENTS = { // To convert PHP strf format to Moment format.
        '%a': 'ddd',
        '%A': 'dddd',
        '%d': 'DD',
        '%e': 'D', // Not exactly the same. PHP adds a space instead of leading zero, Moment doesn't.
        '%j': 'DDDD',
        '%u': 'E',
        '%w': 'e', // It might not behave exactly like PHP, the first day could be calculated differently.
        '%U': 'ww', // It might not behave exactly like PHP, the first week could be calculated differently.
        '%V': 'WW',
        '%W': 'ww', // It might not behave exactly like PHP, the first week could be calculated differently.
        '%b': 'MMM',
        '%B': 'MMMM',
        '%h': 'MMM',
        '%m': 'MM',
        '%C' : '', // Not supported by Moment.
        '%g': 'GG',
        '%G': 'GGGG',
        '%y': 'YY',
        '%Y': 'YYYY',
        '%H': 'HH',
        '%k': 'H', // Not exactly the same. PHP adds a space instead of leading zero, Moment doesn't.
        '%I': 'hh',
        '%l': 'h', // Not exactly the same. PHP adds a space instead of leading zero, Moment doesn't.
        '%M': 'mm',
        '%p': 'A',
        '%P': 'a',
        '%r': 'hh:mm:ss A',
        '%R': 'HH:mm',
        '%S': 'ss',
        '%T': 'HH:mm:ss',
        '%X': 'LTS',
        '%z': 'ZZ',
        '%Z': 'ZZ', // Not supported by Moment, it was deprecated. Use the same as %z.
        '%c': 'LLLL',
        '%D': 'MM/DD/YY',
        '%F': 'YYYY-MM-DD',
        '%s': 'X',
        '%x': 'L',
        '%n': '\n',
        '%t': '\t',
        '%%': '%'
    };

    constructor(private translate: TranslateService) { }

    /**
     * Convert a PHP format to a Moment format.
     *
     * @param {string} format PHP format.
     * @return {string} Converted format.
     */
    convertPHPToMoment(format: string): string {
        if (typeof format != 'string') {
            // Not valid.
            return '';
        }

        let converted = '',
            escaping = false;

        for (let i = 0; i < format.length; i++) {
            let char = format[i];

            if (char == '%') {
                // It's a PHP format, try to convert it.
                i++;
                char += format[i] || '';

                if (escaping) {
                    // We were escaping some characters, stop doing it now.
                    escaping = false;
                    converted += ']';
                }

                converted += typeof this.FORMAT_REPLACEMENTS[char] != 'undefined' ? this.FORMAT_REPLACEMENTS[char] : char;
            } else {
                // Not a PHP format. We need to escape them, otherwise the letters could be confused with Moment formats.
                if (!escaping) {
                    escaping = true;
                    converted += '[';
                }

                converted += char;
            }
        }

        if (escaping) {
            // Finish escaping.
            converted += ']';
        }

        return converted;
    }

    /**
     * Returns hours, minutes and seconds in a human readable format
     *
     * @param {number} seconds A number of seconds
     * @return {string} Seconds in a human readable format.
     */
    formatTime(seconds: number): string {
        let totalSecs,
            years,
            days,
            hours,
            mins,
            secs,
            remainder;

        totalSecs = Math.abs(seconds);
        years = Math.floor(totalSecs / CoreConstants.SECONDS_YEAR);
        remainder = totalSecs - (years * CoreConstants.SECONDS_YEAR);
        days = Math.floor(remainder / CoreConstants.SECONDS_DAY);

        remainder = totalSecs - (days * CoreConstants.SECONDS_DAY);

        hours = Math.floor(remainder / CoreConstants.SECONDS_HOUR);
        remainder = remainder - (hours * CoreConstants.SECONDS_HOUR);

        mins = Math.floor(remainder / CoreConstants.SECONDS_MINUTE);
        secs = remainder - (mins * CoreConstants.SECONDS_MINUTE);

        const ss = this.translate.instant('core.' + (secs == 1 ? 'sec' : 'secs')),
            sm = this.translate.instant('core.' + (mins == 1 ? 'min' : 'mins')),
            sh = this.translate.instant('core.' + (hours == 1 ? 'hour' : 'hours')),
            sd = this.translate.instant('core.' + (days == 1 ? 'day' : 'days')),
            sy = this.translate.instant('core.' + (years == 1 ? 'year' : 'years'));
        let oyears = '',
            odays = '',
            ohours = '',
            omins = '',
            osecs = '';

        if (years) {
            oyears = years + ' ' + sy;
        }
        if (days) {
            odays = days + ' ' + sd;
        }
        if (hours) {
            ohours = hours + ' ' + sh;
        }
        if (mins) {
            omins = mins + ' ' + sm;
        }
        if (secs) {
            osecs = secs + ' ' + ss;
        }

        if (years) {
            return oyears + ' ' + odays;
        }
        if (days) {
            return odays + ' ' + ohours;
        }
        if (hours) {
            return ohours + ' ' + omins;
        }
        if (mins) {
            return omins + ' ' + osecs;
        }
        if (secs) {
            return osecs;
        }

        return this.translate.instant('core.now');
    }

    /**
     * Returns hours, minutes and seconds in a human readable format.
     *
     * @param {number} duration Duration in seconds
     * @param {number} [precision] Number of elements to have in precission. 0 or undefined to full precission.
     * @return {string} Duration in a human readable format.
     */
    formatDuration(duration: number, precision?: number): string {
        precision = precision || 5;

        const eventDuration = moment.duration(duration, 'seconds');
        let durationString = '';

        if (precision && eventDuration.years() > 0) {
            durationString += ' ' + moment.duration(eventDuration.years(), 'years').humanize();
            precision--;
        }
        if (precision && eventDuration.months() > 0) {
            durationString += ' ' + moment.duration(eventDuration.months(), 'months').humanize();
            precision--;
        }
        if (precision && eventDuration.days() > 0) {
            durationString += ' ' + moment.duration(eventDuration.days(), 'days').humanize();
            precision--;
        }
        if (precision && eventDuration.hours() > 0) {
            durationString += ' ' + moment.duration(eventDuration.hours(), 'hours').humanize();
            precision--;
        }
        if (precision && eventDuration.minutes() > 0) {
            durationString += ' ' + moment.duration(eventDuration.minutes(), 'minutes').humanize();
            precision--;
        }

        return durationString.trim();
    }

    /**
     * Return the current timestamp in a "readable" format: YYYYMMDDHHmmSS.
     *
     * @return {string} The readable timestamp.
     */
    readableTimestamp(): string {
        return moment(Date.now()).format('YYYYMMDDHHmmSS');
    }

    /**
     * Return the current timestamp (UNIX format, seconds).
     *
     * @return {number} The current timestamp in seconds.
     */
    timestamp(): number {
        return Math.round(Date.now() / 1000);
    }

    /**
     * Convert a timestamp into a readable date.
     *
     * @param {number} timestamp Timestamp in milliseconds.
     * @param {string} [format] The format to use (lang key). Defaults to core.strftimedaydatetime.
     * @param {boolean} [convert=true] If true (default), convert the format from PHP to Moment. Set it to false for Moment formats.
     * @param {boolean} [fixDay=true] If true (default) then the leading zero from %d is removed.
     * @param {boolean} [fixHour=true] If true (default) then the leading zero from %I is removed.
     * @return {string} Readable date.
     */
    userDate(timestamp: number, format?: string, convert: boolean = true, fixDay: boolean = true, fixHour: boolean = true): string {
        format = this.translate.instant(format ? format : 'core.strftimedaydatetime');

        if (fixDay) {
            format = format.replace(/%d/g, '%e');
        }

        if (fixHour) {
            format = format.replace('%I', '%l');
        }

        // Format could be in PHP format, convert it to moment.
        if (convert) {
            format = this.convertPHPToMoment(format);
        }

        return moment(timestamp).format(format);
    }

    /**
     * Convert a text into user timezone timestamp.
     *
     * @param {number} date To convert to timestamp.
     * @return {number} Converted timestamp.
     */
    convertToTimestamp(date: string): number {
        return moment(date).unix() - (moment().utcOffset() * 60);
    }

    /**
     * Return the localized ISO format (i.e DDMMYY) from the localized moment format. Useful for translations.
     * DO NOT USE this function for ion-datetime format. Moment escapes characters with [], but ion-datetime doesn't support it.
     *
     * @param {any} localizedFormat Format to use.
     * @return {string} Localized ISO format
     */
    getLocalizedDateFormat(localizedFormat: any): string {
        return moment.localeData().longDateFormat(localizedFormat);
    }

    /**
     * For a given timestamp get the midnight value in the user's timezone.
     *
     * The calculation is performed relative to the user's midnight timestamp
     * for today to ensure that timezones are preserved.
     *
     * @param {number} [timestamp] The timestamp to calculate from. If not defined, return today's midnight.
     * @return {number} The midnight value of the user's timestamp.
     */
    getMidnightForTimestamp(timestamp?: number): number {
        if (timestamp) {
            return moment(timestamp * 1000).startOf('day').unix();
        } else {
            return moment().startOf('day').unix();
        }
    }
}

webpackJsonp([125],{

/***/ 1945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonCalendarEventPageModule", function() { return AddonCalendarEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event__ = __webpack_require__(2080);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AddonCalendarEventPageModule = /** @class */ (function () {
    function AddonCalendarEventPageModule() {
    }
    AddonCalendarEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__event__["a" /* AddonCalendarEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_module__["a" /* CorePipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_6__event__["a" /* AddonCalendarEventPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonCalendarEventPageModule);
    return AddonCalendarEventPageModule;
}());

//# sourceMappingURL=event.module.js.map

/***/ }),

/***/ 2080:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonCalendarEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_calendar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_helper__ = __webpack_require__(956);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_courses_providers_courses__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_utils_text__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_local_notifications__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_course_providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_utils_time__ = __webpack_require__(18);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Page that displays a single calendar event.
 */
var AddonCalendarEventPage = /** @class */ (function () {
    function AddonCalendarEventPage(translate, calendarProvider, navParams, domUtils, coursesProvider, calendarHelper, sitesProvider, localNotificationsProvider, courseProvider, textUtils, timeUtils) {
        var _this = this;
        this.translate = translate;
        this.calendarProvider = calendarProvider;
        this.domUtils = domUtils;
        this.coursesProvider = coursesProvider;
        this.calendarHelper = calendarHelper;
        this.sitesProvider = sitesProvider;
        this.courseProvider = courseProvider;
        this.textUtils = textUtils;
        this.timeUtils = timeUtils;
        this.event = {};
        this.courseUrl = '';
        this.notificationsEnabled = false;
        this.moduleUrl = '';
        this.categoryPath = '';
        this.eventId = navParams.get('id');
        this.notificationsEnabled = localNotificationsProvider.isAvailable();
        this.siteHomeId = sitesProvider.getCurrentSite().getSiteHomeId();
        if (this.notificationsEnabled) {
            this.calendarProvider.getEventReminders(this.eventId).then(function (reminders) {
                _this.reminders = reminders;
            });
            this.calendarProvider.getDefaultNotificationTime().then(function (defaultTime) {
                _this.defaultTime = defaultTime * 60;
            });
            // Calculate format to use. ion-datetime doesn't support escaping characters ([]), so we remove them.
            this.notificationFormat = this.timeUtils.convertPHPToMoment(this.translate.instant('core.strftimedatetimeshort'))
                .replace(/[\[\]]/g, '');
        }
    }
    /**
     * View loaded.
     */
    AddonCalendarEventPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchEvent().finally(function () {
            _this.eventLoaded = true;
        });
    };
    /**
     * Fetches the event and updates the view.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonCalendarEventPage.prototype.fetchEvent = function () {
        var _this = this;
        var currentSite = this.sitesProvider.getCurrentSite(), canGetById = this.calendarProvider.isGetEventByIdAvailable();
        var promise;
        if (canGetById) {
            promise = this.calendarProvider.getEventById(this.eventId);
        }
        else {
            promise = this.calendarProvider.getEvent(this.eventId);
        }
        return promise.then(function (event) {
            var promises = [];
            _this.calendarHelper.formatEventData(event);
            _this.event = event;
            _this.currentTime = _this.timeUtils.timestamp();
            _this.notificationMin = _this.timeUtils.userDate(_this.currentTime * 1000, 'YYYY-MM-DDTHH:mm', false);
            _this.notificationMax = _this.timeUtils.userDate((event.timestart + event.timeduration) * 1000, 'YYYY-MM-DDTHH:mm', false);
            // Reset some of the calculated data.
            _this.categoryPath = '';
            _this.courseName = '';
            _this.courseUrl = '';
            _this.moduleUrl = '';
            // Guess event title.
            var title = _this.translate.instant('addon.calendar.type' + event.eventtype);
            if (event.moduleIcon) {
                // It's a module event, translate the module name to the current language.
                var name_1 = _this.courseProvider.translateModuleName(event.modulename);
                if (name_1.indexOf('core.mod_') === -1) {
                    event.moduleName = name_1;
                }
                // Calculate the title of the page;
                if (title == 'addon.calendar.type' + event.eventtype) {
                    title = _this.translate.instant('core.mod_' + event.modulename + '.' + event.eventtype);
                    if (title == 'core.mod_' + event.modulename + '.' + event.eventtype) {
                        title = name_1;
                    }
                }
                // Get the module URL.
                if (canGetById) {
                    _this.moduleUrl = event.url;
                }
            }
            else {
                if (title == 'addon.calendar.type' + event.eventtype) {
                    title = event.name;
                }
            }
            _this.title = title;
            // If the event belongs to a course, get the course name and the URL to view it.
            if (canGetById && event.course) {
                _this.courseName = event.course.fullname;
                _this.courseUrl = event.course.viewurl;
            }
            else if (event.courseid && event.courseid != _this.siteHomeId) {
                // Retrieve the course.
                promises.push(_this.coursesProvider.getUserCourse(event.courseid, true).then(function (course) {
                    _this.courseName = course.fullname;
                    _this.courseUrl = currentSite ? _this.textUtils.concatenatePaths(currentSite.siteUrl, '/course/view.php?id=' + event.courseid) : '';
                }).catch(function () {
                    // Error getting course, just don't show the course name.
                }));
            }
            if (canGetById && event.iscategoryevent) {
                _this.categoryPath = event.category.nestedname;
            }
            if (event.location) {
                // Build a link to open the address in maps.
                event.location = _this.textUtils.decodeHTML(event.location);
                event.encodedLocation = _this.textUtils.buildAddressURL(event.location);
            }
            return Promise.all(promises);
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.calendar.errorloadevent', true);
        });
    };
    /**
     * Add a reminder for this event.
     *
     * @param {Event} e    Click event.
     */
    AddonCalendarEventPage.prototype.addNotificationTime = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        if (this.notificationTimeText && this.event && this.event.id) {
            var notificationTime = this.timeUtils.convertToTimestamp(this.notificationTimeText);
            var currentTime = this.timeUtils.timestamp(), minute = Math.floor(currentTime / 60) * 60;
            // Check if the notification time is in the same minute as we are, so the notification is triggered.
            if (notificationTime >= minute && notificationTime < minute + 60) {
                notificationTime = currentTime + 1;
            }
            this.calendarProvider.addEventReminder(this.event, notificationTime).then(function () {
                _this.calendarProvider.getEventReminders(_this.eventId).then(function (reminders) {
                    _this.reminders = reminders;
                });
                _this.notificationTimeText = null;
            });
        }
    };
    /**
     * Cancel the selected notification.
     *
     * @param {number} id  Reminder ID.
     * @param {Event} e    Click event.
     */
    AddonCalendarEventPage.prototype.cancelNotification = function (id, e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        this.calendarProvider.deleteEventReminder(id).then(function () {
            _this.calendarProvider.getEventReminders(_this.eventId).then(function (reminders) {
                _this.reminders = reminders;
            });
        });
    };
    /**
     * Refresh the event.
     *
     * @param {any} refresher Refresher.
     */
    AddonCalendarEventPage.prototype.refreshEvent = function (refresher) {
        var _this = this;
        this.calendarProvider.invalidateEvent(this.eventId).finally(function () {
            _this.fetchEvent().finally(function () {
                refresher.complete();
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonCalendarEventPage.prototype, "content", void 0);
    AddonCalendarEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-calendar-event',template:/*ion-inline-start:"/home/app/moodlemobile2/src/addon/calendar/pages/event/event.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title><core-format-text [text]="title"></core-format-text></ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="eventLoaded" (ionRefresh)="refreshEvent($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="eventLoaded">\n        <ion-card>\n            <ion-card-content *ngIf="event">\n                <ion-item text-wrap>\n                    <core-icon *ngIf="event.icon && !event.moduleIcon" [name]="event.icon" item-start></core-icon>\n                    <h2><core-format-text [text]="event.name"></core-format-text></h2>\n                </ion-item>\n                <ion-item text-wrap>\n                    <h2>{{ \'addon.calendar.eventstarttime\' | translate}}</h2>\n                    <p>{{ event.timestart * 1000 | coreFormatDate }}</p>\n                </ion-item>\n                <ion-item text-wrap *ngIf="event.timeduration > 0">\n                    <h2>{{ \'addon.calendar.eventendtime\' | translate}}</h2>\n                    <p>{{ (event.timestart + event.timeduration) * 1000 | coreFormatDate }}</p>\n                </ion-item>\n                <a ion-item text-wrap *ngIf="courseName" [href]="courseUrl" core-link capture="true">\n                    <h2>{{ \'core.course\' | translate}}</h2>\n                    <p><core-format-text [text]="courseName"></core-format-text></p>\n                </a>\n                <a ion-item text-wrap *ngIf="categoryPath">\n                    <h2>{{ \'core.category\' | translate}}</h2>\n                    <p><core-format-text [text]="categoryPath"></core-format-text></p>\n                </a>\n                <ion-item text-wrap *ngIf="event.moduleIcon">\n                    <img *ngIf="event.moduleIcon" src="{{event.moduleIcon}}" item-start alt="" role="presentation" class="core-module-icon"> {{event.moduleName}}\n                </ion-item>\n                <ion-item text-wrap *ngIf="event.description">\n                    <p>\n                        <core-format-text [text]="event.description"></core-format-text>\n                    </p>\n                </ion-item>\n                <ion-item text-wrap *ngIf="event.location">\n                    <h2>{{ \'core.location\' | translate}}</h2>\n                    <p>\n                        <a [href]="event.encodedLocation" core-link auto-login="no">\n                            <core-format-text [text]="event.location"></core-format-text>\n                        </a>\n                    </p>\n                </ion-item>\n                <ion-item *ngIf="moduleUrl">\n                    <a ion-button block color="primary" [href]="moduleUrl" core-link capture="true">{{ \'addon.calendar.gotoactivity\' | translate }}</a>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <ion-card list *ngIf="notificationsEnabled">\n            <ion-item>\n                <h2>{{ \'addon.calendar.reminders\' | translate }}</h2>\n            </ion-item>\n            <ng-container *ngFor="let reminder of reminders">\n                <ion-item  *ngIf="reminder.time > 0 || defaultTime > 0" [class.item-dimmed]="(reminder.time == -1 ? (event.timestart - defaultTime) : reminder.time) <= currentTime" >\n                    <p *ngIf="reminder.time == -1">{{ \'core.defaultvalue\' | translate :{$a: ((event.timestart - defaultTime) * 1000) | coreFormatDate } }}</p>\n                    <p *ngIf="reminder.time > 0">{{ reminder.time * 1000 | coreFormatDate }}</p>\n                    <button ion-button icon-only clear="true" (click)="cancelNotification(reminder.id, $event)" [attr.aria-label]=" \'core.delete\' | translate" item-end *ngIf="(reminder.time == -1 ? (event.timestart - defaultTime) : reminder.time) > currentTime">\n                        <ion-icon name="trash" color="danger"></ion-icon>\n                    </button>\n                </ion-item>\n            </ng-container>\n\n            <ng-container *ngIf="event.timestart + event.timeduration > currentTime">\n                <ion-item>\n                    <ion-label stacked>{{ \'addon.calendar.setnewreminder\' | translate }}</ion-label>\n                    <ion-datetime [(ngModel)]="notificationTimeText" [placeholder]="\'core.choosedots\' | translate" [displayFormat]="notificationFormat" [min]="notificationMin" [max]="notificationMax"></ion-datetime>\n                </ion-item>\n                <ion-item>\n                    <button ion-button block color="primary" (click)="addNotificationTime($event)" [disabled]="!notificationTimeText">{{ \'addon.calendar.setnewreminder\' | translate }}</button>\n                </ion-item>\n            </ng-container>\n        </ion-card>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/app/moodlemobile2/src/addon/calendar/pages/event/event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_calendar__["a" /* AddonCalendarProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__core_courses_providers_courses__["a" /* CoreCoursesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_helper__["a" /* AddonCalendarHelperProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_sites__["a" /* CoreSitesProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_local_notifications__["a" /* CoreLocalNotificationsProvider */], __WEBPACK_IMPORTED_MODULE_10__core_course_providers_course__["a" /* CoreCourseProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_utils_text__["a" /* CoreTextUtilsProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_utils_time__["a" /* CoreTimeUtilsProvider */]])
    ], AddonCalendarEventPage);
    return AddonCalendarEventPage;
}());

//# sourceMappingURL=event.js.map

/***/ })

});
//# sourceMappingURL=125.js.map
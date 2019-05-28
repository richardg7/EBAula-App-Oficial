webpackJsonp([96],{

/***/ 1953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModDataEntryPageModule", function() { return AddonModDataEntryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_comments_components_components_module__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_compile_components_compile_html_compile_html_module__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_rating_components_components_module__ = __webpack_require__(958);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_components_module__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entry__ = __webpack_require__(2088);
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










var AddonModDataEntryPageModule = /** @class */ (function () {
    function AddonModDataEntryPageModule() {
    }
    AddonModDataEntryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__entry__["a" /* AddonModDataEntryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__["a" /* CoreDirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* CoreComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__components_components_module__["a" /* AddonModDataComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__core_compile_components_compile_html_compile_html_module__["a" /* CoreCompileHtmlComponentModule */],
                __WEBPACK_IMPORTED_MODULE_5__core_comments_components_components_module__["a" /* CoreCommentsComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_9__entry__["a" /* AddonModDataEntryPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_7__core_rating_components_components_module__["a" /* CoreRatingComponentsModule */]
            ],
        })
    ], AddonModDataEntryPageModule);
    return AddonModDataEntryPageModule;
}());

//# sourceMappingURL=entry.module.js.map

/***/ }),

/***/ 2088:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddonModDataEntryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sites__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_groups__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_events__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_course_providers_course__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_helper__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_offline__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_sync__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_fields_delegate__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_components_module__ = __webpack_require__(399);
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
 * Page that displays the view entry page.
 */
var AddonModDataEntryPage = /** @class */ (function () {
    function AddonModDataEntryPage(params, utils, groupsProvider, domUtils, fieldsDelegate, courseProvider, dataProvider, dataOffline, dataHelper, sitesProvider, navCtrl, eventsProvider) {
        this.utils = utils;
        this.groupsProvider = groupsProvider;
        this.domUtils = domUtils;
        this.fieldsDelegate = fieldsDelegate;
        this.courseProvider = courseProvider;
        this.dataProvider = dataProvider;
        this.dataOffline = dataOffline;
        this.dataHelper = dataHelper;
        this.navCtrl = navCtrl;
        this.eventsProvider = eventsProvider;
        this.fields = {};
        this.title = '';
        this.moduleName = 'data';
        this.component = __WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */].COMPONENT;
        this.entryLoaded = false;
        this.selectedGroup = 0;
        this.offlineActions = [];
        this.hasOffline = false;
        this.entryRendered = '';
        this.extraImports = [__WEBPACK_IMPORTED_MODULE_13__components_components_module__["a" /* AddonModDataComponentsModule */]];
        this.module = params.get('module') || {};
        this.entryId = params.get('entryId') || null;
        this.courseId = params.get('courseId');
        this.selectedGroup = params.get('group') || 0;
        this.offset = params.get('offset');
        this.siteId = sitesProvider.getCurrentSiteId();
        this.title = this.module.name;
        this.moduleName = this.courseProvider.translateModuleName('data');
    }
    /**
     * View loaded.
     */
    AddonModDataEntryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fetchEntryData();
        // Refresh data if this discussion is synchronized automatically.
        this.syncObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_11__providers_sync__["a" /* AddonModDataSyncProvider */].AUTO_SYNCED, function (data) {
            if ((data.entryId == _this.entryId || data.offlineEntryId == _this.entryId) && _this.data.id == data.dataId) {
                if (data.deleted) {
                    // If deleted, go back.
                    _this.navCtrl.pop();
                }
                else {
                    _this.entryId = data.entryid;
                    _this.entryLoaded = false;
                    _this.fetchEntryData(true);
                }
            }
        }, this.siteId);
        // Refresh entry on change.
        this.entryChangedObserver = this.eventsProvider.on(__WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */].ENTRY_CHANGED, function (data) {
            if (data.entryId == _this.entryId && _this.data.id == data.dataId) {
                if (data.deleted) {
                    // If deleted, go back.
                    _this.navCtrl.pop();
                }
                else {
                    _this.entryLoaded = false;
                    _this.fetchEntryData(true);
                }
            }
        }, this.siteId);
    };
    /**
     * Fetch the entry data.
     *
     * @param  {boolean}      refresh If refresh the current data or not.
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEntryPage.prototype.fetchEntryData = function (refresh) {
        var _this = this;
        var fieldsArray;
        return this.dataProvider.getDatabase(this.courseId, this.module.id).then(function (data) {
            _this.title = data.name || _this.title;
            _this.data = data;
            return _this.setEntryIdFromOffset(data.id, _this.offset, _this.selectedGroup).then(function () {
                return _this.dataProvider.getDatabaseAccessInformation(data.id);
            });
        }).then(function (accessData) {
            _this.access = accessData;
            return _this.groupsProvider.getActivityGroupInfo(_this.data.coursemodule, accessData.canmanageentries)
                .then(function (groupInfo) {
                _this.groupInfo = groupInfo;
                // Check selected group is accessible.
                if (groupInfo && groupInfo.groups && groupInfo.groups.length > 0) {
                    if (!groupInfo.groups.some(function (group) { return _this.selectedGroup == group.id; })) {
                        _this.selectedGroup = groupInfo.groups[0].id;
                    }
                }
                return _this.dataOffline.getEntryActions(_this.data.id, _this.entryId);
            });
        }).then(function (actions) {
            _this.offlineActions = actions;
            _this.hasOffline = !!actions.length;
            return _this.dataProvider.getFields(_this.data.id).then(function (fieldsData) {
                _this.fields = _this.utils.arrayToObject(fieldsData, 'id');
                return _this.dataHelper.getEntry(_this.data, _this.entryId, _this.offlineActions);
            });
        }).then(function (entry) {
            _this.ratingInfo = entry.ratinginfo;
            entry = entry.entry;
            // Index contents by fieldid.
            entry.contents = _this.utils.arrayToObject(entry.contents, 'fieldid');
            fieldsArray = _this.utils.objectToArray(_this.fields);
            return _this.dataHelper.applyOfflineActions(entry, _this.offlineActions, fieldsArray);
        }).then(function (entryData) {
            _this.entry = entryData;
            var actions = _this.dataHelper.getActions(_this.data, _this.access, _this.entry);
            var templte = _this.data.singletemplate || _this.dataHelper.getDefaultTemplate('single', fieldsArray);
            _this.entryRendered = _this.dataHelper.displayShowFields(templte, fieldsArray, _this.entry, _this.offset, 'show', actions);
            _this.showComments = actions.comments;
            var entries = {};
            entries[_this.entryId] = _this.entry;
            // Pass the input data to the component.
            _this.jsData = {
                fields: _this.fields,
                entries: entries,
                data: _this.data
            };
        }).catch(function (message) {
            if (!refresh) {
                // Some call failed, retry without using cache since it might be a new activity.
                return _this.refreshAllData();
            }
            _this.domUtils.showErrorModalDefault(message, 'core.course.errorgetmodule', true);
        }).finally(function () {
            _this.domUtils.scrollToTop(_this.content);
            _this.entryLoaded = true;
        });
    };
    /**
     * Go to selected entry without changing state.
     *
     * @param  {number} offset Entry offset.
     * @return {Promise<any>} Resolved when done.
     */
    AddonModDataEntryPage.prototype.gotoEntry = function (offset) {
        this.offset = offset;
        this.entryId = null;
        this.entry = null;
        this.entryLoaded = false;
        return this.fetchEntryData();
    };
    /**
     * Refresh all the data.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshAllData = function () {
        var _this = this;
        var promises = [];
        promises.push(this.dataProvider.invalidateDatabaseData(this.courseId));
        if (this.data) {
            promises.push(this.dataProvider.invalidateEntryData(this.data.id, this.entryId));
            promises.push(this.groupsProvider.invalidateActivityGroupInfo(this.data.coursemodule));
            promises.push(this.dataProvider.invalidateEntriesData(this.data.id));
        }
        return Promise.all(promises).finally(function () {
            return _this.fetchEntryData(true);
        });
    };
    /**
     * Refresh the data.
     *
     * @param {any} [refresher] Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    AddonModDataEntryPage.prototype.refreshDatabase = function (refresher) {
        if (this.entryLoaded) {
            return this.refreshAllData().finally(function () {
                refresher && refresher.complete();
            });
        }
    };
    /**
     * Set group to see the database.
     *
     * @param  {number}       groupId Group identifier to set.
     * @return {Promise<any>}         Resolved when done.
     */
    AddonModDataEntryPage.prototype.setGroup = function (groupId) {
        this.selectedGroup = groupId;
        this.offset = 0;
        this.entry = null;
        this.entryId = null;
        this.entryLoaded = false;
        return this.fetchEntryData();
    };
    /**
     * Convenience function to translate offset to entry identifier and set next/previous entries.
     *
     * @param {number} dataId Data Id.
     * @param {number} [offset] Offset of the entry.
     * @param {number} [groupId] Group Id to get the entry.
     * @return {Promise<any>} Resolved when done.
     */
    AddonModDataEntryPage.prototype.setEntryIdFromOffset = function (dataId, offset, groupId) {
        var _this = this;
        if (typeof offset != 'number') {
            // Entry id passed as navigation parameter instead of the offset.
            // We don't display next/previous buttons in this case.
            this.nextOffset = null;
            this.previousOffset = null;
            return Promise.resolve();
        }
        var perPage = __WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */].PER_PAGE;
        var page = Math.floor(offset / perPage);
        var pageOffset = offset % perPage;
        return this.dataProvider.getEntries(dataId, groupId, undefined, undefined, page, perPage).then(function (entries) {
            if (!entries || !entries.entries || !entries.entries.length || pageOffset >= entries.entries.length) {
                return Promise.reject(null);
            }
            _this.entryId = entries.entries[pageOffset].id;
            _this.previousOffset = offset > 0 ? offset - 1 : null;
            if (pageOffset + 1 < entries.entries.length) {
                // Not the last entry on the page;
                _this.nextOffset = offset + 1;
            }
            else if (entries.entries.length < perPage) {
                // Last entry of the last page.
                _this.nextOffset = null;
            }
            else {
                // Last entry of the page, check if there are more pages.
                return _this.dataProvider.getEntries(dataId, groupId, undefined, undefined, page + 1, perPage).then(function (entries) {
                    _this.nextOffset = entries && entries.entries && entries.entries.length > 0 ? offset + 1 : null;
                });
            }
        });
    };
    /**
     * Function called when rating is updated online.
     */
    AddonModDataEntryPage.prototype.ratingUpdated = function () {
        this.dataProvider.invalidateEntryData(this.data.id, this.entryId);
    };
    /**
     * Component being destroyed.
     */
    AddonModDataEntryPage.prototype.ngOnDestroy = function () {
        this.syncObserver && this.syncObserver.off();
        this.entryChangedObserver && this.entryChangedObserver.off();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Content */])
    ], AddonModDataEntryPage.prototype, "content", void 0);
    AddonModDataEntryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addon-mod-data-entry',template:/*ion-inline-start:"/home/app/moodlemobile2/src/addon/mod/data/pages/entry/entry.html"*/'<ion-header>\n    <ion-navbar core-back-button>\n        <ion-title><core-format-text [text]="title"></core-format-text></ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher [enabled]="entryLoaded" (ionRefresh)="refreshDatabase($event)">\n        <ion-refresher-content pullingText="{{ \'core.pulltorefresh\' | translate }}"></ion-refresher-content>\n    </ion-refresher>\n    <core-loading [hideUntil]="entryLoaded">\n        <!-- Database entries found to be synchronized -->\n        <div class="core-warning-card" icon-start *ngIf="hasOffline">\n            <ion-icon name="warning"></ion-icon>\n            {{ \'core.hasdatatosync\' | translate: {$a: moduleName} }}\n        </div>\n\n        <ion-item text-wrap *ngIf="groupInfo && (groupInfo.separateGroups || groupInfo.visibleGroups)">\n            <ion-label id="addon-data-groupslabel" *ngIf="groupInfo.separateGroups">{{ \'core.groupsseparate\' | translate }}</ion-label>\n            <ion-label id="addon-data-groupslabel" *ngIf="groupInfo.visibleGroups">{{ \'core.groupsvisible\' | translate }}</ion-label>\n            <ion-select [(ngModel)]="selectedGroup" (ionChange)="setGroup(selectedGroup)" aria-labelledby="addon-data-groupslabel" interface="action-sheet">\n                <ion-option *ngFor="let groupOpt of groupInfo.groups" [value]="groupOpt.id">{{groupOpt.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <div class="addon-data-contents addon-data-entries-{{data.id}}" *ngIf="entry">\n            <core-style [css]="data.csstemplate" prefix=".addon-data-entries-{{data.id}}"></core-style>\n\n            <core-compile-html [text]="entryRendered" [jsData]="jsData" [extraImports]="extraImports"></core-compile-html>\n        </div>\n\n        <core-rating-rate *ngIf="data && entry && ratingInfo && (!data.approval || entry.approved)" [ratingInfo]="ratingInfo" contextLevel="module" [instanceId]="data.coursemodule" [itemId]="entry.id" [itemSetId]="0" [courseId]="courseId" [aggregateMethod]="data.assessed" [scaleId]="data.scale" [userId]="entry.userid" (onUpdate)="ratingUpdated()"></core-rating-rate>\n        <core-rating-aggregate *ngIf="data && entry && ratingInfo" [ratingInfo]="ratingInfo" contextLevel="module" [instanceId]="data.coursemodule" [itemId]="entry.id" [courseId]="courseId" [aggregateMethod]="data.assessed" [scaleId]="data.scale"></core-rating-aggregate>\n\n        <ion-item *ngIf="data && entry">\n            <core-comments contextLevel="module" [instanceId]="data.coursemodule" component="mod_data" [itemId]="entry.id" area="database_entry"></core-comments>\n        </ion-item>\n\n        <ion-grid *ngIf="previousOffset != null || nextOffset != null">\n            <ion-row align-items-center>\n                <ion-col *ngIf="previousOffset != null">\n                    <button ion-button block outline icon-start (click)="gotoEntry(previousOffset)">\n                        <ion-icon name="arrow-back" md="ios-arrow-back"></ion-icon>\n                        {{ \'core.previous\' | translate }}\n                    </button>\n                </ion-col>\n                <ion-col *ngIf="nextOffset != null">\n                    <button ion-button block icon-end (click)="gotoEntry(nextOffset)">\n                        {{ \'core.next\' | translate }}\n                        <ion-icon name="arrow-forward" md="ios-arrow-forward"></ion-icon>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </core-loading>\n</ion-content>\n'/*ion-inline-end:"/home/app/moodlemobile2/src/addon/mod/data/pages/entry/entry.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* CoreUtilsProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_groups__["a" /* CoreGroupsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utils_dom__["a" /* CoreDomUtilsProvider */], __WEBPACK_IMPORTED_MODULE_12__providers_fields_delegate__["a" /* AddonModDataFieldsDelegate */],
            __WEBPACK_IMPORTED_MODULE_7__core_course_providers_course__["a" /* CoreCourseProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_data__["a" /* AddonModDataProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_offline__["a" /* AddonModDataOfflineProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_helper__["a" /* AddonModDataHelperProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_sites__["a" /* CoreSitesProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_events__["a" /* CoreEventsProvider */]])
    ], AddonModDataEntryPage);
    return AddonModDataEntryPage;
}());

//# sourceMappingURL=entry.js.map

/***/ })

});
//# sourceMappingURL=96.js.map
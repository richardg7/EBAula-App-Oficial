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

import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Badge } from '@ionic-native/badge';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import { TranslateService } from '@ngx-translate/core';
import { CoreAppProvider } from '@providers/app';
import { CoreInitDelegate } from '@providers/init';
import { CoreLoggerProvider } from '@providers/logger';
import { CoreSitesProvider, CoreSiteSchema } from '@providers/sites';
import { CoreSitesFactoryProvider } from '@providers/sites-factory';
import { AddonPushNotificationsDelegate } from './delegate';
import { CoreLocalNotificationsProvider } from '@providers/local-notifications';
import { CoreUtilsProvider } from '@providers/utils/utils';
import { CoreTextUtilsProvider } from '@providers/utils/text';
import { CoreConfigProvider } from '@providers/config';
import { CoreConstants } from '@core/constants';
import { CoreConfigConstants } from '../../../configconstants';
import { ILocalNotification } from '@ionic-native/local-notifications';
import { SQLiteDB, SQLiteDBTableSchema } from '@classes/sqlitedb';
import { CoreSite } from '@classes/site';

/**
 * Data needed to register a device in a Moodle site.
 */
export interface AddonPushNotificationsRegisterData {
    /**
     * App ID.
     * @type {string}
     */
    appid: string;

    /**
     * Device UUID.
     * @type {string}
     */
    uuid: string;

    /**
     * Device name.
     * @type {string}
     */
    name: string;

    /**
     * Device model.
     * @type {string}
     */
    model: string;

    /**
     * Device platform.
     * @type {string}
     */
    platform: string;

    /**
     * Device version.
     * @type {string}
     */
    version: string;

    /**
     * Push ID.
     * @type {string}
     */
    pushid: string;
}

/**
 * Service to handle push notifications.
 */
@Injectable()
export class AddonPushNotificationsProvider {
    protected logger;
    protected pushID: string;
    protected appDB: SQLiteDB;
    static COMPONENT = 'AddonPushNotificationsProvider';

    // Variables for database.
    static BADGE_TABLE = 'addon_pushnotifications_badge';
    static PENDING_UNREGISTER_TABLE = 'addon_pushnotifications_pending_unregister';
    static REGISTERED_DEVICES_TABLE = 'addon_pushnotifications_registered_devices';
    protected appTablesSchema: SQLiteDBTableSchema[] = [
        {
            name: AddonPushNotificationsProvider.BADGE_TABLE,
            columns: [
                {
                    name: 'siteid',
                    type: 'TEXT'
                },
                {
                    name: 'addon',
                    type: 'TEXT'
                },
                {
                    name: 'number',
                    type: 'INTEGER'
                }
            ],
            primaryKeys: ['siteid', 'addon']
        },
        {
            name: AddonPushNotificationsProvider.PENDING_UNREGISTER_TABLE,
            columns: [
                {
                    name: 'siteid',
                    type: 'TEXT',
                    primaryKey: true
                },
                {
                    name: 'siteurl',
                    type: 'TEXT'
                },
                {
                    name: 'token',
                    type: 'TEXT'
                },
                {
                    name: 'info',
                    type: 'TEXT'
                }
            ]
        }
    ];
    protected siteSchema: CoreSiteSchema = {
        name: 'AddonPushNotificationsProvider',
        version: 1,
        tables: [
            {
                name: AddonPushNotificationsProvider.REGISTERED_DEVICES_TABLE,
                columns: [
                    {
                        name: 'appid',
                        type: 'TEXT',
                    },
                    {
                        name: 'uuid',
                        type: 'TEXT'
                    },
                    {
                        name: 'name',
                        type: 'TEXT'
                    },
                    {
                        name: 'model',
                        type: 'TEXT'
                    },
                    {
                        name: 'platform',
                        type: 'TEXT'
                    },
                    {
                        name: 'version',
                        type: 'TEXT'
                    },
                    {
                        name: 'pushid',
                        type: 'TEXT'
                    },
                ],
                primaryKeys: ['appid', 'uuid']
            }
        ],
    };

    constructor(logger: CoreLoggerProvider, protected appProvider: CoreAppProvider, private initDelegate: CoreInitDelegate,
            protected pushNotificationsDelegate: AddonPushNotificationsDelegate, protected sitesProvider: CoreSitesProvider,
            private badge: Badge, private localNotificationsProvider: CoreLocalNotificationsProvider,
            private utils: CoreUtilsProvider, private textUtils: CoreTextUtilsProvider, private push: Push,
            private configProvider: CoreConfigProvider, private device: Device, private zone: NgZone,
            private translate: TranslateService, private platform: Platform, private sitesFactory: CoreSitesFactoryProvider) {
        this.logger = logger.getInstance('AddonPushNotificationsProvider');
        this.appDB = appProvider.getDB();
        this.appDB.createTablesFromSchema(this.appTablesSchema);
        this.sitesProvider.registerSiteSchema(this.siteSchema);

        platform.ready().then(() => {
            // Create the default channel.
            this.createDefaultChannel();

            translate.onLangChange.subscribe((event: any) => {
                // Update the channel name.
                this.createDefaultChannel();
            });
        });
    }

    /**
     * Delete all badge records for a given site.
     *
     * @param  {string} siteId Site ID.
     * @return {Promise<any>}  Resolved when done.
     */
    cleanSiteCounters(siteId: string): Promise<any> {
        return this.appDB.deleteRecords(AddonPushNotificationsProvider.BADGE_TABLE, {siteid: siteId} ).finally(() => {
            this.updateAppCounter();
        });
    }

    /**
     * Create the default push channel. It is used to change the name.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    protected createDefaultChannel(): Promise<any> {
        if (!this.platform.is('android')) {
            return Promise.resolve();
        }

        return this.push.createChannel({
            id: 'PushPluginChannel',
            description: this.translate.instant('core.misc'),
            importance: 4
        }).catch((error) => {
            this.logger.error('Error changing push channel name', error);
        });
    }

    /**
     * Returns options for push notifications based on device.
     *
     * @return {Promise<PushOptions>} Promise with the push options resolved when done.
     */
    protected getOptions(): Promise<PushOptions> {
        return this.configProvider.get(CoreConstants.SETTINGS_NOTIFICATION_SOUND, true).then((soundEnabled) => {
            return {
                android: {
                    sound: !!soundEnabled,
                    icon: 'smallicon'
                },
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: !!soundEnabled
                },
                windows: {
                    sound: !!soundEnabled
                }
            };
        });
    }

    /**
     * Get the pushID for this device.
     *
     * @return {string} Push ID.
     */
    getPushId(): string {
        return this.pushID;
    }

    /**
     * Get data to register the device in Moodle.
     *
     * @return {AddonPushNotificationsRegisterData} Data.
     */
    protected getRegisterData(): AddonPushNotificationsRegisterData {
        return {
            appid:      CoreConfigConstants.app_id,
            name:       this.device.manufacturer || '',
            model:      this.device.model,
            platform:   this.device.platform + '-fcm',
            version:    this.device.version,
            pushid:     this.pushID,
            uuid:       this.device.uuid
        };
    }

    /**
     * Get Sitebadge  counter from the database.
     *
     * @param  {string} siteId Site ID.
     * @return {Promise<any>}       Promise resolved with the stored badge counter for the site.
     */
    getSiteCounter(siteId: string): Promise<any> {
        return this.getAddonBadge(siteId);
    }

    /**
     * Function called when a push notification is clicked. Redirect the user to the right state.
     *
     * @param {any} notification Notification.
     */
    notificationClicked(notification: any): void {
        this.initDelegate.ready().then(() => {
            this.pushNotificationsDelegate.clicked(notification);
        });
    }

    /**
     * This function is called when we receive a Notification from APNS or a message notification from GCM.
     * The app can be in foreground or background,
     * if we are in background this code is executed when we open the app clicking in the notification bar.
     *
     * @param {any} notification Notification received.
     */
    onMessageReceived(notification: any): void {
        const data = notification ? notification.additionalData : {};

        this.sitesProvider.getSite(data.site).then(() => {
            if (this.utils.isTrueOrOne(data.foreground)) {
                // If the app is in foreground when the notification is received, it's not shown. Let's show it ourselves.
                if (this.localNotificationsProvider.isAvailable()) {
                    const localNotif: ILocalNotification = {
                            id: 1,
                            data: data,
                            title: '',
                            text: ''
                        },
                        promises = [];

                    // Apply formatText to title and message.
                    promises.push(this.textUtils.formatText(notification.title, true, true).then((formattedTitle) => {
                        localNotif.title = formattedTitle;
                    }).catch(() => {
                        localNotif.title = notification.title;
                    }));

                    promises.push(this.textUtils.formatText(notification.message, true, true).then((formattedMessage) => {
                        localNotif.text = formattedMessage;
                    }).catch(() => {
                        localNotif.text = notification.message;
                    }));

                    Promise.all(promises).then(() => {
                        this.localNotificationsProvider.schedule(localNotif, AddonPushNotificationsProvider.COMPONENT, data.site);
                    });
                }

                // Trigger a notification received event.
                this.initDelegate.ready().then(() => {
                    data.title = notification.title;
                    data.message = notification.message;
                    this.pushNotificationsDelegate.received(data);
                });
            } else {
                // The notification was clicked.
                this.notificationClicked(data);
            }
        });
    }

    /**
     * Unregisters a device from a certain Moodle site.
     *
     * @param {CoreSite} site Site to unregister from.
     * @return {Promise<any>} Promise resolved when device is unregistered.
     */
    unregisterDeviceOnMoodle(site: CoreSite): Promise<any> {
        if (!site || !this.appProvider.isMobile()) {
            return Promise.reject(null);
        }

        this.logger.debug(`Unregister device on Moodle: '${site.id}'`);

        const data = {
            appid: CoreConfigConstants.app_id,
            uuid:  this.device.uuid
        };

        return site.write('core_user_remove_user_device', data).then((response) => {
            if (!response || !response.removed) {
                return Promise.reject(null);
            }

            const promises = [];

            // Remove the device from the local DB.
            promises.push(site.getDb().deleteRecords(AddonPushNotificationsProvider.REGISTERED_DEVICES_TABLE,
                    this.getRegisterData()));

            // Remove pending unregisters for this site.
            promises.push(this.appDB.deleteRecords(AddonPushNotificationsProvider.PENDING_UNREGISTER_TABLE, {siteid: site.id}));

            return Promise.all(promises).catch(() => {
                // Ignore errors.
            });
        }).catch((error) => {
            if (this.utils.isWebServiceError(error)) {
                // It's a WebService error, can't unregister.
                return Promise.reject(error);
            }

            // Store the pending unregister so it's retried again later.
            return this.appDB.insertRecord(AddonPushNotificationsProvider.PENDING_UNREGISTER_TABLE, {
                siteid: site.id,
                siteurl: site.getURL(),
                token: site.getToken(),
                info: JSON.stringify(site.getInfo())
            }).then(() => {
                return Promise.reject(error);
            });
        });
    }

    /**
     * Update Counter for an addon. It will update the refered siteId counter and the total badge.
     * It will return the updated addon counter.
     *
     * @param  {string} addon    Registered addon name to set the badge number.
     * @param  {number} value    The number to be stored.
     * @param  {string} [siteId] Site ID. If not defined, use current site.
     * @return {Promise<any>}    Promise resolved with the stored badge counter for the addon on the site.
     */
    updateAddonCounter(addon: string, value: number, siteId?: string): Promise<any> {
        if (this.pushNotificationsDelegate.isCounterHandlerRegistered(addon)) {
            siteId = siteId || this.sitesProvider.getCurrentSiteId();

            return this.saveAddonBadge(value, siteId, addon).then(() => {
                return this.updateSiteCounter(siteId).then(() => {
                    return value;
                });
            });
        }

        return Promise.resolve(0);
    }

    /**
     * Update total badge counter of the app.
     *
     * @return {Promise<any>}        Promise resolved with the stored badge counter for the site.
     */
    updateAppCounter(): Promise<any> {
        return this.sitesProvider.getSitesIds().then((sites) => {
            const promises = [];
            sites.forEach((siteId) => {
                promises.push(this.getAddonBadge(siteId));
            });

            return Promise.all(promises).then((counters) => {
                const total = counters.reduce((previous, counter) => {
                    // The app badge counter does not support strings, so parse to int before.
                    return previous + parseInt(counter, 10);
                }, 0);

                if (!this.appProvider.isDesktop() && !this.appProvider.isMobile()) {
                    // Browser doesn't have an app badge, stop.
                    return total;
                }

                // Set the app badge.
                return this.badge.set(total).then(() => {
                    return total;
                });
            });
        });
    }

    /**
     * Update counter for a site using the stored addon data. It will update the total badge application number.
     * It will return the updated site counter.
     *
     * @param  {string} siteId Site ID.
     * @return {Promise<any>}       Promise resolved with the stored badge counter for the site.
     */
    updateSiteCounter(siteId: string): Promise<any> {
        const addons = this.pushNotificationsDelegate.getCounterHandlers(),
            promises = [];

        for (const x in addons) {
            promises.push(this.getAddonBadge(siteId, addons[x]));
        }

        return Promise.all(promises).then((counters) => {
            let plus = false,
                total = counters.reduce((previous, counter) => {
                    // Check if there is a plus sign at the end of the counter.
                    if (counter != parseInt(counter, 10)) {
                        plus = true;
                        counter = parseInt(counter, 10);
                    }

                    return previous + counter;
                }, 0);

            total = plus && total > 0 ? total + '+' : total;

            // Save the counter on site.
            return this.saveAddonBadge(total, siteId);
        }).then((siteTotal) => {
            return this.updateAppCounter().then(() => {
                return siteTotal;
            });
        });
    }

    /**
     * Register a device in Apple APNS or Google GCM.
     *
     * @return {Promise<any>} Promise resolved when the device is registered.
     */
    registerDevice(): Promise<any> {
        try {
            // Check if sound is enabled for notifications.
            return this.getOptions().then((options) => {
                const pushObject: PushObject = this.push.init(options);

                pushObject.on('notification').subscribe((notification: any) => {
                    // Execute the callback in the Angular zone, so change detection doesn't stop working.
                    this.zone.run(() => {
                        this.logger.log('Received a notification', notification);
                        this.onMessageReceived(notification);
                    });
                });

                pushObject.on('registration').subscribe((data: any) => {
                    // Execute the callback in the Angular zone, so change detection doesn't stop working.
                    this.zone.run(() => {
                        this.pushID = data.registrationId;
                        if (this.sitesProvider.isLoggedIn()) {
                            this.registerDeviceOnMoodle().catch((error) => {
                                this.logger.warn('Can\'t register device', error);
                            });
                        }
                    });
                });

                pushObject.on('error').subscribe((error: any) => {
                    // Execute the callback in the Angular zone, so change detection doesn't stop working.
                    this.zone.run(() => {
                        this.logger.warn('Error with Push plugin', error);
                    });
                });
            });
        } catch (ex) {
            // Ignore errors.
            this.logger.warn(ex);
        }

        return Promise.reject(null);
    }

    /**
     * Registers a device on a Moodle site if needed.
     *
     * @param {string} [siteId] Site ID. If not defined, current site.
     * @param {boolean} [forceUnregister] Whether to force unregister and register.
     * @return {Promise<any>} Promise resolved when device is registered.
     */
    registerDeviceOnMoodle(siteId?: string, forceUnregister?: boolean): Promise<any> {
        this.logger.debug('Register device on Moodle.');

        if (!this.pushID || !this.appProvider.isMobile()) {
            return Promise.reject(null);
        }

        const data = this.getRegisterData();
        let result,
            site: CoreSite;

        return this.sitesProvider.getSite(siteId).then((s) => {
            site = s;

            if (forceUnregister) {
                return {unregister: true, register: true};
            } else {
                // Check if the device is already registered.
                return this.shouldRegister(data, site);
            }
        }).then((res) => {
            result = res;

            if (result.unregister) {
                // Unregister the device first.
                return this.unregisterDeviceOnMoodle(site).catch(() => {
                    // Ignore errors.
                });
            }
        }).then(() => {
            if (result.register) {
                // Now register the device.
                return site.write('core_user_add_user_device', this.utils.clone(data)).then((response) => {
                    // Insert the device in the local DB.
                    return site.getDb().insertRecord(AddonPushNotificationsProvider.REGISTERED_DEVICES_TABLE, data)
                            .catch((error) => {
                        // Ignore errors.
                    });
                });
            }
        }).finally(() => {
            // Remove pending unregisters for this site.
            this.appDB.deleteRecords(AddonPushNotificationsProvider.PENDING_UNREGISTER_TABLE, {siteid: site.id}).catch(() => {
                // Ignore errors.
            });
        });
    }

    /**
     * Get the addon/site badge counter from the database.
     *
     * @param  {string} siteId   Site ID.
     * @param  {string} [addon='site'] Registered addon name. If not defined it will store the site total.
     * @return {Promise<any>}         Promise resolved with the stored badge counter for the addon or site or 0 if none.
     */
    protected getAddonBadge(siteId?: string, addon: string = 'site'): Promise<any> {
        return this.appDB.getRecord(AddonPushNotificationsProvider.BADGE_TABLE, {siteid: siteId, addon: addon}).then((entry) => {
             return (entry && entry.number) || 0;
        }).catch(() => {
            return 0;
        });
    }

    /**
     * Retry pending unregisters.
     *
     * @param {string} [siteId] If defined, retry only for that site if needed. Otherwise, retry all pending unregisters.
     * @return {Promise<any>} Promise resolved when done.
     */
    retryUnregisters(siteId?: string): Promise<any> {
        let promise;

        if (siteId) {
            // Check if the site has a pending unregister.
            promise = this.appDB.getRecords(AddonPushNotificationsProvider.REGISTERED_DEVICES_TABLE, {siteid: siteId});
        } else {
            // Get all pending unregisters.
            promise = this.appDB.getAllRecords(AddonPushNotificationsProvider.PENDING_UNREGISTER_TABLE);
        }

        return promise.then((results) => {
            const promises = [];

            results.forEach((result) => {
                // Create a temporary site to unregister.
                const tmpSite = this.sitesFactory.makeSite(result.siteid, result.siteurl, result.token,
                        this.textUtils.parseJSON(result.info, {}));

                promises.push(this.unregisterDeviceOnMoodle(tmpSite));
            });

            return Promise.all(promises);
        });
    }

    /**
     * Save the addon/site badgecounter on the database.
     *
     * @param  {number} value   The number to be stored.
     * @param  {string} [siteId] Site ID. If not defined, use current site.
     * @param  {string} [addon='site'] Registered addon name. If not defined it will store the site total.
     * @return {Promise<any>}         Promise resolved with the stored badge counter for the addon or site.
     */
    protected saveAddonBadge(value: number, siteId?: string, addon: string = 'site'): Promise<any> {
        siteId = siteId || this.sitesProvider.getCurrentSiteId();

        const entry = {
            siteid: siteId,
            addon: addon,
            number: value
        };

        return this.appDB.insertRecord(AddonPushNotificationsProvider.BADGE_TABLE, entry).then(() => {
            return value;
        });
    }

    /**
     * Check if device should be registered (and unregistered first).
     *
     * @param {AddonPushNotificationsRegisterData} data Data of the device.
     * @param {CoreSite} site Site to use.
     * @return {Promise<{register: boolean, unregister: boolean}>} Promise resolved with booleans: whether to register/unregister.
     */
    protected shouldRegister(data: AddonPushNotificationsRegisterData, site: CoreSite)
            : Promise<{register: boolean, unregister: boolean}> {

        // Check if the device is already registered.
        return site.getDb().getRecords(AddonPushNotificationsProvider.REGISTERED_DEVICES_TABLE, {
            appid: data.appid,
            uuid: data.uuid
        }).catch(() => {
            // Ignore errors.
            return [];
        }).then((records: AddonPushNotificationsRegisterData[]) => {
            let isStored = false,
                versionOrPushChanged = false;

            records.forEach((record) => {
                if (record.name == data.name && record.model == data.model && record.platform == data.platform) {
                    if (record.version == data.version && record.pushid == data.pushid) {
                        // The device is already stored.
                        isStored = true;
                    } else {
                        // The version or pushid has changed.
                        versionOrPushChanged = true;
                    }
                }
            });

            if (isStored) {
                // The device has already been registered, no need to register it again.
                return {
                    register: false,
                    unregister: false
                };
            } else if (versionOrPushChanged) {
                // This data can be updated by calling register WS, no need to call unregister.
                return {
                    register: true,
                    unregister: false
                };
            } else {
                return {
                    register: true,
                    unregister: true
                };
            }
        });
    }
}

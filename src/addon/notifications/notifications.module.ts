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

import { NgModule, NgZone } from '@angular/core';
import { AddonNotificationsProvider } from './providers/notifications';
import { AddonNotificationsMainMenuHandler } from './providers/mainmenu-handler';
import { AddonNotificationsSettingsHandler } from './providers/settings-handler';
import { AddonNotificationsCronHandler } from './providers/cron-handler';
import { CoreAppProvider } from '@providers/app';
import { CoreContentLinksHelperProvider } from '@core/contentlinks/providers/helper';
import { CoreMainMenuDelegate } from '@core/mainmenu/providers/delegate';
import { CoreSettingsDelegate } from '@core/settings/providers/delegate';
import { CoreCronDelegate } from '@providers/cron';
import { CoreLocalNotificationsProvider } from '@providers/local-notifications';
import { CoreSitesProvider } from '@providers/sites';
import { CoreUrlUtilsProvider } from '@providers/utils/url';
import { CoreUtilsProvider } from '@providers/utils/utils';
import { AddonPushNotificationsDelegate } from '@addon/pushnotifications/providers/delegate';
import { AddonModForumProvider } from '@addon/mod/forum/providers/forum';

// List of providers (without handlers).
export const ADDON_NOTIFICATIONS_PROVIDERS: any[] = [
    AddonNotificationsProvider
];

@NgModule({
    declarations: [
    ],
    imports: [
    ],
    providers: [
        AddonNotificationsProvider,
        AddonNotificationsMainMenuHandler,
        AddonNotificationsSettingsHandler,
        AddonNotificationsCronHandler,
    ]
})
export class AddonNotificationsModule {
    constructor(mainMenuDelegate: CoreMainMenuDelegate, mainMenuHandler: AddonNotificationsMainMenuHandler,
            settingsDelegate: CoreSettingsDelegate, settingsHandler: AddonNotificationsSettingsHandler,
            cronDelegate: CoreCronDelegate, cronHandler: AddonNotificationsCronHandler, zone: NgZone,
            appProvider: CoreAppProvider, utils: CoreUtilsProvider, sitesProvider: CoreSitesProvider,
            notificationsProvider: AddonNotificationsProvider, localNotifications: CoreLocalNotificationsProvider,
            linkHelper: CoreContentLinksHelperProvider, pushNotificationsDelegate: AddonPushNotificationsDelegate,
            urlUtils: CoreUrlUtilsProvider, forumProvider: AddonModForumProvider) {

        mainMenuDelegate.registerHandler(mainMenuHandler);
        settingsDelegate.registerHandler(settingsHandler);
        cronDelegate.register(cronHandler);

        const notificationClicked = (notification: any): void => {

            // Temporary fix to make forum notifications work. This will be improved in next release.
            if (notification.moodlecomponent == 'mod_forum' && notification.name == 'posts') {
                sitesProvider.isFeatureDisabled('CoreCourseModuleDelegate_AddonModForum', notification.site).then((disabled) => {
                    if (disabled) {
                        // Forum is disabled, stop.
                        return;
                    }

                    const contextUrlParams = urlUtils.extractUrlParams(notification.contexturl),
                        pageParams: any = {
                            courseId: Number(notification.courseid),
                            discussionId: Number(contextUrlParams.d),
                        };

                    if (contextUrlParams.urlHash) {
                        pageParams.postId = Number(contextUrlParams.urlHash.replace('p', ''));
                    }

                    forumProvider.invalidateDiscussionPosts(pageParams.discussionId).catch(() => {
                        // Ignore errors.
                    }).then(() => {
                        linkHelper.goInSite(undefined, 'AddonModForumDiscussionPage', pageParams, notification.site);
                    });
                });
            } else {
                goToNotifications(notification);
            }
        };
        const goToNotifications = (notification: any): void => {
            sitesProvider.isFeatureDisabled('CoreMainMenuDelegate_AddonNotifications', notification.site).then((disabled) => {
                if (disabled) {
                    // Notifications are disabled, stop.
                    return;
                }

                notificationsProvider.invalidateNotificationsList().finally(() => {
                    linkHelper.goInSite(undefined, 'AddonNotificationsListPage', undefined, notification.site);
                });
            });
        };

        if (appProvider.isDesktop()) {
            // Listen for clicks in simulated push notifications.
            localNotifications.registerClick(AddonNotificationsProvider.PUSH_SIMULATION_COMPONENT, notificationClicked);
        }

        // Register push notification clicks.
        pushNotificationsDelegate.on('click').subscribe((notification) => {
            if (utils.isTrueOrOne(notification.notif)) {
                // Execute the callback in the Angular zone, so change detection doesn't stop working.
                zone.run(() => {
                    notificationClicked(notification);
                });

                return true;
            }
        });
    }
}

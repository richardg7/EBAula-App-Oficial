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
import { CoreSiteWSPreSets } from '@classes/site';
import { CoreAppProvider } from '@providers/app';
import { CoreEventsProvider } from '@providers/events';
import { CoreSitesProvider } from '@providers/sites';
import { CoreUserProvider } from '@core/user/providers/user';
import { CoreUtilsProvider } from '@providers/utils/utils';
import { CoreRatingOfflineProvider } from './offline';

/**
 * Structure of the rating info returned by web services.
 */
export interface CoreRatingInfo {
    contextid: number;
    component: string;
    ratingarea: string;
    canviewall: boolean;
    canviewany: boolean;
    scales?: CoreRatingScale[];
    ratings?: CoreRatingInfoItem[];
}

/**
 * Structure of scales in the rating info.
 */
export interface CoreRatingScale {
    id: number;
    courseid?: number;
    name?: string;
    max: number;
    isnumeric: boolean;
    items?: {value: number, name: string}[];
}

/**
 * Structure of items in the rating info.
 */
export interface CoreRatingInfoItem {
    itemid: number;
    scaleid?: number;
    scale?: CoreRatingScale;
    userid?: number;
    aggregate?: number;
    aggregatestr?: string;
    count?: number;
    rating?: number;
    canrate?: boolean;
    canviewaggregate?: boolean;
}

/**
 * Structure of a rating returned by the item ratings web service.
 */
export interface CoreRatingItemRating {
    id: number;
    userid: number;
    userpictureurl: string;
    userfullname: string;
    rating: string;
    timemodified: number;
}

/**
 * Service to handle ratings.
 */
@Injectable()
export class CoreRatingProvider {

    static AGGREGATE_NONE = 0; // No ratings.
    static AGGREGATE_AVERAGE = 1;
    static AGGREGATE_COUNT = 2;
    static AGGREGATE_MAXIMUM = 3;
    static AGGREGATE_MINIMUM = 4;
    static AGGREGATE_SUM = 5;

    static UNSET_RATING = -999;

    static AGGREGATE_CHANGED_EVENT = 'core_rating_aggregate_changed';
    static RATING_SAVED_EVENT = 'core_rating_rating_saved';

    protected ROOT_CACHE_KEY = 'CoreRating:';

    constructor(private appProvider: CoreAppProvider,
            private eventsProvider: CoreEventsProvider,
            private sitesProvider: CoreSitesProvider,
            private userProvider: CoreUserProvider,
            private utils: CoreUtilsProvider,
            private ratingOffline: CoreRatingOfflineProvider) {}

    /**
     * Returns whether the web serivce to add ratings is available.
     *
     * @return {boolean} If WS is abalaible.
     * @since 3.2
     */
    isAddRatingWSAvailable(): boolean {
        return this.sitesProvider.wsAvailableInCurrentSite('core_rating_add_rating');
    }

    /**
     * Add a rating to an item.
     *
     * @param {string} component Component. Example: "mod_forum".
     * @param {string} ratingArea Rating area. Example: "post".
     * @param {string} contextLevel Context level: course, module, user, etc.
     * @param {number} instanceId Context instance id.
     * @param {number} itemId Item id. Example: forum post id.
     * @param {number} itemSetId Item set id. Example: forum discussion id.
     * @param {number} courseId Course id.
     * @param {number} scaleId Scale id.
     * @param {number} rating Rating value. Use CoreRatingProvider.UNSET_RATING to delete rating.
     * @param {number} ratedUserId Rated user id.
     * @param {number} aggregateMethod Aggregate method.
     * @param {string} [siteId] Site ID. If not defined, current site.
     * @return {Promise<CoreRatingItemRating|null>} Promise resolved with the aggregated rating or null if stored offline.
     * @since 3.2
     */
    addRating(component: string, ratingArea: string, contextLevel: string, instanceId: number, itemId: number, itemSetId: number,
            courseId: number, scaleId: number, rating: number, ratedUserId: number, aggregateMethod: number, siteId?: string):
            Promise<CoreRatingItemRating[]> {
        siteId = siteId || this.sitesProvider.getCurrentSiteId();

        // Convenience function to store a rating to be synchronized later.
        const storeOffline = (): Promise<any> => {
            return this.ratingOffline.addRating(component, ratingArea, contextLevel, instanceId, itemId, itemSetId, courseId,
                    scaleId, rating, ratedUserId, aggregateMethod, siteId).then(() => {
                this.eventsProvider.trigger(CoreRatingProvider.RATING_SAVED_EVENT, {
                    component,
                    ratingArea,
                    contextLevel,
                    instanceId,
                    itemSetId,
                    itemId
                }, siteId);

                return null;
            });
        };

        if (!this.appProvider.isOnline()) {
            // App is offline, store the action.
            return storeOffline();
        }

        return this.ratingOffline.deleteRating(component, ratingArea, contextLevel, instanceId, itemId, siteId).then(() => {
            return this.addRatingOnline(component, ratingArea, contextLevel, instanceId, itemId, scaleId, rating, ratedUserId,
                    aggregateMethod, siteId).catch((error) => {

                if (this.utils.isWebServiceError(error)) {
                    // The WebService has thrown an error or offline not supported, reject.
                    return Promise.reject(error);
                }

                // Couldn't connect to server, store offline.
                return storeOffline();
            });
        });
    }

    /**
     * Add a rating to an item. It will fail if offline or cannot connect.
     *
     * @param {string} component Component. Example: "mod_forum".
     * @param {string} ratingArea Rating area. Example: "post".
     * @param {string} contextLevel Context level: course, module, user, etc.
     * @param {number} instanceId Context instance id.
     * @param {number} itemId Item id. Example: forum post id.
     * @param {number} scaleId Scale id.
     * @param {number} rating Rating value. Use CoreRatingProvider.UNSET_RATING to delete rating.
     * @param {number} ratedUserId Rated user id.
     * @param {number} aggregateMethod Aggregate method.
     * @param {string} [siteId] Site ID. If not defined, current site.
     * @return {Promise<CoreRatingItemRating>} Promise resolved with the aggregated rating.
     * @since 3.2
     */
    addRatingOnline(component: string, ratingArea: string, contextLevel: string, instanceId: number, itemId: number,
            scaleId: number, rating: number, ratedUserId: number, aggregateMethod: number, siteId?: string):
            Promise<CoreRatingItemRating> {

        return this.sitesProvider.getSite(siteId).then((site) => {
            const params = {
                contextlevel: contextLevel,
                instanceid: instanceId,
                component: component,
                ratingarea: ratingArea,
                itemid: itemId,
                scaleid: scaleId,
                rating: rating,
                rateduserid: ratedUserId,
                aggregation: aggregateMethod
            };

            return site.write('core_rating_add_rating', params).then((response) => {
                return this.invalidateRatingItems(contextLevel, instanceId, component, ratingArea, itemId, scaleId).then(() => {
                    this.eventsProvider.trigger(CoreRatingProvider.AGGREGATE_CHANGED_EVENT, {
                        contextLevel,
                        instanceId,
                        component,
                        ratingArea,
                        itemId,
                        aggregate: response.aggregate,
                        count: response.count
                    });

                    return response;
                });
            });
        });
    }

    /**
     * Get item ratings.
     *
     * @param {string} contextLevel Context level: course, module, user, etc.
     * @param {number} instanceId Context instance id.
     * @param {string} component Component. Example: "mod_forum".
     * @param {string} ratingArea Rating area. Example: "post".
     * @param {number} itemId Item id. Example: forum post id.
     * @param {number} scaleId Scale id.
     * @param {string} [sort="timemodified"] Sort field.
     * @param {number} [courseId] Course id. Used for fetching user profiles.
     * @param {string} [siteId] Site ID. If not defined, current site.
     * @param {boolean} [ignoreCache=false] True if it should ignore cached data (it will always fail in offline or server down).
     * @return {Promise<CoreRatingItemRating[]>} Promise resolved with the list of ratings.
     */
    getItemRatings(contextLevel: string, instanceId: number, component: string, ratingArea: string, itemId: number,
            scaleId: number, sort: string = 'timemodified', courseId?: number, siteId?: string, ignoreCache: boolean = false):
            Promise<CoreRatingItemRating[]> {
        return this.sitesProvider.getSite(siteId).then((site) => {
            const params = {
                contextlevel: contextLevel,
                instanceid: instanceId,
                component: component,
                ratingarea: ratingArea,
                itemid: itemId,
                scaleid: scaleId,
                sort: sort
            };
            const preSets: CoreSiteWSPreSets = {
                cacheKey: this.getItemRatingsCacheKey(contextLevel, instanceId, component, ratingArea, itemId, scaleId, sort)
            };
            if (ignoreCache) {
                preSets.getFromCache = false;
                preSets.emergencyCache = false;
            }

            return site.read('core_rating_get_item_ratings', params, preSets).then((response) => {
                if (!response || !response.ratings) {
                    return Promise.reject(null);
                }

                // We need to fetch profiles because the returned profile pictures are incorrect.
                const promises = response.ratings.map((rating: CoreRatingItemRating) => {
                    return this.userProvider.getProfile(rating.userid, courseId, true, site.id).then((user) => {
                        rating.userpictureurl = user.profileimageurl;
                    }).catch(() => {
                        // Ignore error.
                        rating.userpictureurl = null;
                    });
                });

                return Promise.all(promises).then(() => {
                    return response.ratings;
                });
            });
        });
    }

    /**
     * Invalidate item ratings.
     *
     * @param {string} contextLevel Context level: course, module, user, etc.
     * @param {number} instanceId Context instance id.
     * @param {string} component Component. Example: "mod_forum".
     * @param {string} ratingArea Rating area. Example: "post".
     * @param {number} itemId Item id. Example: forum post id.
     * @param {number} scaleId Scale id.
     * @param {string} [sort="timemodified"] Sort field.
     * @param {string} [siteId] Site ID. If not defined, current site.
     * @return {Promise<any>} Promise resolved when the data is invalidated.
     */
    invalidateRatingItems(contextLevel: string, instanceId: number, component: string, ratingArea: string,
            itemId: number, scaleId: number, sort: string = 'timemodified', siteId?: string): Promise<any> {
        return this.sitesProvider.getSite(siteId).then((site) => {
            const key = this.getItemRatingsCacheKey(contextLevel, instanceId, component, ratingArea, itemId, scaleId, sort);

            return site.invalidateWsCacheForKey(key);
        });
    }

    /**
     * Prefetch individual ratings.
     *
     * This function should be called from the prefetch handler of activities with ratings.
     *
     * @param {string} contextLevel Context level: course, module, user, etc.
     * @param {number} instanceId Instance id.
     * @param {string} [siteId] Site id. If not defined, current site.
     * @param {number} [courseId] Course id. Used for prefetching user profiles.
     * @param {CoreRatingInfo} [ratingInfo] Rating info returned by web services.
     * @return {Promise<any>} Promise resolved when done.
     */
    prefetchRatings(contextLevel: string, instanceId: number, scaleId: number, courseId?: number, ratingInfo?: CoreRatingInfo,
            siteId?: string): Promise<any> {
        if (!ratingInfo || !ratingInfo.ratings) {
            return Promise.resolve();
        }

        return this.sitesProvider.getSite(siteId).then((site) => {
            const promises = ratingInfo.ratings.map((item) => {
                return this.getItemRatings(contextLevel, instanceId, ratingInfo.component, ratingInfo.ratingarea, item.itemid,
                        scaleId, undefined, courseId, site.id, true).then((ratings) => {
                    const userIds = ratings.map((rating: CoreRatingItemRating) => rating.userid);

                    return this.userProvider.prefetchProfiles(userIds, courseId, site.id);
                });
            });

            return Promise.all(promises);
        });
    }

    /**
     * Get cache key for rating items WS calls.
     *
     * @param {string} contextLevel Context level: course, module, user, etc.
     * @param {string} component Component. Example: "mod_forum".
     * @param {string} ratingArea Rating area. Example: "post".
     * @param {number} itemId Item id. Example: forum post id.
     * @param {number} scaleId Scale id.
     * @param {string} sort Sort field.
     * @return {string} Cache key.
     */
    protected getItemRatingsCacheKey(contextLevel: string, instanceId: number, component: string, ratingArea: string,
            itemId: number, scaleId: number, sort: string): string {
        return `${this.ROOT_CACHE_KEY}${contextLevel}:${instanceId}:${component}:${ratingArea}:${itemId}:${scaleId}:${sort}`;
    }
}

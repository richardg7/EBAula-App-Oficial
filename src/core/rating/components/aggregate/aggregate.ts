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

import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CoreEventsProvider } from '@providers/events';
import { CoreRatingProvider, CoreRatingInfo, CoreRatingInfoItem } from '@core/rating/providers/rating';

/**
 * Component that displays the aggregation of a rating item.
 */
@Component({
    selector: 'core-rating-aggregate',
    templateUrl: 'core-rating-aggregate.html'
})
export class CoreRatingAggregateComponent implements OnChanges {
    @Input() ratingInfo: CoreRatingInfo;
    @Input() contextLevel: string;
    @Input() instanceId: number;
    @Input() itemId: number;
    @Input() aggregateMethod: number;
    @Input() scaleId: number;
    @Input() courseId?: number;

    protected labelKey: string;
    protected showCount: boolean;
    protected item: CoreRatingInfoItem;
    protected aggregateObserver;

    constructor(private eventsProvider: CoreEventsProvider, private modalCtrl: ModalController) {}

    /**
     * Detect changes on input properties.
     */
    ngOnChanges(changes: {[name: string]: SimpleChange}): void {
        this.aggregateObserver && this.aggregateObserver.off();

        this.item = (this.ratingInfo.ratings || []).find((rating) => rating.itemid == this.itemId);
        if (!this.item) {
            return;
        }

        if (this.aggregateMethod == CoreRatingProvider.AGGREGATE_AVERAGE) {
            this.labelKey = 'core.rating.aggregateavg';
        } else if (this.aggregateMethod == CoreRatingProvider.AGGREGATE_COUNT) {
            this.labelKey = 'core.rating.aggregatecount';
        } else if (this.aggregateMethod == CoreRatingProvider.AGGREGATE_MAXIMUM) {
            this.labelKey = 'core.rating.aggregatemax';
        } else if (this.aggregateMethod == CoreRatingProvider.AGGREGATE_MINIMUM) {
            this.labelKey = 'core.rating.aggregatemin';
        } else if (this.aggregateMethod == CoreRatingProvider.AGGREGATE_SUM) {
            this.labelKey = 'core.rating.aggregatesum';
        } else {
            this.labelKey = '';

            return;
        }

        this.showCount = (this.aggregateMethod != CoreRatingProvider.AGGREGATE_COUNT);

        // Update aggrgate when the user adds or edits a rating.
        this.aggregateObserver = this.eventsProvider.on(CoreRatingProvider.AGGREGATE_CHANGED_EVENT, (data) => {
            if (data.contextLevel == this.contextLevel &&
                    data.instanceId == this.instanceId &&
                    data.component == this.ratingInfo.component &&
                    data.ratingArea == this.ratingInfo.ratingarea &&
                    data.itemId == this.itemId) {
                this.item.aggregatestr = data.aggregate;
                this.item.count = data.count;
            }
        });
    }

    /**
     * Open the individual ratings page.
     */
    openRatings(): void {
        if (!this.ratingInfo.canviewall || !this.item.count) {
            return;
        }

        const params = {
            contextLevel: this.contextLevel,
            instanceId: this.instanceId,
            ratingComponent: this.ratingInfo.component,
            ratingArea: this.ratingInfo.ratingarea,
            itemId: this.itemId,
            scaleId: this.scaleId,
            courseId: this.courseId
        };
        const modal = this.modalCtrl.create('CoreRatingRatingsPage', params);
        modal.present();
    }

    /**
     * Component being destroyed.
     */
    ngOnDestroy(): void {
        this.aggregateObserver && this.aggregateObserver.off();
    }
}

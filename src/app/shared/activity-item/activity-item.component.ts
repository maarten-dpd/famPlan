import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../datatypes/activity';
import {ActivityService} from '../../services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent  implements OnInit {

  @Input() activity: Activity | undefined;
  constructor(public activityService: ActivityService, public activatedRoute: ActivatedRoute,
  public router:Router) { }

  ngOnInit() {}

}

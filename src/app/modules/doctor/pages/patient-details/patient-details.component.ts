import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {

  name = "John Smith"

  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    const heroId = this.route.snapshot.paramMap.get('id');
    console.log(heroId)
  }
}

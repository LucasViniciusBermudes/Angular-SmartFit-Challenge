import { Component, Input, OnInit } from '@angular/core';
import { GetUnitsService } from '../../services/get-units.service';
import { appLocation } from '../../types/location.interface';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{
  @Input() unitsList: appLocation[] = [];

  constructor () { }

  ngOnInit(): void {
    console.log(this.unitsList);
  }
}

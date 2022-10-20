import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news: string = "Bootcamp starts on march 10 2022. Be inform and inform your friends!";
  value: string= '';

  constructor() { }

  ngOnInit(): void {
  }

}

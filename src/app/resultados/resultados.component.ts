import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  //VARIABLE GLOBALES DEL COMPONENTE
  @Input() total: number = 0;
  @Input() visible: boolean = false;
  @Input() text: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(e: MouseEvent): void {
    // Process checkout data here\
    e.preventDefault();
    window.location.reload();
  }
}

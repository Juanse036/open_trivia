import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ServicesComponent } from './services/services.component';
import { FormsModule } from '@angular/forms';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [AppComponent, PreguntasComponent, ServicesComponent, ResultadosComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

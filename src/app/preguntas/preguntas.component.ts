import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preguntas, Respuestas } from '../preguntas.modelo';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent implements OnInit {
  //VARIABLES GLOBALES DEL COMPONENTE
  apiUrl = 'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple';
  data: any = {};
  preguntas: Array<Preguntas> = [];
  selects: Array<any> = [];
  count: number = 0;
  visible: boolean = false;
  text: string = '';

  //CONSTRUCTOR INICIAL
  constructor(private http: HttpClient) {}

  //FUNCION PARA OBTENER LOS DATOS Y ASIGNARLOS A LA VARIABLE this.data
  private async getData() {
    const data = await this.http.get(this.apiUrl).toPromise();
    this.data = data;
    //console.log('Data: ' + JSON.stringify(data));
  }

  //FORMATEAR TEXTOS
  private convert(str: string) {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&aacute;/g, 'á');
    str = str.replace(/&Aacute;/g, 'Á');
    str = str.replace(/&eacute;/g, 'é');
    str = str.replace(/&Eacute;/g, 'É');
    str = str.replace(/&iacute;/g, 'í');
    str = str.replace(/&Iacute;/g, 'Í');
    str = str.replace(/&ntilde;/g, 'ñ');
    str = str.replace(/&Ntilde;/g, 'Ñ');
    str = str.replace(/&oacute;/g, 'ó');
    str = str.replace(/&Oacute;/g, 'Ó');
    str = str.replace(/&uacute;/g, 'ú');
    str = str.replace(/&Uacute;/g, 'Ú');
    str = str.replace(/&uuml;/g, 'ü');
    str = str.replace(/&Uuml;/g, 'Ü');
    str = str.replace(/&iquest;/g, '¿');
    str = str.replace(/&iexcl;/g, '¡');
    str = str.replace(/&shy;/g, '-');
    return str;
  }
  //FORMATEAR LAS PREGUNTAS CON LO NECESARIO
  private AsignarPreguntas = (): void => {
    for (let i = 0; i < this.data.results.length; i++) {
      let respuestasTemp: Array<string> = [];
      respuestasTemp.push(this.data.results[i].correct_answer);
      respuestasTemp.push(this.data.results[i].incorrect_answers[0]);
      respuestasTemp.push(this.data.results[i].incorrect_answers[1]);
      respuestasTemp.push(this.data.results[i].incorrect_answers[2]);

      //FUNCION DESORDENAR LAS OPCIONES
      const respuestasrandom: Array<string> = respuestasTemp.sort(() => {
        return Math.random() - 0.5;
      });

      //ARREGLO PARA GRAFICAR
      const PreguntaTemp: Preguntas = {
        question: this.convert(this.data.results[i].question),
        answer1: this.convert(respuestasrandom[0]),
        answer2: this.convert(respuestasrandom[1]),
        answer3: this.convert(respuestasrandom[2]),
        answer4: this.convert(respuestasrandom[3]),
      };
      this.preguntas.push(PreguntaTemp);
    }
  };

  //FUNCION QUE SE EJECUTA AL CARGAR EL COMPONENTE
  async ngOnInit() {
    await this.getData();
    this.AsignarPreguntas();
  }

  //ANALIZAR CORRECTAS
  private AnalizarCorrectas = () => {
    this.count = 0;

    for (let i = 0; i < this.data.results.length; i++) {
      console.log(
        'Correct Answer',
        this.data.results[i].correct_answer,
        'Selected Answer',
        this.selects[i]
      );
      this.data.results[i].correct_answer === this.selects[i]
        ? (this.count += 1)
        : (this.count = this.count);
    }

    /* this.selects.length < 5
      ? (this.text = 'PLEASE ANSWER ALL QUESTIONS')
      : (this.text = `YOU HAD ${this.count} RIGHT ANSWERS`);*/

    this.text = `YOU HAD ${this.count} RIGHT ANSWERS`;

    this.visible = true;
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  //FUNCION QUE SE EJECUTA AL LLENAR TODAS LAS RESPUESTAS DE LA TRIVIA
  onSubmit(e: MouseEvent): void {
    // Process checkout data here\
    e.preventDefault();
    //console.log(this.selects);
    this.AnalizarCorrectas();
    //window.alert('Submit');
  }
}

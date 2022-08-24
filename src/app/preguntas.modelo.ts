export interface PreguntasFetch {
  response_code: number;
  results: [
    {
      category: string;
      correct_answer: string;
      difficulty: string;
      question: string;
      type: string;
      incorrect_answer: [
        {
          0: string;
          1: string;
          2: string;
        }
      ];
    }
  ];
}

export interface Respuestas {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export interface Preguntas extends Respuestas {
  question: string;
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
/*   addTextQuestions: string = "texto" */
  valorOption: false
  addTextOptions = {
    texto: true,
    audio: true,
    imagen: true
  }

  options = [
    { type: "text", content: "", correct: true },
    { type: "imagen", url: "", correct: true },
    { type: "audio", url: "", correct: true },
  ]
  @Output() responseData = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    /* this.responseData.emit(this.question) */
  }
/*   addInputQuestions(value) {
    this.addTextQuestions = value
  } */
  addOptions(value) {
    this.options.push({ type: value,content:"",correct:true });
    this.responseData.emit(this.options) 
  }
  removeOptions(index) {
    this.options.splice(index, 1);
  }
}

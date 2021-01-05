import { TranslateLabelService } from '../../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { EvaluacionesService } from '../../../../services/administrador/examenes/evaluaciones.service'
import { sectionsDTO } from '../../../modelos/administrador/dashboard/examenes/evaluaciones.model'
@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {
  localeLang: string = 'es';
  /* evaluacionesDTO: sectionsDTO = new sectionsDTO()
 */

  sectionInstructions = [
    { type: "text", content: "" },
    { type: "imagen", url: "" },
    { type: "audio", url: "" },
  ]
 /*  options = [] */
  questions = [{
    type: "",
    score: "",
    content: "",
    options: []
  }]
  sections = [{
    name: "grammar",
    title: " title",
    order: 1,
    part: 1,
    time: 20.0,
    sectionInstructions: this.sectionInstructions,
    questions: this.questions
  }]
  evaluacionesDTO = {
    courseId: 1,
    name: "Clasification Exam",
    indication: "test indication",
    passScore: 60.0,
    module: 1,
    sections: this.sections
  }
  constructor(
    private evaluacionesService: EvaluacionesService,
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
  ) {

  }

  ngOnInit() {
    this.translate.setDefaultLang(this.localeLang);
    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
    });
  }
  addSectionQuestion(value) {
    this.questions.push({ type: value, score: "", content: "", options: [] });
  }
  addTextQuestions: string = "texto"
  addInputQuestions(value) {
    this.addTextQuestions = value
  }
  removeSectionQuestion(index) {
    // this.sections.questions.splice(index, 1);
  }
  addIncations(value) {
    /* this.sectionInstructions.push({ type: value }); */
    this.sectionInstructions = this.sectionInstructions
  }
  /*  addOptions(value){
     this.questions.options.push({ type: value });
   } */
  removeIndications(index) {
    //this.sections.sectionInstructions.splice(index, 1);
  }
  /*   removeOptions(index){
      this.questions.options.splice(index, 1);
    } */
  getQuestions(questionsq) {
  this.questions.forEach(element => {
    element.options.push(questionsq)
  });

    /*  this.question.options.push({options:questions.options}) */
  }
  saveData() {
    /*     this.evaluacionesDTO.sections.push(this.sections) */
    /*  this.sections.questions = this.question */

  }



}

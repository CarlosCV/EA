import { TranslateLabelService } from '../../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { EvaluacionesService } from '../../../../services/administrador/examenes/evaluaciones.service'
/* import { evaluacionesDTO } from '../../../modelos/administrador/dashboard/examenes/evaluaciones.model' */
@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {
  localeLang: string = 'es';
  /*   evaluacionesDTO: evaluacionesDTO = new evaluacionesDTO()
   */

  sectionInstructions = []
  questions = []
  sections = {
    name: "reading",
    title: " title",
    order: 1,
    part: 1,
    time: 20.0,
    sectionInstructions: this.sectionInstructions,
    questions: this.questions
  }
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
    this.translate.use(this.localeLang);
    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
    });
  }

  addTextQuestions: string = "texto"
  addInputQuestions(value) {
    this.addTextQuestions = value
  }
  addSectionQuestion(value) {
    this.questions.push({ type: value, score: "", content: "", options: [] });
  }
  removeSectionQuestion(index) {
    this.questions.splice(index, 1);
  }
  addIncations(value) {
    this.sectionInstructions.push({ type: value, content: "" });
  }
  removeIndications(index) {
    this.sections.sectionInstructions.splice(index, 1);
  }
  addOptions(id, value) {
    if(value ==="text")
    this.questions[id].options.push({ type: value, content: "", correct: true })
    if(value ==="imagen")
    this.questions[id].options.push({ type: value, url: "", correct: true })
    if(value ==="audio")
    this.questions[id].options.push({ type: value, url: "", correct: true })
  }
  removeOptions(id,index) {
    this.questions[id].options.splice(index, 1);
  }
 /*  getQuestions(questionsq) {
    this.questions.forEach(element => {
      element.options.push(questionsq)
    });
  } */
  saveData() {
    console.log(this.evaluacionesDTO)
    this.evaluacionesService.createExamen(this.evaluacionesDTO).subscribe(data=>{
      console.log(data)
    })

  }



}

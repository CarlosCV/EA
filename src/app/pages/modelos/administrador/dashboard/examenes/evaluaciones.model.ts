export class optionsDTO {
    type: string
    content: string
    correct: boolean
}
export class sectionInstructionsDTO {
    type: string
    content: string
}
export class questionsDTO {

    type: string
    score: number
    content: string
    options: optionsDTO
}
export class sectionsDTO {

    name: string
    title: string
    order: number
    part: number
    time: number
    sectionInstructions: sectionInstructionsDTO[]
    questions: questionsDTO
    constructor(){
        this.name = null;
        this.title = null;
        this.order = null;
        this.time = null;
        this.sectionInstructions = null;
        this.questions = null;

   }
}
export class evaluacionesDTO {

    courseId: number
    name: string
    indication: string
    passScore: number
    module: number
    sections: sectionsDTO
    
}



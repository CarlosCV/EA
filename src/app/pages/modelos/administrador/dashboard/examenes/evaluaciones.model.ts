export class evaluacionesDTO {

    courseId: number
    name: string
    indication: string
    passScore: number
    module: number
    sections: sectionsDTO[]
}

export class sectionsDTO {

    name: string
    title: string
    order: number
    part: number
    time: number
    sectionInstructions: sectionInstructionsDTO[]
    questions: questionsDTO[]
}

export class questionsDTO {

    type: string
    score: number
    content: string
    options: optionsDTO[]
}
export class sectionInstructionsDTO {
    type: string
    content: string
}
export class optionsDTO {
    type: string
    content: string
    correct: boolean
}


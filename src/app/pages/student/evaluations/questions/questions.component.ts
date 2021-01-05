import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  countDownTimer: any
  cronometro: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.startCronometro()
  }
  SendQuestions() {
    this.router.navigate(['/evaluacion/resultado']);
  }
  startCronometro() {
    clearInterval(this.countDownTimer);
    const fiveMinutes = 60 * 20;
    const display = document.querySelector('#time');
    this.startTimer(fiveMinutes, display);
  }
  startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    this.countDownTimer = setInterval(() => {
      minutes = timer / 60, 10;
      seconds = timer % 60, 10;
      minutes = parseInt(minutes)
      seconds = parseInt(seconds)
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if (minutes == '00' && seconds == '00') {
        alert("tiempo terminado")
      }
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }





}

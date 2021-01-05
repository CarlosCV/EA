import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
  add,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import RRule from 'rrule';
import * as moment from 'moment-timezone';
import { ViewPeriod } from 'calendar-utils';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
moment.tz.setDefault('Utc');
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  localeLang: string = 'en';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  view: CalendarView;
  classPackage = {
    startDate: new Date("December 01, 2020 09:00:00"),
    endDate: new Date("January  20, 2021 23:00:00")
  }
  CalendarView = CalendarView;
  /*  viewDate: Date = new Date(); */
  //FOR TEACHER EVENTOS RECUERRENTES
  viewDate = moment().toDate();

  viewPeriod: ViewPeriod;
 /*  calendarEvents: CalendarEvent[] = []; */
  recurringEvents: RecurringEvent[] = [];
  //end TEACHER EVENTOS RECUERRENTES
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  @Output() responseData = new EventEmitter<any>();
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() viewButtons: string = 'true';
  @Input() CalendarVista: string;
  @Input() getScheduleList: any;
  constructor(
    private modal: NgbModal,
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang(this.localeLang);
  }


  ngOnInit() {
    if(this.getScheduleList){
      this.getScheduleList.forEach(element => {
        let start =  moment(element.start);
        let end =  moment(element.end);
        let horas = end.diff(start, 'minutes')
        let json = {
          start: start.toDate(),
          end: end.toDate(),
          hourBetween: horas,
          rrule: {
            freq: RRule.WEEKLY,
          },
        }
        this.recurringEvents.push(json)
     
      })
    }
    if (this.CalendarVista == "Month") {
      this.view = CalendarView.Month;
    } else if (this.CalendarVista == "Week") {
      this.view = CalendarView.Week;
    }

    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
    });
  }


  setView(view: CalendarView) {
    this.view = view;
  }
  //evento para llevar al día seleccionado
  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Week;
  }
  //evento para seleccionar un horario
  clickedDate: Date;
  addHourClass() {
    /* if (new Date(this.clickedDate) >= this.classPackage.startDate && new Date(this.clickedDate) <= this.classPackage.endDate) {
    } else {
      alert("no puedes escoger esta fecha")
    }
 */
    const json = {
      start: new Date(this.clickedDate),
      end: addHours(this.clickedDate, 1),
      title: '',
      color: colors.blue,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    }
    this.events.push(json)
    this.addEvent();
    this.responseData.emit(this.events)
 
  }

  addEvent(): void {
    this.events = [
      ...this.events,
    ];
  }
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  //ACA SE FORMA EL ARRAY PARA PINTAR EL CALENDARIO
  events: CalendarEvent[] = [];

  //cambiar de hora con el drag or resized
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.addEvent();
    this.responseData.emit(this.events)
  }

  handleEvent(action: string, event: CalendarEvent): void {
    /*  this.modalData = { event, action };
     this.modal.open(this.modalContent, { size: 'lg' }); */
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  //DATEPICKER TIME

  /* 
    singleDate: Date = new Date();
  
    onChangeSingle(value: Date) {
      this.singleDate = value;
    } */
  //
  //FOR TEACHER EVENTOS RECUERRENTES
  updateCalendarEvents(
    viewRender: | CalendarWeekViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];
      this.recurringEvents.forEach((event) => {
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: event.start,
          until: addDays(moment(viewRender.period.end).endOf('day').toDate(), -1),
        });
        rule.all().forEach((date) => {
          this.events.push({
            title: '',
            color: colors.blue,
            start: moment(date).toDate(),
            end: addMinutes(moment(date).toDate(), event.hourBetween),
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            }
          });
        });
      });
      this.cdr.detectChanges();
    }
  }
}

interface RecurringEvent {
  start: any;
  end: any;
  hourBetween:number
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}

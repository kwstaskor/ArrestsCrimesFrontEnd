import { Component, OnInit } from '@angular/core';
import { Victim } from './victim';
import { VictimsService } from './victims.service';

declare const jQuery: any
declare const ApexCharts: any

@Component({
  selector: 'app-victims',
  templateUrl: './victims.component.html',
  styleUrls: ['./victims.component.css']
})

export class VictimsComponent implements OnInit {

  Victims!: Victim[];
  VictimsByHouseHoldIncome!: Victim[]
  FilteredVictims!: Victim[];

  //User Input Year
  year!: number;

  //Victims number per year Properties
  currentYearVictims!: number;
  SixteenPlus!:number;

  //Victims number per gender Properties
  totalMale2018!: number;
  totalFemale2018!: number;

  //Chart Properties
  ageChart: any;
  genderChart: any;
  ethnicityChart: any;

  //Ethnicity Properties
  Asian!: number;
  Bangladeshi!: number
  Black !: number
  Chinese !: number
  Indian !: number
  Mixed !: number
  Pakistani !: number
  White !: number
  AnyOther!: number

  //pagination property
  p: number = 1;

  //Searching property
  age: any;

  constructor(private victimsService: VictimsService) { }

  ngOnInit(): void {
    this.ReadVictims();
  }

  ReadVictims() {

    if (this.year == null) {
      this.year = 2016;
    }

    this.victimsService.getAllVictims(this.year).subscribe((data) => {
      this.Victims = data;
      this.FindVictimsNumberPerYear();
      this.FindVictimsNumberPerSex();
      this.FindVictimsNumberPerLocation();
      this.SetFilteredVictims();
      setTimeout(() => {
        this.slider();
      }, 25);

    });

  }


  FindVictimsNumberPerYear() {

    this.SixteenPlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '16+'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let sixteenTwentyFour = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '16-24'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let TwentyFivePlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '25-34'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let ThirtyFivePlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '35-44'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let FourtyFivePlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '45-54'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let FiftyFivePlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '55-64'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let SixtyFivePlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '65-74'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    let SeventyFivePlus = this.Victims.filter(x => x.gender == 'All' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '75+'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];

    let arr: number[] = [];
    arr.push(this.SixteenPlus);
    arr.push(sixteenTwentyFour);
    arr.push(TwentyFivePlus);
    arr.push(ThirtyFivePlus);
    arr.push(FourtyFivePlus);
    arr.push(FiftyFivePlus);
    arr.push(SixtyFivePlus);
    arr.push(SeventyFivePlus);

    this.currentYearVictims = this.SixteenPlus + sixteenTwentyFour + TwentyFivePlus + ThirtyFivePlus + FourtyFivePlus + FiftyFivePlus + SixtyFivePlus + SeventyFivePlus;

     this.InitAgeChart(arr);
    //this.InitEthnicityChart(this.Arrests.filter(x => x.gender == 'All' && x.geography == 'All' && x.ageGroup == 'All'));

  }

  FindVictimsNumberPerSex() {
    this.totalMale2018 = this.Victims.filter(x => x.gender == 'Male' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '16+'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];
    this.totalFemale2018 = this.Victims.filter(x => x.gender == 'Female' && x.ethnicity == 'All' && x.timeType == 'Year ending March' && x.age == '16+'
      && x.socioEconomicClassification == 'All' && x.householdIncome == 'All').map(y => y.value)[0];

    this.InitGenderChart();

  }

  FindVictimsNumberPerLocation() {
    this.VictimsByHouseHoldIncome = this.Victims.filter(x => x.timeType == 'Year ending March' && x.householdIncome != 'All');
    this.VictimsByHouseHoldIncome = this.VictimsByHouseHoldIncome.sort((a, b) => { if (a.value < 0) { return -1; } if (b.value < 0) { return 1; } return b.value - a.value });
  }

  SetFilteredVictims() {
    this.FilteredVictims = this.Victims.filter(x => x.value != null && x.timeType == 'Year ending March');
  }

  //-------SLIDER---------

  slider() {

    if (jQuery('.topRated').hasClass('slick-initialized')) {
      jQuery('.topRated').slick('destroy');
    }

    jQuery(".topRated").not('.slick-initialized').slick({
      slidesToShow: 4,
      speed: 300,
      slidesToScroll: 1,
      focusOnSelect: true,
      appendArrows: jQuery('#topRated-item-slick-arrow'),
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 798,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: false,
          autoplay: true,
          slidesToShow: 1
        }
      }, {

        breakpoint: 300,
        settings: "unslick"
      }],
    });

  }

  //-------CHARTS---------

  //First Chart

  InitAgeChart(data: number[]) {
    this.firstChart(data);
  }

  firstChart(series: any) {
    if (jQuery('#view-chart-01').length) {
      var options = {
        series: series,
        chart: {
          width: 300,
          type: 'donut',
        },
        colors: ['#e20e02', '#f68a04', '#007aff', '#545e75','#000000','#a2a4af','#14e788','#ca139c'],
        labels: ["16+", "16-24", "25-34", "35-44", "45-54","55-64","65-74","75+"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 0
        },
        legend: {
          show: false,
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      this.ageChart = new ApexCharts(document.querySelector("#view-chart-01"), options);
      this.ageChart.render();
    }
  }

  //Second Chart

  InitGenderChart() {
    let arr: number[] = [];
    arr.push(this.totalMale2018);
    arr.push(this.totalFemale2018);

    this.secondChart(arr);
  }

  secondChart(series: any) {

    if (jQuery('#view-chart-02').length) {
      var options = {
        series: series,
        chart: {
          width: 350,
          type: 'donut',
        },
        colors: ['#007aff', '#ca139c'],
        labels: ['Male', 'Female'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 0
        },
        legend: {
          show: false,
          formatter: function (val: any, opts: any) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      this.genderChart = new ApexCharts(document.querySelector("#view-chart-02"), options);
      this.genderChart.render();
    }

  }

  //-------HELPERS---------

  key: any;
  reverse: boolean = false;
  sort(key: any) {

    this.key = key;
    this.reverse = !this.reverse;

  }

  Search() {

    if (this.age) {
      this.FilteredVictims = this.FilteredVictims.filter(x =>
        x.age.toUpperCase().includes(this.age.toUpperCase())
      );
    } else {
      this.FilteredVictims = this.Victims.filter(x => x.value != null && x.timeType == 'Year ending March');
    }
  }

}

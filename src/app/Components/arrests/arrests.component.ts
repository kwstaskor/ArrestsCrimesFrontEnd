import { Component, OnInit, Inject } from '@angular/core';
import { Arrest } from './arrest';
import { ArrestsService } from './arrests.service';

declare const jQuery: any
declare const ApexCharts: any

@Component({
  selector: 'app-arrests',
  templateUrl: './arrests.component.html',
  styleUrls: ['./arrests.component.css']
})
export class ArrestsComponent implements OnInit {

  Arrests!: Arrest[];
  FilteredArrests!: Arrest[];
  totalArrests: number = 4951624;
  arrestsByArea2018!: Arrest[];

  //User Input Year
  year!: number;

  //Arests number per year Properties
  currentYearArrests!: number;

  //Arests number per gender Properties
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
  geography: any;

  constructor(private arrestsService: ArrestsService) { }

  ngOnInit(): void {
    this.ReadArrests();
  }

  //-------DATA READING---------

  ReadArrests() {

    if (this.year == null) {
      this.year = 2018;
    }

    this.arrestsService.getAllArrests(this.year).subscribe((data) => {
      this.Arrests = data;
      this.FindArrestsNumberPerYear();
      this.FindArrestsNumberPerSex();
      this.FindArrestsNumberPerLocation();
      this.SetFilteredArrests();
      setTimeout(() => {
        this.slider();
      }, 25);

    });

  }

  //-------DATA MANIPULATION---------

  FindArrestsNumberPerYear() {

    this.currentYearArrests = this.Arrests.filter(x => x.gender == 'All' && x.geography == 'All' && x.ethnicity == 'All' && x.ageGroup == 'All').map(y => y.numberOfArrests)[0];

    this.InitAgeChart(this.Arrests.filter(x => x.gender == 'All' && x.geography == 'All' && x.ethnicity == 'All'));
    this.InitEthnicityChart(this.Arrests.filter(x => x.gender == 'All' && x.geography == 'All' && x.ageGroup == 'All'));
  }

  FindArrestsNumberPerSex() {
    this.totalMale2018 = this.Arrests.filter(x => x.gender == 'Male' && x.geography == 'All' && x.ethnicity == 'All' && x.ageGroup == 'All').map(y => y.numberOfArrests)[0];
    this.totalFemale2018 = this.Arrests.filter(x => x.gender == 'Female' && x.geography == 'All' && x.ethnicity == 'All' && x.ageGroup == 'All').map(y => y.numberOfArrests)[0];
    this.InitGenderChart();

  }

  FindArrestsNumberPerLocation() {
    this.arrestsByArea2018 = this.Arrests.filter(x => (x.gender == 'Male' || x.gender == 'Female') && x.geography != 'All' && x.ethnicity == 'All' && x.ageGroup == 'All');
    this.arrestsByArea2018 = this.arrestsByArea2018.sort((a, b) => { if (a.numberOfArrests < 0) { return -1; } if (b.numberOfArrests < 0) { return 1; } return b.numberOfArrests - a.numberOfArrests });
  }

  SetFilteredArrests() {
    this.FilteredArrests = this.Arrests.filter(x => x.gender != 'All' && x.ageGroup != 'All' && x.ageGroup != 'Unknown' && x.geography != 'All' && x.ethnicity != 'All' && x.numberOfArrests != null);
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
  
  InitAgeChart(data: Arrest[]) {

    let tenToSeventeen = data.filter(x => x.ageGroup == '10 - 17 years').map(y => y.numberOfArrests)[0];
    let eighteenToTwenty = data.filter(x => x.ageGroup == '18 - 20 years').map(y => y.numberOfArrests)[0];
    let OverTwentyOne = data.filter(x => x.ageGroup == '21 years and over').map(y => y.numberOfArrests)[0];
    let UnderTen = data.filter(x => x.ageGroup == 'Under 10 years').map(y => y.numberOfArrests)[0];

    let arr: number[] = [];
    arr.push(Math.round((tenToSeventeen / this.currentYearArrests) * 100));
    arr.push(Math.round((eighteenToTwenty / this.currentYearArrests) * 100));
    arr.push(Math.round((OverTwentyOne / this.currentYearArrests) * 100));
    arr.push(Math.round((UnderTen / this.currentYearArrests) * 100));

    this.firstChart(arr);
  }

  firstChart(series: any) {
    if (jQuery('#view-chart-01').length) {
      var options = {
        series: series,
        chart: {
          width: 300,
          type: 'donut',
        },
        colors: ['#e20e02', '#f68a04', '#007aff', '#545e75'],
        labels: ["10-17", " 18-20", "21 and Over", "Under 10"],
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
    arr.push(Math.round((this.totalMale2018 / this.currentYearArrests) * 100));
    arr.push(Math.round((this.totalFemale2018 / this.currentYearArrests) * 100));

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

  //Third Chart

  InitEthnicityChart(data: Arrest[]) {
    this.Asian = data.filter(x => x.ethnicity == 'Asian').map(y => y.numberOfArrests)[0];
    this.Bangladeshi = data.filter(x => x.ethnicity == 'Bangladeshi').map(y => y.numberOfArrests)[0];
    this.Black = data.filter(x => x.ethnicity == 'Black').map(y => y.numberOfArrests)[0];
    this.Chinese = data.filter(x => x.ethnicity == 'Chinese').map(y => y.numberOfArrests)[0];
    this.Indian = data.filter(x => x.ethnicity == 'Indian').map(y => y.numberOfArrests)[0];
    let mixed = data.filter(x => x.ethnicity == 'Mixed' || x.ethnicity == 'Mixed White and Asian' || x.ethnicity == 'Mixed White and Black African' || x.ethnicity == 'Mixed White and Black Caribbean').map(y => y.numberOfArrests);
    this.Pakistani = data.filter(x => x.ethnicity == 'Pakistani').map(y => y.numberOfArrests)[0];
    let white = data.filter(x => x.ethnicity == 'White').map(y => y.numberOfArrests);
    let anyOther = data.filter(x => x.ethnicity == 'Other' || x.ethnicity == 'Any other asian' || x.ethnicity == 'Any other black background' || x.ethnicity == 'Any other ethnic group' || x.ethnicity == 'Any other mixed/multiple ethnic background'
      || x.ethnicity == 'Any other white background' || x.ethnicity == 'Unreported')
      .map(y => y.numberOfArrests);

    this.Mixed = 0;
    for (const n of mixed) {
      this.Mixed += n;
    }

    this.White = 0;
    for (const n of white) {
      this.White += n;
    }

    this.AnyOther = 0;
    for (const n of anyOther) {
      this.AnyOther += n;
    }

    let arr: number[] = [];
    arr.push(Math.round((this.Asian / this.currentYearArrests) * 100));
    arr.push(Math.round((this.Bangladeshi / this.currentYearArrests) * 100));
    arr.push(Math.round((this.Black / this.currentYearArrests) * 100));
    arr.push(Math.round((this.Chinese / this.currentYearArrests) * 100));
    arr.push(Math.round((this.Indian / this.currentYearArrests) * 100));
    arr.push(Math.round((this.Mixed / this.currentYearArrests) * 100));
    arr.push(Math.round((this.Pakistani / this.currentYearArrests) * 100));
    arr.push(Math.round((this.White / this.currentYearArrests) * 100));
    arr.push(Math.round((this.AnyOther / this.currentYearArrests) * 100));
    this.thirdChart(arr, this.currentYearArrests);
  }

  thirdChart(series: any, total: number) {

    if (jQuery('#view-chart-03').length) {

      var options = {
        chart: {
          height: 420,
          type: 'radialBar',
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 3,
            dashArray: 0,
          },
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 10,
              size: '30%',
              background: 'transparent',
              image: undefined,
              imageWidth: 64,
              imageHeight: 64,
            },
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function () {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return total
                }
              }
            }
          }
        },
        fill: {
          type: 'gradient',
        },
        colors: ['#ff4545', '#1ee2ac', '#ff4545'],
        series: series,
        stroke: {
          lineCap: 'round'
        },
        labels: ['Asian', 'Bangladeshi', 'Black', 'Chinese', 'Indian', 'Mixed', 'Pakistani', 'White', 'Any Other'],
      };


      this.ethnicityChart = new ApexCharts(document.querySelector("#view-chart-03"), options);
      this.ethnicityChart.render();
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

    if (this.geography) {
      this.FilteredArrests = this.FilteredArrests.filter(x =>
        x.geography.toUpperCase().includes(this.geography.toUpperCase())
      );
    } else {
      this.FilteredArrests = this.Arrests.filter(x => x.gender != 'All' && x.ageGroup != 'All' && x.ageGroup != 'Unknown' && x.geography != 'All' && x.ethnicity != 'All' && x.numberOfArrests != null);
    }
  }

}

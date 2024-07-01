import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts'

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [44, 55, 41, 17, 15],
      
      options: {
        chart: {
          width: 380,
          type: 'donut',
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                

                name: {
                  
                  show: true,
                  fontSize: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  color: undefined,
                  offsetY: 101,
                  formatter: function (val) {
                    return val
                  }
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  color: undefined,
                  offsetY: -15,
                  
                  formatter: function (val) {
                    return val
                  }
                },
                total: {
                  label: '',
                  formatter: () => '90%',
                  showAlways: true,
                  show: true,
                  // formatter: function (w) {
                  //   return w.globals.seriesTotals.reduce((a, b) => {
                  //     return a + b
                  //   }, 0)
                  // }
                }
              }
            }
          }
        },
        labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
        dataLabels: {
          enabled:false,
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        // fill: {
        //   type: 'pattern',
        //   opacity: 1,
        //   pattern: {
        //     enabled: true,
        //     style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
        //   },
        // },
        states: {
          hover: {
            filter: 'none'
          }
        },
        theme: {
          palette: 'palette2'
        },
        // title: {
        //   text: "Favourite Movie Type"
        // },
        legend:{
          show:false
        },
        // responsive: [{
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 200
        //     },
        //     legend: {
        //       position: 'bottom'
        //     }
        //   }
        // }]
      },


    };
  }




  render() {
    return (


      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={380} />
      </div>
    )
  }
}


const DemoLayout = () => {


  return (
    <div className="card flex justify-content-center">
      <ApexChart />
    </div>
  )
}
export default DemoLayout;
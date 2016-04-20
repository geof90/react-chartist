import React from 'react';
import ChartistGraph from 'react-chartist';

const chartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
    ]
}

const chartOptions = {
    width: '800px',
    height: '400px',
    stackBars: true,
    axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000) + 'k';
        }
    }
}

const listener = {
    draw: function(data) {
        if(data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 30px'
            });
        }
    }
}

export default class ChartistSample extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageConversion = this.handleImageConversion.bind(this);
  }
  handleImageConversion() {
      $('line').each((index, line) => {
          $(line).attr('stroke', $(line).css('stroke'));
          $(line).attr('stroke-width', $(line).css('stroke-width').replace('px', ''));
          $(line).attr('stroke-dasharray', $(line).css('stroke-dasharray').replace('px', ''));
      });

      var labels = $('.ct-labels');
      labels.remove();
      var chartImage = new Image();

      html2canvas($('.bar > svg'))
        .then((chartCanvas) => {
            chartCanvas.id = "chart";
            chartImage.src = chartCanvas.toDataURL("image/png");
            $('.bar > svg').append(labels);
            return html2canvas($('.bar > svg'))
        })
        .then((labelCanvas) => {
            labelCanvas.id = "labels";
            var ctx = labelCanvas.getContext("2d");
            ctx.drawImage(chartImage, 0, 0);
            var fullImage = new Image();
            fullImage.src = labelCanvas.toDataURL("image/png")
            $("#img-out").append(fullImage);
        });
  }
  render() {
    return (
        <div id="doc">
            <ChartistGraph
                className="bar"
                data={chartData}
                listener={listener}
                type={'Bar'}
                options={chartOptions} />
            <div id="img-out"></div>
            <input
                onClick={this.handleImageConversion}
                type="button"
                value="Convert"  />
        </div>
    );
  }
}
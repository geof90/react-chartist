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
    let str = new XMLSerializer().serializeToString($('.bar > svg')[0]),
        encoded = window.btoa(str);
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, 0);
    };
    image.src = "data:image/svg+xml;base64," + encoded;
    $('#doc').append(image);
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
            <canvas id="canvas"></canvas>
            <img id="converted" src='' />
            <input 
                onClick={this.handleImageConversion}
                type="button" 
                value="Convert"  />
        </div>
    );
  }
}
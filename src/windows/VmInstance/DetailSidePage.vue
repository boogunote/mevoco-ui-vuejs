<template>
  <div class="sidepage">
    <div class="header">
      {{dbData.vm[uuid].name}}
      <button @click="$emit('close')">x</button>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import VmInstanceDetail from './Detail'

export default {
  mixins: [VmInstanceDetail],
  mounted: function () {
    this.drawChart()
  },
  updated: function () {
    this.drawChart()
  },
  data () {
    return {
      className: 'VmInstanceDetailSidePage'
    }
  },
  methods: {
    drawChart: () => {
      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 50}
      var width = 960 - margin.left - margin.right
      var height = 500 - margin.top - margin.bottom

      // parse the date / time
      var parseTime = d3.timeParse('%d-%b-%y')

      // set the ranges
      var x = d3.scaleTime().range([0, width])
      var y = d3.scaleLinear().range([height, 0])

      // define the line
      var valueline = d3.line()
          .x(function (d) { return x(d.date) })
          .y(function (d) { return y(d.close) })

      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select('.sidepage .content').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')')

      // Get the data
      d3.csv('http://127.0.0.1:9000/data.csv', function (error, data) {
        if (error) throw error

        // format the data
        data.forEach(function (d) {
          d.date = parseTime(d.date)
          d.close = +d.close
        })

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) { return d.date }))
        y.domain([0, d3.max(data, function (d) { return d.close })])

        // Add the valueline path.
        svg.append('path')
            .data([data])
            .style('fill', 'none')
            .style('stroke', 'steelblue')
            .style('stroke-width', '2px')
            .attr('d', valueline)

        // Add the X Axis
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))

        // Add the Y Axis
        svg.append('g')
            .call(d3.axisLeft(y))
      })
    }
  }
}
</script>

<style scoped>
.sidepage {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 50%;
  height: calc(100% - 60px);
  background-color: #fff;
  overflow: hidden;
  z-index: 10;
  box-shadow: -5px 0 0 rgba(0,0,0,.07);
}
.header {
  width: 100%;
  height: 150px;
  color: #fff;
  background-color: #354052;
}
.content {
  width: 100%;
  min-height: 150px;
  overflow: auto;
}
</style>
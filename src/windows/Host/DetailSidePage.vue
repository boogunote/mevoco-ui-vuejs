<template>
  <div class="sidepage">
    <div class="header">
      {{dbData.host[uuid].name}}
      <button @click="$emit('close')">x</button>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import Detail from './Detail'

export default {
  mixins: [Detail],
  mounted: function () {
    this.queryCpuData()
    this.drawChart()
  },
  updated: function () {
    this.drawChart()
  },
  data () {
    return {
      className: 'HostDetailSidePage'
    }
  },
  methods: {
    drawChart: function () {
      if (!this.windowData.cpuData) return
      d3.select('.sidepage .content svg').remove()
      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 50}
      var width = d3.select('.sidepage .content').node().getBoundingClientRect().width - margin.left - margin.right
      var height = 500 - margin.top - margin.bottom

      // parse the date / time
      // var parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S')

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
      let data = _.cloneDeep(this.windowData.cpuData)
      // format the data
      data.forEach(function (d) {
        d.date = new Date(d[0] * 1000)
        d.close = parseFloat(d[1])
        // d.close = +d.close
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
    }
  }
}
</script>

<style scoped>
</style>
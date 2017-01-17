<script>
import WindowBase from 'src/windows/Base/Window'
import rpc from 'src/utils/rpc'
import { hostCpuQueryExpression } from 'src/utils/utils'

export default {
  mixins: [WindowBase],
  props: [
    'uuid'
  ],
  data: function () {
    return {
      queryCpuDataTimerId: null
    }
  },
  created: function () {
    this.queryCpuDataTimerId = setInterval(() => {
      this.queryCpuData()
    }, 2000)
  },
  destroyed: function () {
    this.clearTimer()
  },
  methods: {
    queryCpuData: async function () {
      let resp = await rpc.call('org.zstack.prometheus.APIPrometheusQueryPassThroughMsg', {
        expression: hostCpuQueryExpression('0', 'user', this.uuid),
        relativeTime: '15m',
        step: 9
      })
      this.updateWindow({ cpuData: resp.inventories.data.result[0].values })
      this.drawChart()
    },
    clearTimer: function () {
      clearInterval(this.queryCpuDataTimerId)
    }
  }
}
</script>
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: three plans, stacked annual premium ---
  var plansEl = document.getElementById('chart-plans');
  if (plansEl) {
    var plans = echarts.init(plansEl, null, { renderer: 'svg' });
    plans.setOption({
      animation: false,
      color: [muted, accent + '99', accent, accent2],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: bg2,
        borderColor: rule,
        textStyle: { color: ink, fontSize: 12 },
        formatter: function (params) {
          var total = 0;
          var lines = params.map(function (p) {
            total += p.value;
            return p.marker + ' ' + p.seriesName + '：' + p.value + ' 元';
          });
          lines.push('<strong>合计：' + total + ' 元/年</strong>');
          return '<div style="font-weight:700;margin-bottom:4px">' + params[0].axisValue + '</div>' + lines.join('<br>');
        }
      },
      legend: {
        bottom: 0,
        icon: 'roundRect',
        itemWidth: 9,
        itemHeight: 9,
        textStyle: { color: muted, fontSize: 11 }
      },
      grid: { left: 92, right: 24, top: 18, bottom: 48 },
      xAxis: {
        type: 'value',
        axisLabel: { color: muted, fontSize: 11, formatter: '{value}' },
        splitLine: { lineStyle: { color: rule } },
        axisLine: { show: false }
      },
      yAxis: {
        type: 'category',
        data: ['方案 A 基础版', '方案 B 进阶版', '方案 C 全面版'],
        axisLabel: { color: ink, fontSize: 12, fontWeight: 600 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [
        {
          name: '少儿医保',
          type: 'bar',
          stack: 'total',
          barWidth: 26,
          data: [400, 400, 400],
          itemStyle: { borderRadius: [0, 0, 0, 0] }
        },
        {
          name: '医疗险',
          type: 'bar',
          stack: 'total',
          data: [409, 409, 409]
        },
        {
          name: '重疾险',
          type: 'bar',
          stack: 'total',
          data: [690, 3145, 4267],
          label: {
            show: true,
            position: 'inside',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 700,
            formatter: function (p) { return p.value >= 500 ? p.value : ''; }
          }
        },
        {
          name: '意外险',
          type: 'bar',
          stack: 'total',
          data: [78, 128, 192],
          itemStyle: { borderRadius: [0, 6, 6, 0] }
        }
      ]
    });
    window.addEventListener('resize', function () { plans.resize(); });
  }

  // --- Chart: term comparison for critical illness products ---
  var termEl = document.getElementById('chart-term');
  if (termEl) {
    var term = echarts.init(termEl, null, { renderer: 'svg' });
    term.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        appendToBody: true,
        backgroundColor: bg2,
        borderColor: rule,
        textStyle: { color: ink, fontSize: 12 },
        valueFormatter: function (v) { return v + ' 元/年'; }
      },
      legend: {
        top: 0,
        right: 0,
        icon: 'roundRect',
        itemWidth: 9,
        itemHeight: 9,
        textStyle: { color: muted, fontSize: 11 }
      },
      grid: { left: 64, right: 20, top: 40, bottom: 28 },
      xAxis: {
        type: 'category',
        data: ['大黄蜂 17 号', '青云卫 6 号'],
        axisLabel: { color: ink, fontSize: 12, fontWeight: 600 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '元/年',
        nameTextStyle: { color: muted, fontSize: 11, padding: [0, 0, 0, -20] },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule } },
        axisLine: { show: false }
      },
      series: [
        {
          name: '保 30 年',
          type: 'bar',
          barWidth: 34,
          data: [690, 870],
          itemStyle: { color: accent2, borderRadius: [6, 6, 0, 0] },
          label: {
            show: true,
            position: 'top',
            color: accent2,
            fontSize: 11,
            fontWeight: 700,
            formatter: '{c}'
          }
        },
        {
          name: '保终身',
          type: 'bar',
          barWidth: 34,
          data: [3145, 3510],
          itemStyle: { color: accent, borderRadius: [6, 6, 0, 0] },
          label: {
            show: true,
            position: 'top',
            color: accent,
            fontSize: 11,
            fontWeight: 700,
            formatter: '{c}'
          }
        }
      ]
    });
    window.addEventListener('resize', function () { term.resize(); });
  }
})();

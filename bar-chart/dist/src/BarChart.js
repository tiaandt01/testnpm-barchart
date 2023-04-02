import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
export class BarChart extends LitElement {
    constructor() {
        super(...arguments);
        this.test = "";
        this.data = [];
    }
    renderChart() {
        let root = am5.Root.new("chartdiv");
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });
        xRenderer.grid.template.setAll({
            location: 1
        });
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));
        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));
        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            var _a;
            return (_a = chart.get("colors")) === null || _a === void 0 ? void 0 : _a.getIndex(series.columns.indexOf(target));
        });
        series.columns.template.adapters.add("stroke", function (stroke, target) {
            var _a;
            return (_a = chart.get("colors")) === null || _a === void 0 ? void 0 : _a.getIndex(series.columns.indexOf(target));
        });
        xAxis.data.setAll(this.data);
        series.data.setAll(this.data);
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    }
    firstUpdated() {
        this.renderChart();
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
    <div id="chartdiv" style="width:100%;height: 250px;"> </div>
   
   
    `;
    }
}
BarChart.styles = css `
    :host {
     
      color: var(--bar-chart-text-color, #000);
      height: 500px;
      width: 100%;
    }
  `;
__decorate([
    property({ type: String })
], BarChart.prototype, "test", void 0);
__decorate([
    property({ type: Array })
], BarChart.prototype, "data", void 0);
//# sourceMappingURL=BarChart.js.map
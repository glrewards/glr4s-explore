import {Chart} from "react-google-charts";
import React, {Component} from "react";
import {connect} from "react-redux";

class XODStudentSummaryCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chartPointsBySubject = this.chartPointsBySubject.bind(this);
  }

  chartPointsBySubject() {
    //need to map and reduce to get values
    if (!this.props.achievements) {
      return;
    }
    let data = this.props.achievements.map(item => {
      //this contains a rootAchievement and studentAchievements  we could have multiple entries for the
      //same root

      //we want to return the subject (from root) and the total points ( sum of the array of points inside
      //studentAchievements
        return {
          subject: item.rootAchievement.Subject,
          points: item.studentAchievements.Points
      };
    });

    if (data.length === 0) {
      return;
    }
    let initialValue = [];
    let reduced = data.reduce((acc, value) => {
      //check to see if we have  sub array that starts with the value subject. this means we need to loop through
      //the array

      let found = false;
      for (let i = 0; i < acc.length; i++) {
        console.log(acc[i]);
        if (acc[i][0] === value.subject) {
          console.log("hit", value.points);
          acc[i][1] += Number(value.points);
          found = true;
        }
      }
      if (!found) {
        //add new array
        acc.push([value.subject, Number(value.points)]);
        this.found = true;
      }
      return acc;
    }, initialValue);

    console.log(reduced);
    let headers = [["subject", "points"]];
    let chartData = headers.concat(reduced);
    console.log(chartData);

    return (
      <Chart
        width={600}
        height={300}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
            data={chartData}
        options={{
          title: "Points By Subject",
          chartArea: { width: "30%" },
          hAxis: {
            title: "subject",
            minValue: 0
          },
          vAxis: {
            title: "points"
          }
        }}
        legendToggle
      />
    );
  }

  render() {
    console.log(this.props.achievements);
    return (
      <div>
        <div style={{ display: "flex", maxWidth: 900 }}>
          {this.chartPointsBySubject()}
          <Chart
            width={300}
            height={"300px"}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Year", "Sales", "Expenses"],
              ["2013", 1000, 400],
              ["2014", 1170, 460],
              ["2015", 660, 1120],
              ["2016", 1030, 540]
            ]}
            options={{
              title: "Company Performance",
              hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: "50%", height: "70%" }
              // lineWidth: 25
            }}
          />
          <Chart
            width={300}
            height={300}
            chartType="Scatter"
            loader={<div>Loading Chart</div>}
            data={[
              ["Hours Studied", "Final"],
              [0, 67],
              [1, 88],
              [2, 77],
              [3, 93],
              [4, 85],
              [5, 91],
              [6, 71],
              [7, 78],
              [8, 93],
              [9, 80],
              [10, 82],
              [0, 75],
              [5, 80],
              [3, 90],
              [1, 72],
              [5, 75],
              [6, 68],
              [7, 98],
              [3, 82],
              [9, 94],
              [2, 79],
              [2, 95],
              [2, 86],
              [3, 67],
              [4, 60],
              [2, 80],
              [6, 92],
              [2, 81],
              [8, 79],
              [9, 83],
              [3, 75],
              [1, 80],
              [3, 71]
            ]}
            options={{
              // Material design options
              chart: {
                title: "Students' Final Grades",
                subtitle: "based on hours studied"
              },
              hAxis: { title: "Hours Studied" },
              vAxis: { title: "Grade" }
            }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Chart
            width={300}
            height={"300px"}
            chartType="BubbleChart"
            loader={<div>Loading Chart</div>}
            data={[
              [
                "ID",
                "Life Expectancy",
                "Fertility Rate",
                "Region",
                "Population"
              ],
              ["CAN", 80.66, 1.67, "North America", 33739900],
              ["DEU", 79.84, 1.36, "Europe", 81902307],
              ["DNK", 78.6, 1.84, "Europe", 5523095],
              ["EGY", 72.73, 2.78, "Middle East", 79716203],
              ["GBR", 80.05, 2, "Europe", 61801570],
              ["IRN", 72.49, 1.7, "Middle East", 73137148],
              ["IRQ", 68.09, 4.77, "Middle East", 31090763],
              ["ISR", 81.55, 2.96, "Middle East", 7485600],
              ["RUS", 68.6, 1.54, "Europe", 141850000],
              ["USA", 78.09, 2.05, "North America", 307007000]
            ]}
            options={{
              title:
                "Correlation between life expectancy, fertility rate " +
                "and population of some world countries (2010)",
              hAxis: { title: "Life Expectancy" },
              vAxis: { title: "Fertility Rate" },
              bubble: { textStyle: { fontSize: 11 } }
            }}
          />
          <Chart
            width={300}
            height={300}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: "number", label: "x" },
                { type: "number", label: "values" },
                { id: "i0", type: "number", role: "interval" },
                { id: "i1", type: "number", role: "interval" },
                { id: "i2", type: "number", role: "interval" },
                { id: "i2", type: "number", role: "interval" },
                { id: "i2", type: "number", role: "interval" },
                { id: "i2", type: "number", role: "interval" }
              ],
              [1, 100, 90, 110, 85, 96, 104, 120],
              [2, 120, 95, 130, 90, 113, 124, 140],
              [3, 130, 105, 140, 100, 117, 133, 139],
              [4, 90, 85, 95, 85, 88, 92, 95],
              [5, 70, 74, 63, 67, 69, 70, 72],
              [6, 30, 39, 22, 21, 28, 34, 40],
              [7, 80, 77, 83, 70, 77, 85, 90],
              [8, 100, 90, 110, 85, 95, 102, 110]
            ]}
            options={{
              intervals: { style: "sticks" },
              legend: "none"
            }}
          />
          <Chart
            width={300}
            height={300}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={[
              [
                "Day",
                "Guardians of the Galaxy",
                "The Avengers",
                "Transformers: Age of Extinction"
              ],
              [1, 37.8, 80.8, 41.8],
              [2, 30.9, 69.5, 32.4],
              [3, 25.4, 57, 25.7],
              [4, 11.7, 18.8, 10.5],
              [5, 11.9, 17.6, 10.4],
              [6, 8.8, 13.6, 7.7],
              [7, 7.6, 12.3, 9.6],
              [8, 12.3, 29.2, 10.6],
              [9, 16.9, 42.9, 14.8],
              [10, 12.8, 30.9, 11.6],
              [11, 5.3, 7.9, 4.7],
              [12, 6.6, 8.4, 5.2],
              [13, 4.8, 6.3, 3.6],
              [14, 4.2, 6.2, 3.4]
            ]}
            options={{
              chart: {
                title: "Box Office Earnings in First Two Weeks of Opening",
                subtitle: "in millions of dollars (USD)"
              }
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    student: state.xodSingleStudent,
    auth: state.auth,
    school: state.schoolId,
    achievements: state.xodAchievements
  };
}
export default connect(mapStateToProps)(XODStudentSummaryCharts);

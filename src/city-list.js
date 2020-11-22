import moment from "moment";
import React from "react";
import ReactDataGrid from "react-data-grid";
  
const ColorFormatter = ({ value }) => {
    return <div  style={{ backgroundColor: value, padding: "10px" }}/>;
};
  
const columns = [
    {
        key: "Id",
        name: "Id",
        sortDescendingFirst: true,
        width:52,
        sortable: true,
      },
    {
      key: "City",
      name: "City",
      width:125,
      sortable: true,
      sortDescendingFirst: true,
    },
    {
      key: "Start_date",
      name: "Start Date",
      width:100,
      sortable: true,
      sortDescendingFirst: true,
    },
    {
      key: "End_date",
      name: "End Date",
      width:100,
      sortable: true,
      sortDescendingFirst: true,
    },
    {
      key: "Price",
      name: "Price",
      width:100,
      sortable: true,
      sortDescendingFirst: true,
    },
    {
      key: "Status",
      name: "Status",
      width:100,
      sortable: true,
      sortDescendingFirst: true,
    },
    {
      key: "Color",
      name: "Color",
      formatter: ColorFormatter,
      width:100
    }];

const EmptyRowsView = () => {
    const message = "No data to show";
    return (
      <div
        style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}
      >
        <h3>{message}</h3>
      </div>
    );
  };

  const RowRenderer = ({ renderBaseRow, ...props }) => {
      const row = props.row;
    const color ="gray";
    let Start_date = moment(row.Start_date).format("DD/MM/YYYY");
    let End_date = moment(row.End_date).format("DD/MM/YYYY");
    let newProps = {...props,
    row: {
        ...props.row,
        Start_date,
        End_date
    }}
    return <div style={{ color }}>{renderBaseRow(newProps)}</div>;
  };

export default class CityList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          data: [],
          inputStart: "01/01/2013",
          inputFinish: "01/01/2013"
        }
        this.handleEvent = this.handleEvent.bind(this);
    this.inputRef = React.createRef();
      }

      componentDidMount() {
        const apiUrl = 'http://localhost:3300/api/cities/';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              if(data.length >0){
                this.setState({data: data});
              }
          });
      }

      handleChangeS = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ inputStart: event.target.value });
      };

      handleChangeF = event => {
        this.setState({ inputFinish: event.target.value });
      };
    
      handleEvent(event, picker) {
        console.log(event);
        this.setState({
          inputStart: picker.startDate.format("DD/MM/YYYY"),
          inputFinish: picker.endDate.format("DD/MM/YYYY")
        });
      }

      render() {
        const rows = this.state.data ? this.state.data :[];

        return (
        <div>
        <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={rows.length}
            minHeight={500}
            minWidth={700}
            onGridSort={(sortColumn, sortDirection) =>{
                const comparer = (a, b) => {
                    if (sortDirection === "ASC") {
                      return a[sortColumn] > b[sortColumn] ? 1 : -1;
                    } else if (sortDirection === "DESC") {
                      return a[sortColumn] < b[sortColumn] ? 1 : -1;
                    }
                  };
                  var data = sortDirection === "NONE" ? rows : [...rows].sort(comparer);
                if(sortDirection !== "NONE"){
                this.setState({data: data})
                }
            }}
            rowRenderer={RowRenderer}
            emptyRowsView={EmptyRowsView}
            />
                  </div>
        );
      }
   }
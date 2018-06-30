import React, { Component } from 'react';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";

const CheckboxTable = checkboxHOC(ReactTable);


export default class ProjectTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      columns: [{
        Header: "Project Number",
        accessor: "project"
      }, {
        Header: "Customer",
        accessor: 'customer'
      }
      ],
      selection: []
    }
  }

  toggleSelection = (key, shift, row) => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);

    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1),
      ];
    } else {
      selection.push(key);
    }
    this.setState({selection});
  }

  isSelected = key => this.state.selection.includes(key);

  logSelection = () => console.log("selection: " + this.state.selection);
  
  componentDidMount() {
    /*
      To render: 

      TODO: 
        map data into array of objects with correct accessor keys
    */
    if(this.props.data) {
      const data = [{project: "me", customer: "Potate"}];
      console.log(this.props.data)
      this.setState({data})
    }
  }  

  render() {
    const {toggleSelection, isSelected, logSelection} = this;
    const {data,columns} = this.state;
    const checkboxProps = {
      isSelected,
      toggleSelection,
      selectType: "checkbox",
      getTrProps: (s,r) => {
        // const selected = this.isSelected(r.original._id);
        const selected = null;
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit"
          }
        }
      }
    }

    return (
      <div>
        <CheckboxTable
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={columns}
          defaultPageSize={5}
          classname="-stripe -highlight"
          {...checkboxProps}
        />
      </div>
    )
  }
}
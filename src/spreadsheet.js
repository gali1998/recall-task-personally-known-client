import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import React, { Component } from 'react';
import './Cell.css';
import { getGrid, extendGrid } from './gridGenerator'

class Spreadsheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidUpdate = async (prevProps) => {
        console.log(this.props.id)
        if (prevProps.id !== this.props.id) {
            console.log(this.props)
            let grid = await getGrid(this.props.id);

            this.setState({ grid: grid })
        }
    }

    sendData = () => {
        this.props.getData(this.state.grid);
    }
    render() {

        while (this.props.id == "") {
            return null;
        }


        if (this.props.show == false) {
            if (this.props.ended == true && this.props.didGetTable == false) {
                this.sendData()
            }
            return null;
        }

        return (
            <ReactDataSheet
                className="cell-style"
                data={this.state.grid}
                valueRenderer={cell => cell.value}

                onCellsChanged={changes => {
                    let grid = this.state.grid.map(row => [...row]);
                    changes.forEach(({ cell, row, col, value }) => {
                        if (value.length > 1) {
                            grid[row][col] = { ...grid[row][col], value, dateOfChange: new Date(), readOnly: true };
                            console.log(grid[row][col])
                            if (row == this.state.grid.length - 1) {
                                grid = extendGrid(grid);
                            }
                        }
                    });
                    this.setState({ grid });
                }}
            />
        );
    }
}
export default Spreadsheet;
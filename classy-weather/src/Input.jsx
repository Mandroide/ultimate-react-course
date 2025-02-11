import React from "react";

export default class Input extends React.Component {

    render() {
        return (
            <div>
                <input type="text" placeholder="Search from location..."
                       value={this.props.location}
                       onChange={e => this.props.onLocationChange(e.target.value)}/>
            </div>
        );
    }
}
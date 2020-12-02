import React from 'react'
import Redemption from './Redemption'

export default class RedemptionList extends React.Component {
	renderRedemption(redemption, index) {
		return (
			<Redemption 
				title={redemption.title} 
				id={index} 
				handleRemove={(index) => this.props.remove(index)} 
				timer={redemption.timer}
			/>
		) 
	}

	handleAdd() {
		const nameInput = document.getElementById('redemption_name');
    	const timerInput = document.getElementById('redemption_timer');
    	this.props.add(nameInput.value, timerInput.value);
    	nameInput.value = '';
    	timerInput.value = 0;
	}

	renderRedemptions() {
		return this.props.redemptions.map(
			(redem, index) => (
				<li key={index}>{this.renderRedemption(redem, index)}</li>
			)
		);
	}

	render() {
		return (
			<div className="bg-white flex flex-col px-2 py-2">
				<div>
		          <label htmlFor="redemption_name">Name:</label>
		          <input 
		            id="redemption_name"
		            type="text" 
		            defaultValue=""
		            placeholder="Name of redemption" />
		            <br />
		          <label htmlFor="redemption_timer">Timer:</label>
		          <input 
		            id="redemption_timer"
		            type="number" 
		            defaultValue="0"
		            placeholder="Number of minutes" />
		            <br />
		          <button onClick={() => this.handleAdd()}>Add redemption</button>
		        </div>
				<ol>{this.renderRedemptions()}</ol>
			</div>
		)
	}
}
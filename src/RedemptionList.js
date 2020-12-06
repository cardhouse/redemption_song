import React from 'react'
import Redemption from './Redemption'
import { redemptions } from './data/redemptions'

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
		const selected = redemptions.find(e => e.slug === nameInput.value);

		if (Object.keys(selected).length === 0) {
			console.log("There is no redemption configured called " + nameInput.value);
		} else {
			this.props.add(selected.title, selected.timer);
		}
	}

	renderRedemptions() {
		return this.props.redemptions.map(
			(redem, index) => (
				<li key={index}>{this.renderRedemption(redem, index)}</li>
			)
		);
	}

	renderRedemptionSelection() {
		return redemptions.map(redemption => {
			return (
				<option
					key={redemption.slug}
					value={redemption.slug}
				>
					{redemption.title}
				</option>
			);
		});
	}

	render() {
		return (
			<div className="bg-white flex flex-col px-2 py-29 w-64">
				<div>
					<label htmlFor="redemption_name">Name:</label>
					<select id="redemption_name">
						{this.renderRedemptionSelection()}
					</select>
					<br />
					<button onClick={() => this.handleAdd()}>Add redemption</button>
				</div>
				<ol>{this.renderRedemptions()}</ol>
			</div>
		)
	}
}
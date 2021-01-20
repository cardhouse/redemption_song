import React from 'react'
import Redemption from './Redemption'
import { redemptions } from './data/redemptions'

export default class RedemptionList extends React.Component {
	renderRedemption(redemption, index) {
		return (
			<Redemption
				title={redemption.title}
				redeemer={redemption.redeemer}
				cost={redemption.cost}
				id={redemption.id}
				handleRemove={(id) => this.props.remove(id)}
				timer={redemption.timer}
			/>
		)
	}

	renderRedemptions() {
		return this.props.redemptions.map(
			(redem, index) => (
				<li id="{redem.id}" key={index}>{this.renderRedemption(redem, index)}</li>
			)
		);
	}

	render() {
		return (
			<div className="flex flex-col px-2 py-29 w-64">
				<ul>
					{this.renderRedemptions()}
				</ul>
			</div>
		)
	}
}
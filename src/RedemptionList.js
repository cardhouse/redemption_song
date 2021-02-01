import React from 'react'
import Redemption from './Redemption'

export default class RedemptionList extends React.Component {
	renderRedemption(redemption, index) {
		console.log(redemption);
		return (
			<Redemption
				title={redemption.title}
				redeemer={redemption.redeemer}
				cost={redemption.cost}
				id={redemption.id}
				handleRemove={(id) => this.props.remove(id)}
				timer={redemption.timer}
				message={redemption.message}
				image={redemption.image}
				visible={redemption.visible}
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
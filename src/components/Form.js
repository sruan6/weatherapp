import React from "react";

const Form = props => (
	<form>
			<input type="text" id="City" name="city" placeholder="City" />
			<input type="text" id="Country" name="country" placeholder="Country" />
				<button onClick={props.handleClick}>Get Weather</button>
		</form>
);

export default Form;
import { Redirect, Route } from "react-router-dom";

const InnerRoute = ({ component: Component, perm, ...props }) => {
	return <Route {...props} render={(elemprops) => (1 === true ? 2 : 1)} />;
};

export default InnerRoute;

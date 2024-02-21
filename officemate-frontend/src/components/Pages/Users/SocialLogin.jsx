import { Button } from "antd";
import googleIcon from "../../../assets/images/google.png";
import { cn } from "../../../services/utils";

function SocialLogin() {
//const SocialLogin = () => {
	return <div></div>;
};

// eslint-disable-next-line react/prop-types
const Google = ({ title, className, ...rest }) => {
	// signin and signup with google button
	return (
		<Button
			{...rest}
			className={cn(
				"flex items-center justify-between gap-3 py-5 rounded-none text-[#434343] border-0 bg-white",
				className
			)}
			style={{ boxShadow: "rgb(0, 0, 0) -0.7px 0.7px 2px 0px" }}
		>
			<img className='w-5' src={googleIcon} alt='' />
			<span>{title}</span>
		</Button>
	);
};

SocialLogin.Google = Google;

export default SocialLogin;
import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "./imgs/nicePic.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "./Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

export default function Sidebar() {
	const [selected, setSelected] = useState(0);
	const [expanded, setExpaned] = useState(true)

	const sidebarVariants = {
		true: {
			left: '0'
		},
		false: {
			left: '-60%'
		}
	}
	
	return (
		<>
			<div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
				<UilBars />
			</div>
			<motion.div className='sidebar'
				variants={sidebarVariants}
				animate={window.innerWidth <= 768 ? `${expanded}` : ''}
			>
				<div className="logo">
					<img src={Logo} alt="logo" />
					<span>
						S<span>U</span>S
					</span>
				</div>
				<div className="menu">
					{SidebarData.map((item, index) => {
						return (
							<div
								className={selected === index ? "menuItem active" : "menuItem"}
								key={index}
								onClick={() => setSelected(index)}
							>
								<item.icon />
								<span>{item.heading}</span>
							</div>
						);
					})}

				{/*		Sign out botton			<div className="menuItem">
						<UilSignOutAlt onClick={=}/>
					</div>*/}
				</div>
			</motion.div>
		</>
	);
};

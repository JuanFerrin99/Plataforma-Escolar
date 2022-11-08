import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/nicePic.png";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
//import { UilSignOutAlt } from "@iconscout/react-unicons";

export default function Sidebar({indexChanger, index}) {
	const [expanded, setExpaned] = useState(true)

	const sidebarVariants = {
		true: {left: '0'},
		false: {left: '-60%'}
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
					<img src={ Logo}alt="logo" />
					<span>
						I<span>S</span>E
					</span>
				</div>
				<div className="menu">
					{SidebarData.map((item, i) => {
						return (
							<div
								className={index === i ? "menuItem active" : "menuItem"}
								key={i}
								onClick={() => {indexChanger(i)}}
							>
								<item.icon />
								<span>{item.heading}</span>
							</div>
						);
					})}
					{/* 	Sign out botton
					<div className="menuItem">
						<UilSignOutAlt onClick={=}/>
					</div>
					*/}
				</div>
			</motion.div>
		</>
	);
};

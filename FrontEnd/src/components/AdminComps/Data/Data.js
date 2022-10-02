// Sidebar imports
import {
    UilCell,
    UilClipboardAlt,
    UilUsersAlt,
    UilPresentation,
    UilChart,
    UilSignOutAlt,
    UilCircuit,
    UilBook,
    UilNotes,
    UilBackpack

} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
    {
        icon: UilCell,
        heading: "Carreras",
    },
    {
        icon: UilBook,
        heading: "Materias",
    },
    {
        icon: UilUsersAlt,
        heading: "Secretarios",
    },
    {
        icon: UilPresentation,
        heading: "Profesores"
    },
    {
        icon: UilBackpack,
        heading: 'Alumnos'
    },
    {
        icon: UilNotes,
        heading: 'Finales'
    },
    {
        icon: UilChart,
        heading: 'Cursos'
    },
    {
        icon: UilChart,
        heading: 'Comprobar inscripciones'
    },
        
];

// Analytics Cards Data
export const cardsData = [
    {
        title: "Comprobar inscripciones",
        color: {
            backGround: "linear-gradient(200deg, #FFB000 40%, #FFA00D 60%)",
            boxShadow: "0px 10px 20px 0px #FFB000",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Gestion finales",
        color: {
            backGround: "linear-gradient(200deg, #57BEAB 10%, #159C88 90%)",
            boxShadow: "0px 10px 20px 0px #57BEAB",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },  
        ],
    },
    {
        title: "Gestion cursos",
        color: {
            backGround:
                "linear-gradient(200deg, #00B1D2 10%, #0084BD 90%)",
            boxShadow: "0px 10px 20px 0px #00B1D2",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

// Analytics Cards Data
export const cardsData2 = [
    {
        title: "Comprobar inscripciones",
        color: {
            backGround: "linear-gradient(200deg, #FFB000 40%, #FFA00D 60%)",
            boxShadow: "0px 10px 20px 0px #FFB000",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Gestion finales",
        color: {
            backGround: "linear-gradient(200deg, #57BEAB 10%, #159C88 90%)",
            boxShadow: "0px 10px 20px 0px #57BEAB",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },  
        ],
    },
    {
        title: "Gestion cursos",
        color: {
            backGround:
                "linear-gradient(200deg, #00B1D2 10%, #0084BD 90%)",
            boxShadow: "0px 10px 20px 0px #00B1D2",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

// Analytics Cards Data
export const cardsData3 = [
    {
        title: "Comprobar inscripciones",
        color: {
            backGround: "linear-gradient(200deg, #FFB000 40%, #FFA00D 60%)",
            boxShadow: "0px 10px 20px 0px #FFB000",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Gestion finales",
        color: {
            backGround: "linear-gradient(200deg, #57BEAB 10%, #159C88 90%)",
            boxShadow: "0px 10px 20px 0px #57BEAB",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },  
        ],
    },
    {
        title: "Gestion cursos",
        color: {
            backGround:
                "linear-gradient(200deg, #00B1D2 10%, #0084BD 90%)",
            boxShadow: "0px 10px 20px 0px #00B1D2",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];
// Recent Update Card Data
export const UpdatesData = [
    {
        img: img1,
        name: "Andrew Thomas",
        noti: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    },
    {
        img: img2,
        name: "James Bond",
        noti: "has received Samsung gadget for charging battery.",
        time: "30 minutes ago",
    },
    {
        img: img3,
        name: "Iron Man",
        noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
        time: "2 hours ago",
    },
];

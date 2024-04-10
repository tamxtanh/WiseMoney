import heart from "../assets/icons/heart.png";
import menu from "../assets/icons/menu.png";
import search from "../assets/icons/search.png";
import filter from "../assets/icons/filter.png";
import left from "../assets/icons/left.png";
import heartOutline from "../assets/icons/heart-ol.png";
import share from "../assets/icons/share.png";
import location from "../assets/icons/location.png";
import chevronLeft from "../assets/icons/chevron-left.png";
import chevronRight from "../assets/icons/chevron-right.png";

import { SvgXml } from "react-native-svg";

const profile = ({ fill }) => {
  const svgXml = `
  <svg width="30" height="29.5" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.625 8.82875C20.625 12.8225 18.2125 16.25 15 16.25C11.785 16.25 9.375 12.8225 9.375 8.8275C9.375 4.835 11.45 2.5 15 2.5C18.55 2.5 20.625 4.83375 20.625 8.82875ZM5.1275 25.1775C5.60875 25.75 7.68125 27.5 15 27.5C22.3188 27.5 24.39 25.75 24.8725 25.1787C24.9173 25.1238 24.9503 25.0604 24.9697 24.9922C24.989 24.9241 24.9942 24.8527 24.985 24.7825C24.875 23.68 23.8825 18.75 15 18.75C6.1175 18.75 5.125 23.68 5.01375 24.7825C5.0047 24.8528 5.01012 24.9242 5.02968 24.9924C5.04924 25.0605 5.08253 25.1227 5.1275 25.1775Z" fill="${fill}"/>
</svg>

  `;

  return <SvgXml xml={svgXml} />;
};

const house = ({ fill }) => {
  const svgXml = `
  <svg width="30" height="28.5" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2326 1.51331C14.684 1.16223 15.316 1.16223 15.7674 1.51331L27.0174 10.2633C27.3219 10.5001 27.5 10.8643 27.5 11.25V25.625C27.5 26.6605 26.6605 27.5 25.625 27.5H18.75V17.5C18.75 16.8096 18.1904 16.25 17.5 16.25H12.5C11.8096 16.25 11.25 16.8096 11.25 17.5V27.5H4.375C3.33946 27.5 2.5 26.6605 2.5 25.625V11.25C2.5 10.8643 2.67809 10.5001 2.98257 10.2633L14.2326 1.51331Z" fill="${fill}"/>
</svg>
  `;

  return <SvgXml xml={svgXml} />;
};

const wallet = ({ fill }) => {
  const svgXml = `
  <svg width="31" height="29.5" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.75 3.75H5.5C4.83696 3.75 4.20107 4.01339 3.73223 4.48223C3.26339 4.95107 3 5.58696 3 6.25V23.75C3 24.413 3.26339 25.0489 3.73223 25.5178C4.20107 25.9866 4.83696 26.25 5.5 26.25H25.5C26.163 26.25 26.7989 25.9866 27.2678 25.5178C27.7366 25.0489 28 24.413 28 23.75V10C28 9.66848 27.8683 9.35054 27.6339 9.11612C27.3995 8.8817 27.0815 8.75 26.75 8.75H6.75C6.41848 8.75 6.10054 8.6183 5.86612 8.38388C5.6317 8.14946 5.5 7.83152 5.5 7.5C5.5 7.16848 5.6317 6.85054 5.86612 6.61612C6.10054 6.3817 6.41848 6.25 6.75 6.25H28V5C28 4.66848 27.8683 4.35054 27.6339 4.11612C27.3995 3.8817 27.0815 3.75 26.75 3.75ZM23.625 15.625C23.9958 15.625 24.3583 15.735 24.6667 15.941C24.975 16.147 25.2154 16.4399 25.3573 16.7825C25.4992 17.1251 25.5363 17.5021 25.464 17.8658C25.3916 18.2295 25.213 18.5636 24.9508 18.8258C24.6886 19.088 24.3545 19.2666 23.9908 19.339C23.6271 19.4113 23.2501 19.3742 22.9075 19.2323C22.5649 19.0904 22.272 18.85 22.066 18.5417C21.86 18.2334 21.75 17.8708 21.75 17.5C21.75 17.0027 21.9475 16.5258 22.2992 16.1742C22.6508 15.8225 23.1277 15.625 23.625 15.625Z" fill="${fill}"/>
</svg>
  `;

  return <SvgXml xml={svgXml} />;
};

const chart = ({ fill }) => {
  const svgXml = `
  <svg width="31" height="30.7" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_225_744" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="30">
  <rect x="0.5" width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_225_744)">
  <path d="M19.0313 13.75C18.8438 13.2083 18.5573 12.7344 18.1719 12.3281C17.7865 11.9219 17.3229 11.625 16.7812 11.4375V2.5625C19.7604 2.85417 22.2969 4.04687 24.3906 6.14062C26.4844 8.23438 27.6771 10.7708 27.9688 13.75H19.0313ZM14.2812 27.4375C11.0729 27.125 8.39583 25.7813 6.25 23.4063C4.10417 21.0313 3.03125 18.2292 3.03125 15C3.03125 11.7708 4.10417 8.96875 6.25 6.59375C8.39583 4.21875 11.0729 2.875 14.2812 2.5625V11.4375C13.5312 11.7083 12.9271 12.1719 12.4688 12.8281C12.0104 13.4844 11.7812 14.2083 11.7812 15C11.7812 15.7917 12.0104 16.5052 12.4688 17.1406C12.9271 17.776 13.5312 18.2292 14.2812 18.5V27.4375ZM16.7812 27.4375V18.5C17.3229 18.3125 17.7865 18.026 18.1719 17.6406C18.5573 17.2552 18.8438 16.7917 19.0313 16.25H27.9688C27.6771 19.2292 26.4844 21.7656 24.3906 23.8594C22.2969 25.9531 19.7604 27.1458 16.7812 27.4375Z" fill="${fill}"/>
  </g>
  </svg>

  `;

  return <SvgXml xml={svgXml} />;
};

const category = ({ fill }) => {
  const svgXml = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_249_550" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
  <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_249_550)">
  <path d="M3.29999 19.2V17.7H4.79999V19.2H3.29999ZM7.79999 19.2V17.7H20.7V19.2H7.79999ZM3.29999 13.25V11.75H4.79999V13.25H3.29999ZM7.79999 13.25V11.75H20.7V13.25H7.79999ZM3.29999 7.29999V5.79999H4.79999V7.29999H3.29999ZM7.79999 7.29999V5.79999H20.7V7.29999H7.79999Z" fill="${fill}"/>
  </g>
  </svg>
    `;

  return <SvgXml xml={svgXml} />;
};

export default {
  heart,
  menu,
  search,
  filter,
  left,
  heartOutline,
  share,
  location,
  chevronLeft,
  chevronRight,
  profile,
  house,
  wallet,
  chart,
  category,
};

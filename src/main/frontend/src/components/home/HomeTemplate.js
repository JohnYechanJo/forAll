import {Link} from "react-router-dom";
import {useState} from "react";
import "../../components/Styles.css";
const HomeTemplate = () => {
    return (
        <div style={{fontSize:"1.875rem",fontWeight:"700" }}>
            <p style={{marginTop:"1.813rem",marginBottom:"0px"}} >요리를 위한 대관</p>
            <p style={{marginTop:"1.25rem"}} >포올과 함께하세요</p>
            <p style={{marginTop:"2rem", fontSize:"1.25rem"}} >We make culture.</p>
        </div>
    )
};

export default HomeTemplate;
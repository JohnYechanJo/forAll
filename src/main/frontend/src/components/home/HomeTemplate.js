import {Link} from "react-router-dom";
import {useState} from "react";
import "../../components/Styles.css";
const HomeTemplate = () => {
    return (
        <div style={{fontSize:"1.875rem",fontWeight:"700",marginTop:"3.125rem",boxShadow: '-4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px -4px 4px 0px rgba(0, 0, 0, 0.25) inset',
        display:"flex", flexDirection:"column"
    }}>
            <p>
                <a style={{marginLeft:"1rem",marginTop:"1.37rem", marginBottom:"1.37rem"}}>요리를 위한 대관</a>
                <br/>
                <a style={{marginTop:"0px",marginLeft:"1rem" }} >포올과 함께하세요</a>
                <br/>
                <br/>
                <a style={{marginTop:"2rem", fontSize:"1.25rem",marginLeft:"1rem",marginBottom:"1.37rem"}} >We make culture.</a>
            </p>
        </div>
    )
};

export default HomeTemplate;
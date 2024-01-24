import React from 'react';
import { useNavigate } from 'react-router-dom';
const ForAllLogo = () => {
    const navigate = useNavigate();
    return (
        <div style={{ position: 'absolute', left: '1rem', top: '1rem', width: '5rem', height: '1.25rem', backgroundColor: 'white' }}>
            <a style={{fontFamily:'Mukta',fontSize:'0.75rem',fontWeight:'700',letterSpacing:'-0.01031rem',border:'2px solid black'}} 
            onClick={()=> navigate('/')}
            >For ALL.</a>
        </div>
    );
};

export default ForAllLogo;
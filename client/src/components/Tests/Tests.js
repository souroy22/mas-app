import React,{useState} from 'react';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { handle } from '../../utils/helpers';
import api from '../../redux/api';

const Tests = () =>{
   

    return(
        <div  style={{width: '100%', zIndex: 1, position: 'relative'}}>
            <p>Test</p>
        </div>
    )
}

export default Tests;
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
    const { id: orderId } = useParams();

    useEffect(()=> {
        const fetchData = () => {

        }
        fetchData();
    }, [orderId])
}
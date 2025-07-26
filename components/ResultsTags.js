"use client";
import { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';
import axios from 'axios';

export default function ResultsTags() {
    const resultsTags = ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"];

    return(
        <div className="w-[100%] flex justify-center">
            {resultsTags.map((item, index) => {
             return <span className='width-[20px] px-[20px] bg-gray-200 mx-[5px] rounded' key={index}>{item}</span>;
            })}
        </div>
    )
}
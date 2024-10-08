"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import React from 'react'
import { flattenBy } from "@tanstack/react-table"

interface OverviewProps {
    data: any[],
}



export const OverView: React.FC<OverviewProps> = ({ data }) => {
    return (
        <div>
            <ResponsiveContainer width={"100%"} height={350}>
                <BarChart data={data}>
                    <XAxis
                        dataKey={"name"}
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis

                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value)=>`Rs.${value}`}
                    />
                    <Bar dataKey={"total"} fill="#3498db" radius={[4,4,0,0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}


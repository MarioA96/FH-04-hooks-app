import { useEffect, useState } from "react";


const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    blue: 'bg-blue-500 animate-pulse',
};

type TrafficLightColor = keyof typeof colors;


export const useTrafficLight = () => {

    const [light, setlight] = useState<TrafficLightColor>('red');
    const [countdown, setCountdown] = useState(5);

    // Countdown Effect
    useEffect(() => {
        // Un useEffect debe ser lo mas atomico posible, resolviendo una unica tarea
        if (countdown === 0) return;

        const intervalId = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }

    }, [countdown]);

    // Change light color Effect
    useEffect(() => {
        if (countdown > 0) return;

        setCountdown(5);

        if (light === 'red') {
            setlight('green');
            return;
        } else if (light === 'yellow') {
            setlight('red')
            return;
        } else if (light === 'green') {
            setlight('red');
            return;
        }


    }, [countdown, light]);

    return {
        // props
        countdown,
        light,

        colors,

        // computed
        percentage: (countdown / 5) * 100,

        greenLight: light === 'green' ? colors.green : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
        redLight: light === 'red' ? colors.red : 'bg-gray-500',

        // methods
    };
}
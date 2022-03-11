import React, { useRef } from 'react';

const useScrollableComponent = () => {
    const scrollTargetRef = useRef(null);

    const scrollToTarget = () => {
        scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const TargetComponent = () =>
        <div ref={scrollTargetRef} />

    return [
        scrollToTarget,
        TargetComponent
    ]

}

export default useScrollableComponent;
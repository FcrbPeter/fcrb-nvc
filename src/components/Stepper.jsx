import React from 'react';

const Stepper = ({ currentStep }) => {
    const steps = [1, 2, 3];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--spacing-xl)',
            position: 'relative'
        }}>
            {/* Connector Line in Background */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '20%',
                right: '20%',
                height: '2px',
                backgroundColor: '#e0e0e0',
                zIndex: 0
            }} />

            {steps.map((step) => {
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                    <div key={step} style={{
                        position: 'relative',
                        zIndex: 1,
                        margin: '0 40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: isActive || isCompleted ? 'var(--color-primary)' : '#e0e0e0',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease'
                        }}>
                            {step}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;

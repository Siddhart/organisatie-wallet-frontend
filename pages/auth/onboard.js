import React, { useState } from 'react'

//components
import OnboardingStep from '@/components/auth/onboarding/OnboardingStep'
import QRStep from '@/components/auth/onboarding/QRStep'
import WelcomeStep from '@/components/auth/login/welcomeStep'

const Onboard = () => {
    const [step, setStep] = useState(0)

    switch (step) {
        case (0): return <WelcomeStep setStep={setStep} />
        case (1): return <OnboardingStep setStep={setStep} />
        case (2): return <QRStep setStep={setStep} />
    }
}

export default Onboard

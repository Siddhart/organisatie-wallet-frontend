import React, { useState } from 'react'

//components
import LoginStep from '@/components/auth/LoginStep'
import WelcomeStep from '@/components/auth/welcomeStep'

const Login = () => {
    const [step, setStep] = useState(0)

    switch (step) {
        case (0): return <WelcomeStep setStep={setStep} />
        case (1): return <LoginStep setStep={setStep} />
    }
}

export default Login
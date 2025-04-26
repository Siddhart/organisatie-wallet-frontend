import React, { useState } from 'react'

//components
import LoginStep from '@/components/auth/login/LoginStep'
import WelcomeStep from '@/components/auth/login/welcomeStep'

const Login = () => {
    const [step, setStep] = useState(0)

    switch (step) {
        case (0): return <WelcomeStep setStep={setStep} />
        case (1): return <LoginStep setStep={setStep} />
    }
}

export default Login
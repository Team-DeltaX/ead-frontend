"use client";
import React, { useState } from 'react';
import StepIndicator from '@/components/payment/StepIndicator';
import PaymentAddress from '@/components/payment/paymentAddress';
import PaymentShipping from '@/components/payment/paymentShipping';
import PaymentCard from '@/components/payment/paymentCard';

function PaymentPage() {
  const [activeComponent, setActiveComponent] = useState(1);

  

  return (
    <div className="p-8">
      {/* Step Indicator */}
      <StepIndicator activeStep={activeComponent} />
      {/*conditaional rendering*/}
      {/* Conditional Rendering of Components */}
      {activeComponent === 1 && <PaymentAddress activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>}
      {activeComponent === 2 && <PaymentShipping activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>}
      {activeComponent === 3 && <PaymentCard />}

    </div>
  );
}

export default PaymentPage;
